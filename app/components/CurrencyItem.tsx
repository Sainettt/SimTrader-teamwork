import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { appStyles } from '../styles/appStyles';
import { Currency } from '../src/types/types';
import { moderateScale, scale, verticalScale } from '../utils/responsive';

type Props = {
  item: Currency;
  onPressItem?: (item: Currency) => void;
}

const CurrencyItem: React.FC<Props> = React.memo(({ item, onPressItem }) => {
  const isPositive = parseFloat(item.change) >= 0;
  const handlePress = React.useCallback(() => {
    onPressItem?.(item);
  }, [onPressItem, item]);

  return (
    <TouchableOpacity style={localStyles.itemRow} onPress={handlePress}>
      <View>
        <Text style={appStyles.currencyNameAndPriceText}>{item.name}</Text>
      </View>

      <View style={localStyles.marginPriceVariable}>
        <Text style={appStyles.currencyNameAndPriceText}> {item.price} </Text>
      </View>

      <View
        style={
          isPositive
            ? appStyles.currencyChangePositiveContainer
            : appStyles.currencyChangeNegativeContainer
        }
      >
        <Text style={appStyles.currencyChangeText}>
          {parseFloat(item.change) > 0 ? '+' : ''}
          {item.change}%
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const localStyles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  marginPriceVariable: {
    marginLeft: scale(40),
  },
});
export default CurrencyItem;
