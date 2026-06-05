import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from '../utils/responsive';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

const GoogleButton: React.FC<Props> = ({ onPress, disabled }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.contentWrapper}>
        <Image
          source={require('../assets/images/google-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>{t('auth.googleSignIn')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: scale(220),
    height: verticalScale(45),
    backgroundColor: 'white',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
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
    color: '#1F1F1F',
    fontSize: moderateScale(16),
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default GoogleButton;
