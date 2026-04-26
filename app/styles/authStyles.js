import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from '../utils/responsive'

export const authStyles = StyleSheet.create({
    appContainer:{
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3C3C3C'
    },
    authContainer: {
        width: '100%',
        alignItems: 'center',
    },

    containerFields: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    fields: {
        width: scale(300),
        height: verticalScale(45),
        backgroundColor: '#E5E5E5',
        borderColor: '#9A9A9A',
        borderWidth: 1,
        marginBottom: verticalScale(10),
        borderRadius: moderateScale(15),
        paddingLeft: scale(10)
    },
    fieldsName: {
        fontSize: moderateScale(16),
        fontFamily: 'Poppins-Light',
        color: '#E5E5E5',
        marginStart: scale(5)
    },
    authSubmitButton: {
        width: scale(220),
        height: verticalScale(50),
        marginTop: verticalScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        borderWidth: 1,
        borderColor: '#9A9A9A',
        borderRadius: moderateScale(15),
    },
    authSubmitButtonText: {
        fontSize: moderateScale(24),
        fontFamily: 'Poppins-Bold',
        color: '#535353'
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(20),
        width: '90%',
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    separatorText: {
        marginHorizontal: scale(10),
        color: '#888',
        fontSize: moderateScale(14),
    },
    authAskTextContainer:{
        flexDirection: 'row',
        marginTop: verticalScale(10)
    },

    mainAskText:{
        fontSize: moderateScale(13),
        fontFamily: 'Poppins-Light',
        color: '#9A9A9A'
    },
    buttonAskText:{
        fontSize: moderateScale(13),
        fontFamily: 'Poppins-Regular',
        color: '#E5E5E5'
    }
})

