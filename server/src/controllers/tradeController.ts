import { Response } from 'express';
import tradeService from '../services/tradeService';
import { AuthRequest } from '../middleware/authMiddleware';

const parseAmount = (raw: unknown): number | null => {
  const amount = Number(raw);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount;
};

class TradeController {
  async buy(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });

      const { currency } = req.body;
      const amount = parseAmount(req.body.amount);
      if (!currency || typeof currency !== 'string') return res.status(400).json({ message: 'Currency required' });
      if (amount === null) return res.status(400).json({ message: 'Invalid amount' });

      // currentPrice из тела игнорируется: цену берёт сервер из своего кэша.
      const transaction = await tradeService.executeBuy(userId, currency, amount);

      return res.json({ message: `Successfully bought ${amount} ${currency}`, transaction });
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e.message === 'WALLET_NOT_FOUND') return res.status(404).json({ message: 'Wallet not found' });
        if (e.message === 'INSUFFICIENT_FUNDS') return res.status(400).json({ message: 'Insufficient USD balance' });
        if (e.message === 'PRICE_UNAVAILABLE') return res.status(503).json({ message: 'Price unavailable, try again' });
      }
      console.error(e);
      return res.status(500).json({ message: 'Transaction failed' });
    }
  }

  async sell(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });

      const { currency } = req.body;
      const amount = parseAmount(req.body.amount);
      if (!currency || typeof currency !== 'string') return res.status(400).json({ message: 'Currency required' });
      if (amount === null) return res.status(400).json({ message: 'Invalid amount' });

      const transaction = await tradeService.executeSell(userId, currency, amount);

      return res.json({ message: `Successfully sold ${amount} ${currency}`, transaction });
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e.message === 'WALLET_NOT_FOUND') return res.status(404).json({ message: 'Wallet not found' });
        if (e.message === 'INSUFFICIENT_ASSET') return res.status(400).json({ message: `Insufficient balance of ${req.body.currency}` });
        if (e.message === 'PRICE_UNAVAILABLE') return res.status(503).json({ message: 'Price unavailable, try again' });
      }
      console.error(e);
      return res.status(500).json({ message: 'Transaction failed' });
    }
  }
}

export default new TradeController();
