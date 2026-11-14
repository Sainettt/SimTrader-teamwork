import React, { useContext, useState } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Alert,
  Text,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import LoginFields from '../../components/LogInFields';

import AuthAskText from '../../components/AuthAskText';
import { authStyles } from '../../styles/authStyles';
import AuthSubmitButton from '../../components/AuthSubmitButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../src/navigation/authTypes';
import { AuthContext } from '../../context/AuthContext';
import GoogleButton from '../../components/GoogleButton';
import { colors, font } from '../../src/theme/theme';
import { moderateScale, verticalScale } from '../../utils/responsive';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { login, isLoading, loginWithGoogle } = useContext(AuthContext);
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email) {
      Alert.alert(t('common.error'), t('auth.errors.enterEmail'));
      return;
    }
    if (!password) {
      Alert.alert(t('common.error'), t('auth.errors.enterPassword'));
      return;
    }
    login(email, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={authStyles.container}>
        <View style={styles.brand}>
          <View style={styles.logoDot} />
          <Text style={styles.brandTitle}>SimTrader</Text>
          <Text style={styles.brandSubtitle}>{t('auth.welcomeBack')}</Text>
        </View>

        <LoginFields
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showUsername={false}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
        ) : (
          <View style={authStyles.authContainer}>
            <AuthSubmitButton buttonText={t('auth.signIn')} onPress={handleLogin} />

            <View style={authStyles.separatorContainer}>
              <View style={authStyles.separatorLine} />
              <Text style={authStyles.separatorText}>{t('common.or')}</Text>
              <View style={authStyles.separatorLine} />
            </View>

            <GoogleButton onPress={loginWithGoogle} disabled={isLoading} />
          </View>
        )}

        <AuthAskText
          mainText={t('auth.noAccount')}
          buttonText={t('auth.signUp')}
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  brand: {
    alignItems: 'center',
    marginBottom: verticalScale(28),
  },
  logoDot: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(14),
    backgroundColor: colors.primary,
    marginBottom: verticalScale(12),
  },
  brandTitle: {
    fontSize: moderateScale(30),
    fontFamily: font.bold,
    color: colors.text,
  },
  brandSubtitle: {
    fontSize: moderateScale(13),
    fontFamily: font.regular,
    color: colors.textMuted,
    marginTop: verticalScale(2),
  },
  spinner: { marginTop: verticalScale(20) },
});

export default LoginScreen;
