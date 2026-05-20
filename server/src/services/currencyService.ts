import binanceApi from './binanceApi';
import { getTopCoinsFromCache, CoinData } from './priceCache';

interface SymbolPrice {
    symbol: string;
    price: string;
}

interface ChartItem {
    timestamp: number;
    value: number;
}

interface HistoryResponse {
    data: ChartItem[];
    changePercent: string;
    changeValue: string;
}

// Binance Kline (candle) tuple: [0] OpenTime, [1] Open, [2] High, [3] Low, [4] Close, [5] Volume...
type BinanceKline = [number, string, string, string, string, string, ...unknown[]];

class CurrencyService {
    getTopCoins(limit: number): CoinData[] {
        return getTopCoinsFromCache(limit);
    }

    async getPrice(symbol: string): Promise<SymbolPrice> {
        const response = await binanceApi.get<SymbolPrice>('/ticker/price', {
            params: { symbol }
        });
        return response.data;
    }

    async getHistoryData(symbol: string, period: string): Promise<HistoryResponse> {
        const pair = symbol.toUpperCase().endsWith('USDT') ? symbol : `${symbol}USDT`;

        let interval: string;
        let limit: number;

        switch (period) {
            case '1H': interval = '1m'; limit = 60; break;
            case '1D': interval = '1h'; limit = 24; break;
            case '1W': interval = '4h'; limit = 42; break;
            case '1M': interval = '1d'; limit = 30; break;
            case '1Y': interval = '1w'; limit = 52; break;
            default:   interval = '1h'; limit = 24; break;
        }

        const response = await binanceApi.get<BinanceKline[]>('/klines', {
            params: { symbol: pair, interval, limit }
        });

        const chartData: ChartItem[] = response.data.map((item) => ({
            timestamp: item[0],
            value: parseFloat(item[4])
        }));

        const firstPrice = chartData[0].value;
        const lastPrice = chartData[chartData.length - 1].value;
        const changeValue = lastPrice - firstPrice;
        const changePercent = ((changeValue / firstPrice) * 100).toFixed(2);

        return {
            data: chartData,
            changePercent,
            changeValue: changeValue.toFixed(2)
        };
    }
}

export default new CurrencyService();