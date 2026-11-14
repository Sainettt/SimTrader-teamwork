import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native';
import { moderateScale, scale } from '../utils/responsive';

interface PaymentMethodContainerProps {
  logo: ImageSourcePropType;
  styleLogo?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

const PaymentMethodContainer: React.FC<PaymentMethodContainerProps> = ({ logo, styleLogo, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContent}>
        <Image source={logo} style={styleLogo} />
      </View>
      <Image source={require('../assets/images/arrowPayment.png')}
          style={styles.imageContainer} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: scale(310),
    alignSelf: 'center',
    height: moderateScale(80),
    backgroundColor: '#0E1013',
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#191C22',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: moderateScale(15), height: moderateScale(15),
  },
});

export default PaymentMethodContainer;