import prisma from '../prisma';

class TradeService {
  async executeBuy(userId: number, currency: string, amount: number, currentPrice: number) {
    const totalCostUsd = amount * currentPrice;

    const wallet = await prisma.wallet.findUnique({
      where: { userId: Number(userId) }
    });

    if (!wallet) throw new Error('WALLET_NOT_FOUND');
    if (wallet.balanceUsd < totalCostUsd) throw new Error('INSUFFICIENT_FUNDS');

    return await prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { id: wallet.id },
        data: { balanceUsd: { decrement: totalCostUsd } }
      });

      await tx.asset.upsert({
        where: {
          walletId_currency: { walletId: wallet.id, currency: currency }
        },
        update: { balance: { increment: amount } },
        create: {
          walletId: wallet.id,
          currency: currency,
          balance: amount
        }
      });

      return await tx.transaction.create({
        data: {
          walletId: wallet.id,
          type: 'BUY',
          currency: currency,
          amount: amount,
          price: currentPrice,
          totalUsd: totalCostUsd
        }
      });
    });
  }

  async executeSell(userId: number, currency: string, amount: number, currentPrice: number) {
    const totalRevenueUsd = amount * currentPrice;

    const wallet = await prisma.wallet.findUnique({
      where: { userId: Number(userId) }
    });

    if (!wallet) throw new Error('WALLET_NOT_FOUND');

    const asset = await prisma.asset.findUnique({
      where: {
        walletId_currency: { walletId: wallet.id, currency: currency }
      }
    });

    if (!asset || asset.balance < amount) throw new Error('INSUFFICIENT_ASSET');

    return await prisma.$transaction(async (tx) => {
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
          currency: currency,
          amount: amount,
          price: currentPrice,
          totalUsd: totalRevenueUsd
        }
      });
    });
  }
}

export default new TradeService();