import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import BottomBar from '../../components/BottomBar';
import { appStyles } from '../../styles/appStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../src/navigation/appTypes';
import UpperText from '../../components/UpperText';
import PaymentMethodContainer from '../../components/PaymentMethodContainer';
import { moderateScale, verticalScale } from '../../utils/responsive';

type PaymentMethodProps = NativeStackScreenProps<
  AppStackParamList,
  'PaymentMethod'
>;

const PaymentMethodScreen: React.FC<PaymentMethodProps> = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={appStyles.flexContainer} edges={['top', 'left', 'right']}>
      <View style={appStyles.container}>
        <UpperText
          title={t('payment.title')}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.marginTextSelectMethod}>
          <Text style={styles.textSelectMethod}> {t('payment.selectMethod')} </Text>
        </View>
        <View style={styles.marginTextPaymentMethod}>
          <Text style={styles.textPaymentMethod}> {t('payment.recommended')} </Text>
        </View>
        <PaymentMethodContainer
          logo={require('../../assets/images/applePay.png')}
          styleLogo={styles.logoApplePayContainer}
          onPress={() => {
            navigation.navigate('BalanceTopUp');
          }}
        />

        <View style={styles.marginTextPaymentMethod}>
          <Text style={styles.textPaymentMethod}> {t('payment.other')} </Text>
        </View>
        <PaymentMethodContainer
          logo={require('../../assets/images/blik.png')}
          styleLogo={styles.logoBlikContainer}
          onPress={() => {
            navigation.navigate('BalanceTopUp');
          }}
        />
      </View>
      <BottomBar
        homePress={() => navigation.navigate('Main')}
        walletPress={() => {navigation.navigate('Wallet')}}
        transactionPress={() => {navigation.navigate('TransactionHistory')}}
        settingsPress={() => {
          navigation.navigate('Settings');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoApplePayContainer: {
    width: moderateScale(70),
    height: moderateScale(70),
    marginRight: moderateScale(15),
  },
  logoBlikContainer: {
    width: moderateScale(70),
    height: moderateScale(40),
    marginRight: moderateScale(15),
  },
  textSelectMethod: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  marginTextSelectMethod: {
    marginTop: verticalScale(40),
  },
  textPaymentMethod: {
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  marginTextPaymentMethod: {
    marginTop: verticalScale(20),
  },
});
export default PaymentMethodScreen;
