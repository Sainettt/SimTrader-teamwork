import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';

import en from './locales/en.json';
import pl from './locales/pl.json';
import de from './locales/de.json';

export const SUPPORTED_LANGUAGES = ['en', 'pl', 'de'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = 'app.language';

const getDeviceLanguage = (): SupportedLanguage => {
  let locale = 'en';
  if (Platform.OS === 'ios') {
    const settings = NativeModules.SettingsManager?.settings;
    locale =
      settings?.AppleLocale ||
      settings?.AppleLanguages?.[0] ||
      'en';
  } else {
    locale = NativeModules.I18nManager?.localeIdentifier || 'en';
  }
  const short = locale.toLowerCase().split(/[_-]/)[0];
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(short)
    ? (short as SupportedLanguage)
    : 'en';
};

export const initI18n = async () => {
  let language: SupportedLanguage;
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    language =
      stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)
        ? (stored as SupportedLanguage)
        : getDeviceLanguage();
  } catch {
    language = getDeviceLanguage();
  }

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      pl: { translation: pl },
      de: { translation: de },
    },
    lng: language,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
    returnNull: false,
  });
};

export const changeLanguage = async (lng: SupportedLanguage) => {
  await i18n.changeLanguage(lng);
  try {
    await AsyncStorage.setItem(STORAGE_KEY, lng);
  } catch (e) {
    console.log('Failed to persist language', e);
  }
};

export default i18n;
