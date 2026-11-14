import prisma from '../prisma';
import { getTickerFromCache } from './priceCache';

class TradeService {
  // Цену всегда берём на сервере из кэша Binance, а не из запроса клиента.
  private resolvePrice(currency: string): number {
    const ticker = getTickerFromCache(`${currency}USDT`);
    const price = ticker.price;
    if (!price || price <= 0) throw new Error('PRICE_UNAVAILABLE');
    return price;
  }

  async executeBuy(userId: number, currency: string, amount: number) {
    const currentPrice = this.resolvePrice(currency);
    const totalCostUsd = amount * currentPrice;

    // Проверка средств и списание выполняются внутри одной транзакции (атомарно).
    return await prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({ where: { userId } });
      if (!wallet) throw new Error('WALLET_NOT_FOUND');
      if (wallet.balanceUsd < totalCostUsd) throw new Error('INSUFFICIENT_FUNDS');

      await tx.wallet.update({
        where: { id: wallet.id },
        data: { balanceUsd: { decrement: totalCostUsd } }
      });

      await tx.asset.upsert({
        where: { walletId_currency: { walletId: wallet.id, currency } },
        update: { balance: { increment: amount } },
        create: { walletId: wallet.id, currency, balance: amount }
      });

      return await tx.transaction.create({
        data: {
          walletId: wallet.id,
          type: 'BUY',
          currency,
          amount,
          price: currentPrice,
          totalUsd: totalCostUsd
        }
      });
    });
  }

  async executeSell(userId: number, currency: string, amount: number) {
    const currentPrice = this.resolvePrice(currency);
    const totalRevenueUsd = amount * currentPrice;

    return await prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({ where: { userId } });
      if (!wallet) throw new Error('WALLET_NOT_FOUND');

      const asset = await tx.asset.findUnique({
        where: { walletId_currency: { walletId: wallet.id, currency } }
      });
      if (!asset || asset.balance < amount) throw new Error('INSUFFICIENT_ASSET');

      await tx.asset.update({
        where: { id: asset.id },
        data: { balance: { decrement: amount } }
      });

      await tx.wallet.update({
        where: { id: wallet.id },
        data: { balanceUsd: { increment: totalRevenueUsd } }
      });

      return await tx.transaction.create({
        data: {
          walletId: wallet.id,
          type: 'SELL',
          currency,
          amount,
          price: currentPrice,
          totalUsd: totalRevenueUsd
        }
      });
    });
  }
}

export default new TradeService();
