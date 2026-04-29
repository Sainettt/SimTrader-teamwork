import React, { useContext, useState } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
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
  // 2. Достаем loginWithGoogle из контекста
  const { login, isLoading, loginWithGoogle } = useContext(AuthContext);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }
    if (!email) {
      Alert.alert('Error', 'Please enter an email');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter a password');
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
            {/* Основная кнопка входа */}
            <AuthSubmitButton buttonText="Sign In" onPress={handleLogin} />

            {/* Разделитель */}
            <View style={authStyles.separatorContainer}>
              <View style={authStyles.separatorLine} />
              <Text style={authStyles.separatorText}>OR</Text>
              <View style={authStyles.separatorLine} />
            </View>

            {/* 3. Кнопка Google Sign-In */}
            <GoogleButton onPress={loginWithGoogle} disabled={isLoading} />
          </View>
        )}

        <AuthAskText
          mainText="Don`t have an account yet? "
          buttonText="Sign Up"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};


export default LoginScreen;