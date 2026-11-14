import { Response } from 'express';
import walletService from '../services/walletService';
import { AuthRequest } from '../middleware/authMiddleware';

// Приводим сумму из тела к положительному числу.
// null — значит значение некорректно (не число, ноль или отрицательное).
const parseAmount = (raw: unknown): number | null => {
    const amount = Number(raw);
    if (!Number.isFinite(amount) || amount <= 0) return null;
    return amount;
};

class WalletController {
    async topUpWallet(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.user?.id;
            if (!userId) return res.status(401).json({ message: 'Unauthorized' });

            const amount = parseAmount(req.body.amount);
            if (amount === null) return res.status(400).json({ message: 'Invalid amount' });

            await walletService.topUp(userId, amount);
            return res.json({ message: 'Top up successful' });
        } catch (e: unknown) {
            if (e instanceof Error && e.message === 'INSUFFICIENT_CARD_FUNDS') {
                return res.status(400).json({ message: 'Insufficient funds on card' });
            }
            console.error(e);
            return res.status(500).json({ message: 'Transaction failed' });
        }
    }

    async getPortfolio(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.user?.id;
            if (!userId) return res.status(401).json({ message: 'Unauthorized' });

            const portfolio = await walletService.calculatePortfolio(userId);
            return res.json(portfolio);
        } catch (e: unknown) {
            if (e instanceof Error) console.error('Error fetching portfolio:', e.message);
            return res.status(500).json({ message: 'Error fetching portfolio' });
        }
    }

    async getTransactions(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.user?.id;
            if (!userId) return res.status(401).json({ message: 'Unauthorized' });

            const transactions = await walletService.getUserTransactions(userId);
            return res.json(transactions);
        } catch (e: unknown) {
            if (e instanceof Error) console.error('Error fetching transactions:', e.message);
            return res.status(500).json({ message: 'Error fetching transactions' });
        }
    }

    async withdraw(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.user?.id;
            if (!userId) return res.status(401).json({ message: 'Unauthorized' });

            const amount = parseAmount(req.body.amount);
            if (amount === null) return res.status(400).json({ message: 'Invalid amount' });

            await walletService.withdraw(userId, amount);
            return res.json({ message: 'Withdrawal successful' });
        } catch (e: unknown) {
            if (e instanceof Error && e.message === 'INSUFFICIENT_WALLET_FUNDS') {
                return res.status(400).json({ message: 'Insufficient USD balance' });
            }
            console.error(e);
            return res.status(500).json({ message: 'Withdrawal failed' });
        }
    }
}

export default new WalletController();
