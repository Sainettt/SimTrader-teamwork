import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from '../utils/responsive'
import { colors, radius, font } from '../src/theme/theme'

export const authStyles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bg,
        paddingHorizontal: scale(24),
    },
    authContainer: {
        width: '100%',
        alignItems: 'center',
    },
    containerFields: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
        maxWidth: scale(320),
    },
    fields: {
        width: '100%',
        height: verticalScale(52),
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        color: colors.text,
        fontFamily: font.regular,
        fontSize: moderateScale(15),
        marginBottom: verticalScale(14),
        borderRadius: radius.md,
        paddingHorizontal: scale(16),
    },
    fieldsName: {
        fontSize: moderateScale(13),
        fontFamily: font.medium,
        color: colors.textSecondary,
        marginStart: scale(4),
        marginBottom: verticalScale(6),
    },
    authSubmitButton: {
        width: scale(300),
        maxWidth: '100%',
        height: verticalScale(54),
        marginTop: verticalScale(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.md,
    },
    authSubmitButtonText: {
        fontSize: moderateScale(18),
        fontFamily: font.bold,
        color: colors.primaryText,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(22),
        width: '90%',
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    separatorText: {
        marginHorizontal: scale(12),
        color: colors.textMuted,
        fontFamily: font.medium,
        fontSize: moderateScale(13),
    },
    authAskTextContainer: {
        flexDirection: 'row',
        marginTop: verticalScale(18),
    },
    mainAskText: {
        fontSize: moderateScale(13),
        fontFamily: font.regular,
        color: colors.textMuted,
    },
    buttonAskText: {
        fontSize: moderateScale(13),
        fontFamily: font.bold,
        color: colors.primary,
    },
})
