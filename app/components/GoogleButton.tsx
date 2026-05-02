import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  Image, 
  StyleSheet, 
  View 
} from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/responsive';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

const GoogleButton: React.FC<Props> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, disabled && styles.disabled]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.contentWrapper}>
        {/* Убедитесь, что путь к картинке правильный */}
        <Image 
          source={require('../assets/images/google-logo.png')} 
          style={styles.logo} 
        />
        <Text style={styles.text}>Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: scale(220), // Standardized to match AuthSubmitButton
    height: verticalScale(45),
    backgroundColor: 'white',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    
    // Тень для iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    
    // Тень для Android
    elevation: 3,
    
    // Отступы
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    
    // Рамка (опционально, если фон сливается)
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: scale(10),
    resizeMode: 'contain',
  },
  text: {
    color: '#1F1F1F', // Темно-серый цвет текста (по гайдлайнам Google)
    fontSize: moderateScale(16),
    fontWeight: '600',
    fontFamily: 'Poppins-Medium', // Используем ваш шрифт!
  },
  disabled: {
    opacity: 0.6,
  },
});

export default GoogleButton;
