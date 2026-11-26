import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import prisma from '../prisma';
import tradeService from '../services/tradeService';
import { priceCache } from '../services/priceCache';

// In-memory stand-in for the database: the real service logic runs against it,
// so no PostgreSQL instance is needed.
interface FakeAsset { id: number; walletId: number; currency: string; balance: number }
interface FakeTransaction { type: string; currency: string; amount: number; price: number; totalUsd: number }

let wallet: { id: number; userId: number; balanceUsd: number };
let assets: FakeAsset[];
let transactions: FakeTransaction[];

const applyDelta = (current: number, change: { increment?: number; decrement?: number }) =>
  current + (change.increment ?? 0) - (change.decrement ?? 0);

const fakeTx = {
  wallet: {
    findUnique: async ({ where }: any) => (where.userId === wallet.userId ? wallet : null),
    update: async ({ data }: any) => {
      wallet.balanceUsd = applyDelta(wallet.balanceUsd, data.balanceUsd);
      return wallet;
    },
  },
  asset: {
    findUnique: async ({ where }: any) =>
      assets.find(a => a.currency === where.walletId_currency.currency) ?? null,
    update: async ({ where, data }: any) => {
      const asset = assets.find(a => a.id === where.id)!;
      asset.balance = applyDelta(asset.balance, data.balance);
      return asset;
    },
    upsert: async ({ where, update, create }: any) => {
      const asset = assets.find(a => a.currency === where.walletId_currency.currency);
      if (asset) {
        asset.balance = applyDelta(asset.balance, update.balance);
        return asset;
      }
      const created = { id: assets.length + 1, ...create };
      assets.push(created);
      return created;
    },
  },
  transaction: {
    create: async ({ data }: any) => {
      transactions.push(data);
      return data;
    },
  },
};

(prisma as any).$transaction = async (fn: (tx: typeof fakeTx) => Promise<unknown>) => fn(fakeTx);

beforeEach(() => {
  wallet = { id: 1, userId: 1, balanceUsd: 1000 };
  assets = [];
  transactions = [];
  for (const key of Object.keys(priceCache)) delete priceCache[key];
  priceCache.BTCUSDT = { price: 100, changePercent: 0 };
});

test('buy: debits USD, credits the asset and records the rate used', async () => {
  const tx = await tradeService.executeBuy(1, 'BTC', 2);

  assert.equal(wallet.balanceUsd, 800);
  assert.equal(assets[0].balance, 2);
  assert.deepEqual(
    { type: tx.type, currency: tx.currency, amount: tx.amount, price: tx.price, totalUsd: tx.totalUsd },
    { type: 'BUY', currency: 'BTC', amount: 2, price: 100, totalUsd: 200 },
  );
});

test('buy: rejected when USD balance is too low, nothing changes', async () => {
  await assert.rejects(tradeService.executeBuy(1, 'BTC', 11), /INSUFFICIENT_FUNDS/);

  assert.equal(wallet.balanceUsd, 1000);
  assert.equal(assets.length, 0);
  assert.equal(transactions.length, 0);
});

test('buy: rejected when the server has no rate for the currency', async () => {
  await assert.rejects(tradeService.executeBuy(1, 'UNKNOWN', 1), /PRICE_UNAVAILABLE/);
  assert.equal(transactions.length, 0);
});

test('buy: rejected when the user has no wallet', async () => {
  await assert.rejects(tradeService.executeBuy(999, 'BTC', 1), /WALLET_NOT_FOUND/);
});

test('sell: debits the asset, credits USD at the current rate', async () => {
  await tradeService.executeBuy(1, 'BTC', 2);
  priceCache.BTCUSDT = { price: 150, changePercent: 0 };

  const tx = await tradeService.executeSell(1, 'BTC', 1);

  assert.equal(assets[0].balance, 1);
  assert.equal(wallet.balanceUsd, 950);
  assert.equal(tx.type, 'SELL');
  assert.equal(tx.price, 150);
  assert.equal(tx.totalUsd, 150);
});

test('sell: rejected when the user holds less than requested', async () => {
  await tradeService.executeBuy(1, 'BTC', 1);

  await assert.rejects(tradeService.executeSell(1, 'BTC', 5), /INSUFFICIENT_ASSET/);
  assert.equal(assets[0].balance, 1);
  assert.equal(wallet.balanceUsd, 900);
});

test('history: a later rate change does not alter a recorded transaction', async () => {
  await tradeService.executeBuy(1, 'BTC', 1);
  priceCache.BTCUSDT = { price: 999, changePercent: 0 };

  assert.equal(transactions[0].price, 100);
  assert.equal(transactions[0].totalUsd, 100);
});
