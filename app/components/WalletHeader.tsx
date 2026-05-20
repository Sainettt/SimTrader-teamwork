import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TotalBalance from './TotalBalance';
import { moderateScale, scale, verticalScale } from '../utils/responsive';

type Props = {
  balance: string;
  loading?: boolean;
  onTopUpPress: () => void;
  onWithdrawPress: () => void;
  changeValue?: string;   
  changePercent?: string;
};

const WalletHeader: React.FC<Props> = ({ balance, changeValue, changePercent,loading = false, onTopUpPress, onWithdrawPress }) => {
  return (
    <View style={styles.headerWrapper}>
      <TotalBalance 
        balance={balance} 
        loading={loading}
        changeValue={changeValue}
        changePercent={changePercent} 
        onTopUpPress={onTopUpPress}
        onWithdrawPress={onWithdrawPress} 
      />

      <View style={styles.tableHeaderRow}>
        
        <View style={styles.leftSide}>
          <Text style={styles.columnHeaderText}>Coin</Text>
        </View>

        <View style={styles.centerSide}>
          <Text style={styles.columnHeaderText}>Holdings</Text>
        </View>

        <View style={styles.rightSide}>
          <Text style={styles.columnHeaderText}>Value</Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    marginBottom: verticalScale(5),
  },
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(5),
    marginTop: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#4A4A4A',
  },
  leftSide: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSide: {
    flex: 1,
    alignItems: 'center',
  },
  rightSide: {
    flex: 1,
    alignItems: 'flex-end',
  },
  columnHeaderText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(13),
  },
});

export default WalletHeader;