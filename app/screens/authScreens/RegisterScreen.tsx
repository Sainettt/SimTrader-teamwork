import React, { useContext, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, ActivityIndicator, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import AuthAskText from '../../components/AuthAskText';
import RegisterFields from '../../components/RegisterFields';
import AuthSubmitButton from '../../components/AuthSubmitButton';
import { authStyles } from '../../styles/authStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../src/navigation/authTypes';
import { AuthContext } from '../../context/AuthContext';
import { isValidEmail, isValidPassword } from '../../utils/validation';

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
            <ActivityIndicator size="large" color="#0000ff" />
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
export default RegisterScreen;
