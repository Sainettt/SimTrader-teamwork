import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { appStyles } from '../styles/appStyles';
import { moderateScale, scale } from '../utils/responsive';

type TotalBalanceProps = {
    balance: string;
    changeValue?: string;
    changePercent?: string;
    onTopUpPress: () => void;
    onWithdrawPress: () => void;
    loading: boolean;
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ 
    balance, 
    changeValue = "0.00", 
    changePercent = "0.00", 
    onTopUpPress, 
    onWithdrawPress,
    loading 
}) => {
    
    const isPositive = parseFloat(changeValue) >= 0;
    const sign = isPositive && parseFloat(changeValue) > 0 ? '+' : '';
    const color = isPositive ? '#83EDA6' : '#EB5B5B';

    return (
        <View>
            <View style={appStyles.totalBalanceContainer}>
                <Text style={appStyles.totalBalanceText}>Total balance</Text>
            </View>
            
            <View style={styles.container}>
                <View style={styles.textBlock}>
                    {loading ? (
                         <ActivityIndicator size="large" color="#83EDA6" style={styles.marginBalance} />
                    ) : (
                        <>
                            <Text style={styles.balanceText}>{balance}$</Text>
                            <View style={styles.pnlContainer}>
                                <Text style={styles.pnlLabel}>PnL Today: </Text>
                                <Text style={[styles.pnlValue, { color }]}>
                                    {sign}{changeValue}$ ({sign}{changePercent}%)
                                </Text>
                            </View>
                        </>
                    )}
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={onTopUpPress}>
                        <Text style={styles.buttonText}>Top Up</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.actionButton, styles.withdrawButton]} onPress={onWithdrawPress}>
                        <Text style={styles.buttonText}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(8),
    },
    textBlock: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
    },
    balanceText: {
        fontSize: moderateScale(30),
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        includeFontPadding: false,
    },
    pnlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -4,
    },
    pnlLabel: {
        fontSize: moderateScale(11),
        fontFamily: 'Poppins-Medium',
        color: '#AAAAAA',
    },
    pnlValue: {
        fontSize: moderateScale(11),
        fontFamily: 'Poppins-Medium',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    actionButton: {
        backgroundColor: '#83EDA6',
        borderRadius: moderateScale(8),
        paddingVertical: moderateScale(9),
        paddingHorizontal: moderateScale(12),
        alignItems: 'center',
    },
    withdrawButton: {
        backgroundColor: '#4A4A4A',
    },
    buttonText: {
        fontSize: moderateScale(13),
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
    },
    marginBalance: { marginLeft: scale(10) },
});

export default TotalBalance;