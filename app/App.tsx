import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigators/RootNavigator';
import { authStyles } from './styles/authStyles';
import { AuthProvider } from './context/AuthContext';

const App = () => {
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