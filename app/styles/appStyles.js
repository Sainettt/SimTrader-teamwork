import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/responsive';

export const appStyles = StyleSheet.create({
  titleHeader: {
    fontSize: moderateScale(24),
    fontFamily: 'Poppins-Bold',
    color: '#E5E5E5',
  },
  totalBalanceText: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Bold',
    color: '#E5E5E5',
  },
  topUpText: {
    fontSize: moderateScale(24),
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  balanceText: {
    fontSize: moderateScale(46),
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: moderateScale(50),
  },
  viewAllText: {
    fontSize: moderateScale(18),
    fontFamily: 'Poppins-Bold',
    color: '#E5E5E5',
  },
  infoTrendHeaderText: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Bold',
    color: '#D9D9D9',
  },
  infoPriceHeaderText: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Bold',
    color: '#D9D9D9',
  },
  allCurrenciesText: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Bold',
    color: '#EEEEEE',
  },
  currencyNameAndPriceText: {
    fontSize: moderateScale(18),
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  currencyChangeText: {
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  emptyListText: {
    textAlign: 'center', padding: moderateScale(20), color: 'gray',
  },
  priceCurrencyTextAndTotalValue: {
    fontSize: moderateScale(32),
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  totalValueText: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  timeIntervalText: {
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-SemiBold',
    color: '#9D9C9C',
  },
  selectedtimeIntervalText: {
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },


  topUpButton: {
    width: scale(115),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#83EDA6',
    borderRadius: moderateScale(10),
  },
  viewAllButton: {
    width: scale(130),
    height: moderateScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#636363',
    borderRadius: moderateScale(10),
  },

  flexContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#3C3C3C',
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  containerWithoutPadding: {
    flex: 1,
    backgroundColor: '#3C3C3C',
  },
  balanceContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 0,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(15),
    marginTop: verticalScale(5),
  },
  totalBalanceContainer: {
    marginTop: verticalScale(10),
  },
  viewAllContainer: {
    alignItems: 'center',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(8),
  },
  bottomBarContainer: {
    width: '100%',
    backgroundColor: '#636363',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
  },
  infoTrendHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(5),
    marginTop: verticalScale(20),
    paddingHorizontal: scale(15),
  },
  trendHeaderContainer: {
    flex: 1,
    width: '100%',
    borderRadius: moderateScale(10),
    backgroundColor: '#636363',
    overflow: 'hidden',
  },
  upperTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(50),
    position: 'relative',
  },
  paymentMethodContainer: {
    width: scale(290),
    height: moderateScale(80),
    backgroundColor: '#3C3C3C',
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#636363',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  currencyChangePositiveContainer: {
    width: scale(55),
    height: moderateScale(28),
    backgroundColor: '#83EDA6',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyChangeNegativeContainer: {
    width: scale(55),
    height: moderateScale(28),
    backgroundColor: '#EB5B5B',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedtimeIntervalContainer: {
    width: scale(50),
    height: moderateScale(30),
    backgroundColor: '#5B5A5A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topUpContinueButton: {
    width: scale(230),
    height: moderateScale(50),
    backgroundColor: '#83EDA6',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Bold',
    color: '#EEEEEE',
  },
  backButton: {
    position: 'absolute',
    left: scale(10),
    padding: moderateScale(10),
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenBackGroudColor: {
    backgroundColor: '#83EDA6',
  },
  redBackGroudColor: {
    backgroundColor: '#EB5B5B',
  },
  green: {
    color: '#83EDA6',
  },
  red: {
    color: '#EB5B5B',
  },
  spinerForRootNavigator: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  // Standardized Input and Badge styles
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  currencyBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    backgroundColor: '#3C3C3C',
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(12),
  },
  currencyBadgeSecondary: {
    backgroundColor: '#2A2A2A',
  },
  currencyText: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  currencyTextSecondary: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Bold',
    color: '#AAAAAA',
  },
});
