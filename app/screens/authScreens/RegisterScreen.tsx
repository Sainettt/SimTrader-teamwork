import React, { useContext, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, ActivityIndicator, Alert, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AuthAskText from '../../components/AuthAskText';
import RegisterFields from '../../components/RegisterFields';
import AuthSubmitButton from '../../components/AuthSubmitButton';
import { authStyles } from '../../styles/authStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../src/navigation/authTypes';
import { AuthContext } from '../../context/AuthContext';
import { isValidEmail, isValidPassword } from '../../utils/validation';
import { colors, font } from '../../src/theme/theme';
import { moderateScale, verticalScale } from '../../utils/responsive';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;


const RegisterScreen: React.FC<Props> = ({ navigation }: Props) => {

  const { register, isLoading } = useContext(AuthContext);
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert(t('auth.errors.registrationError'), t('auth.errors.passwordsMismatch'));
      return;
    }
    if (!username) {
      Alert.alert(t('common.error'), t('auth.errors.enterUsername'));
      return;
    }
    if (!email) {
      Alert.alert(t('common.error'), t('auth.errors.enterEmail'));
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert(t('common.error'), t('auth.errors.invalidEmail'));
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert(t('common.error'), t('auth.errors.invalidPassword'));
      return;
    }

    register(username, email, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={authStyles.container}>
        <View style={styles.brand}>
          <View style={styles.logoDot} />
          <Text style={styles.brandTitle}>SimTrader</Text>
          <Text style={styles.brandSubtitle}>{t('auth.createAccount')}</Text>
        </View>

        <RegisterFields
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
        />

        {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
        ) : (
            <AuthSubmitButton buttonText={t('auth.signUp')} onPress={handleRegister} />
        )}

        <AuthAskText
          mainText={t('auth.haveAccount')}
          buttonText={t('auth.signIn')}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  brand: {
    alignItems: 'center',
    marginBottom: verticalScale(22),
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

export default RegisterScreen;
