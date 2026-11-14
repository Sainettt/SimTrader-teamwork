import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/responsive';
import { colors, radius, font } from '../src/theme/theme';

export const appStyles = StyleSheet.create({
  titleHeader: {
    fontSize: moderateScale(24),
    fontFamily: font.bold,
    color: colors.text,
  },
  totalBalanceText: {
    fontSize: moderateScale(14),
    fontFamily: font.medium,
    color: colors.textSecondary,
  },
  topUpText: {
    fontSize: moderateScale(24),
    fontFamily: font.bold,
    color: colors.text,
  },
  balanceText: {
    fontSize: moderateScale(46),
    fontFamily: font.bold,
    color: colors.text,
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: moderateScale(50),
  },
  viewAllText: {
    fontSize: moderateScale(15),
    fontFamily: font.semibold,
    color: colors.text,
  },
  infoTrendHeaderText: {
    fontSize: moderateScale(18),
    fontFamily: font.bold,
    color: colors.text,
  },
  infoPriceHeaderText: {
    fontSize: moderateScale(12),
    fontFamily: font.medium,
    color: colors.textMuted,
  },
  allCurrenciesText: {
    fontSize: moderateScale(20),
    fontFamily: font.bold,
    color: colors.text,
  },
  currencyNameAndPriceText: {
    fontSize: moderateScale(16),
    fontFamily: font.medium,
    color: colors.text,
  },
  currencyChangeText: {
    fontSize: moderateScale(12),
    fontFamily: font.bold,
    color: colors.primaryText,
  },
  emptyListText: {
    textAlign: 'center',
    padding: moderateScale(20),
    fontFamily: font.regular,
    color: colors.textMuted,
  },
  priceCurrencyTextAndTotalValue: {
    fontSize: moderateScale(32),
    fontFamily: font.bold,
    color: colors.text,
  },
  totalValueText: {
    fontSize: moderateScale(14),
    fontFamily: font.bold,
    color: colors.text,
  },
  timeIntervalText: {
    fontSize: moderateScale(16),
    fontFamily: font.semibold,
    color: colors.textMuted,
  },
  selectedtimeIntervalText: {
    fontSize: moderateScale(16),
    fontFamily: font.semibold,
    color: colors.text,
  },

  topUpButton: {
    width: scale(115),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
  },
  viewAllButton: {
    paddingHorizontal: scale(28),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },

  flexContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  containerWithoutPadding: {
    flex: 1,
    backgroundColor: colors.bg,
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
    backgroundColor: colors.card,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  infoTrendHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    marginTop: verticalScale(20),
    paddingHorizontal: scale(6),
  },
  trendHeaderContainer: {
    flex: 1,
    width: '100%',
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  upperTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(56),
    position: 'relative',
  },
  paymentMethodContainer: {
    width: scale(290),
    height: moderateScale(80),
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  currencyChangePositiveContainer: {
    minWidth: scale(58),
    height: moderateScale(28),
    paddingHorizontal: scale(8),
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyChangeNegativeContainer: {
    minWidth: scale(58),
    height: moderateScale(28),
    paddingHorizontal: scale(8),
    backgroundColor: colors.danger,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedtimeIntervalContainer: {
    width: scale(50),
    height: moderateScale(30),
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topUpContinueButton: {
    width: scale(230),
    height: moderateScale(52),
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontFamily: font.bold,
    color: colors.text,
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
    backgroundColor: colors.primary,
  },
  redBackGroudColor: {
    backgroundColor: colors.danger,
  },
  green: {
    color: colors.primary,
  },
  red: {
    color: colors.danger,
  },
  spinerForRootNavigator: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  currencyBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(14),
  },
  currencyBadgeSecondary: {
    backgroundColor: colors.bgAlt,
  },
  currencyText: {
    fontSize: moderateScale(20),
    fontFamily: font.bold,
    color: colors.text,
  },
  currencyTextSecondary: {
    fontSize: moderateScale(20),
    fontFamily: font.bold,
    color: colors.textMuted,
  },
});
