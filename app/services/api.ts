import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = 'http://10.0.2.2:4000/api';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

const $api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
    'Content-Type': 'application/json',
  }
});

$api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
        return Promise.reject(error);
    }
    if (
        error.message === 'Network Error' || 
        error.code === 'ECONNABORTED' || 
        (error.response && error.response.status >= 500)
    ) {
      
      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (originalRequest._retryCount < 1) {
        originalRequest._retryCount += 1;

        console.log(`[Mobile] Server not responding. Retrying once in 2000ms`);

        await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
        return $api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

$api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
       console.log('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
       console.log('Network Error (Server down or wrong IP):', error.message);
    } else {
       console.log('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
    async registration(userName: string, email: string, password: string) {
        const response = await $api.post('auth/registration', { userName, email, password });
        return response.data;
    },

    async login(email: string, password: string) {
        const response = await $api.post('auth/login', { email, password });
        return response.data;
    },
    async check() {
    const response = await $api.get('/auth/check'); 
    return response.data;
  },
  async googleLogin(idToken: string, email: string, name: string) {
        const response = await $api.post('auth/google', {
            idToken,
            email,
            userName: name,
        });
        return response.data;
    },
};

export const currencyAPI = {
    async getTopCryptos(limit: number = 100) {
        const response = await $api.get(`/currency/list?limit=${limit}`);
        return response.data;
    },
    async getHistory(symbol: string, period: string) {
        const response = await $api.get(`/currency/history`, {
            params: { symbol, period }
        });
        return response.data;
    },
    async getLatestPrice(symbol: string) {
        const response = await $api.get('/currency/rate', {
            params: { symbol: symbol.includes('USDT') ? symbol : `${symbol}USDT` } 
        });
        return response.data;
    }
};

export const walletAPI = {
    async topUp(userId: number, amount: number) {
        const response = await $api.post('/wallet/top-up', { userId, amount });
        return response.data;
    },
    async getPortfolio(userId: number) {
        const response = await $api.get(`/wallet/${userId}`);
        return response.data;
    },
    async getTransactions(userId: number) {
        const response = await $api.get(`/wallet/${userId}/transactions`);
        return response.data;
    },
    async withdraw(userId: number, amount: number) {
        const response = await $api.post('/wallet/withdraw', { userId, amount });
        return response.data;
    }
}

export const tradeAPI = {
    async buy(userId: number, currency: string, amount: number, currentPrice: number) {
        const response = await $api.post('/trade/buy', { userId, currency, amount, currentPrice });
        return response.data;
    },

    async sell(userId: number, currency: string, amount: number, currentPrice: number) {
        const response = await $api.post('/trade/sell', { userId, currency, amount, currentPrice });
        return response.data;
    },
};