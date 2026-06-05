import React, { useContext, useState } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Alert,
  Text,
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

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { login, isLoading, loginWithGoogle } = useContext(AuthContext);
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username) {
      Alert.alert(t('common.error'), t('auth.errors.enterUsername'));
      return;
    }
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
        <LoginFields
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
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


export default LoginScreen;
