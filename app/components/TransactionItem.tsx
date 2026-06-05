import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { moderateScale, scale, verticalScale } from '../utils/responsive';

type Transaction = {
  id: number;
  type: string;
  currency: string;
  amount: number;
  price: number;
  totalUsd: number;
  createdAt: string;
};

type Props = {
  item: Transaction;
};

const TransactionItem: React.FC<Props> = React.memo(({ item }) => {
  const { t, i18n } = useTranslation();
  const date = new Date(item.createdAt).toLocaleDateString(i18n.language, {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
  });

  let titleText = '';
  let amountText = '';
  let valueColor = '#FFFFFF';

  switch (item.type) {
    case 'DEPOSIT':
      titleText = t('history.topUp');
      valueColor = '#83EDA6';
      amountText = `+${item.amount.toFixed(2)}$`;
      break;

    case 'WITHDRAWAL':
      titleText = t('history.withdraw');
      valueColor = '#83EDA6';
      amountText = `-${item.amount.toFixed(2)}$`;
      break;

    case 'BUY':
      titleText = t('history.buy', { currency: item.currency });
      valueColor = '#FFFFFF';
      amountText = `-${item.totalUsd.toFixed(2)}$`;
      break;

    case 'SELL':
      titleText = t('history.sell', { currency: item.currency });
      valueColor = '#FFFFFF';
      amountText = `+${item.totalUsd.toFixed(2)}$`;
      break;

    default:
      titleText = t('history.transaction');
      amountText = `${item.totalUsd.toFixed(2)}$`;
  }

  return (
    <View style={styles.container}>

      <View style={styles.left}>
        <Text style={styles.typeText}>{titleText}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.amountText, { color: valueColor }]}>
          {amountText}
        </Text>
        
        {(item.type === 'BUY' || item.type === 'SELL') && (
            <Text style={styles.subText}>
                {item.amount} {item.currency} @ {item.price.toFixed(2)}$
            </Text>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#4A4A4A',
  },
  left: {
    flexDirection: 'column',
    gap: 4,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  typeText: {
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: moderateScale(11),
    fontFamily: 'Poppins-Regular',
    color: '#AAAAAA',
  },
  amountText: {
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-Bold',
  },
  subText: {
    fontSize: moderateScale(11),
    fontFamily: 'Poppins-Regular',
    color: '#777',
  },
});

export default TransactionItem;