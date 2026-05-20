import React, { createContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { authAPI, setAuthToken } from '../services/api';
import { Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { GoogleSignin, statusCodes, isErrorWithCode } from '@react-native-google-signin/google-signin';
type UserInfo = {
  id: number;
  username: string;
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  userId: number | null;
  userInfo: UserInfo | null;
  isLoading: boolean;
  isSplashLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    userName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  userId: null,
  userInfo: null,
  isLoading: false,
  isSplashLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loginWithGoogle: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSplashLoading, setIsSplashLoading] = useState(true);

  const saveSession = useCallback(async (newToken: string, newUser: UserInfo) => {
    try {
      await Keychain.setGenericPassword(String(newUser.id), newToken);
      setAuthToken(newToken);
      setToken(newToken);
      setUserId(newUser.id);
      setUserInfo(newUser);
      setIsLoggedIn(true);
    } catch (e) {
      console.log('Error saving to keychain', e);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await GoogleSignin.signOut();
      await Keychain.resetGenericPassword();
      setAuthToken(null);
      setToken(null);
      setUserId(null);
      setUserInfo(null);
      setIsLoggedIn(false);
    } catch (e) {
      console.log('Logout error', e);
    }
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '356867902645-k2kuaubk84cjmg1ngom4nqts9dfnljl0.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });

    const loadSession = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();

        if (credentials) {
          const savedToken = credentials.password;
          setAuthToken(savedToken);
          setToken(savedToken);

          const data = await authAPI.check();

          if (data.user) {
            setUserId(data.user.id);
            setUserInfo(data.user);
          }

          if (data.token) {
            await Keychain.setGenericPassword(String(data.user.id), data.token);
            setAuthToken(data.token);
            setToken(data.token);
          }

          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('Session expired or invalid', error);
        await logout();
      } finally {
        setIsSplashLoading(false);
      }
    };

    loadSession();
  }, [logout]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const data = await authAPI.login(email, password);

      if (data.token && data.user) {
        await saveSession(data.token, data.user);
      } else {
        Alert.alert('Login Error', 'Invalid server response');
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        'Login Error',
        error.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setIsLoading(false);
    }
  }, [saveSession]);

  const register = useCallback(async (
    userName: string,
    email: string,
    password: string,
  ) => {
    try {
      setIsLoading(true);
      const data = await authAPI.registration(userName, email, password);

      if (data.token && data.user) {
        await saveSession(data.token, data.user);
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        'Registration Error',
        error.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setIsLoading(false);
    }
  }, [saveSession]);

  const loginWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      
      await GoogleSignin.hasPlayServices();

      const userInfoResponse = await GoogleSignin.signIn();
      
      if (!userInfoResponse.data) {
        throw new Error('No user data returned from Google');
      }
      const { idToken, user } = userInfoResponse.data;

      if (!idToken) throw new Error('No ID token found');

      const data = await authAPI.googleLogin(idToken, user.email, user.name || 'User');

      if (data.token && data.user) {
        await saveSession(data.token, data.user);
      } else {
        Alert.alert('Login Error', 'Server returned invalid data');
      }

    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('User cancelled the login flow');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('Sign in is in progress already');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert('Error', 'Google Play Services not available');
            break;
          default:
            Alert.alert('Google Error', error.message);
        }
      } else {
        console.log('Backend or Other Error:', error);
        Alert.alert('Login Error', 'Failed to authenticate with server');
      }
    } finally {
      setIsLoading(false);
    }
  }, [saveSession]);

  const value = useMemo(() => ({
    isLoggedIn,
    token,
    userId,
    userInfo,
    isLoading,
    isSplashLoading,
    login,
    register,
    logout,
    loginWithGoogle,
  }), [isLoggedIn, token, userId, userInfo, isLoading, isSplashLoading, login, register, logout, loginWithGoogle]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
