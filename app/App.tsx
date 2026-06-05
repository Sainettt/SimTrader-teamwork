import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigators/RootNavigator';
import { authStyles } from './styles/authStyles';
import { AuthProvider } from './context/AuthContext';
import { initI18n } from './src/i18n';

const App = () => {
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    initI18n().finally(() => setI18nReady(true));
  }, []);

  if (!i18nReady) return null;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <View style={authStyles.appContainer}>
          <RootNavigator />
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
