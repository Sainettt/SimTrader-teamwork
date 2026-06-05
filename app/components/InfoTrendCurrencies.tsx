import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { appStyles } from '../styles/appStyles';
import CurrencyItem from '../components/CurrencyItem';
import { Currency } from '../src/types/types';

type Props = {
  data: Currency[];
  onPressItem?: (item: Currency) => void;
};

const keyExtractor = (item: Currency) => item.id;

const InfoTrendCurrencies: React.FC<Props> = React.memo(({ data, onPressItem }) => {
    const { t } = useTranslation();
    const renderItem = useCallback<ListRenderItem<Currency>>(
        ({ item }) => <CurrencyItem item={item} onPressItem={onPressItem} />,
        [onPressItem],
    );

    return (
        <View style={localStyles.root}>
            <View style={appStyles.infoTrendHeaderContainer}>
                <View>
                    <Text style={appStyles.infoTrendHeaderText}>{t('main.trending')}</Text>
                </View>
                <View style={localStyles.marginPriceTextContainer}>
                    <Text style={appStyles.infoPriceHeaderText}>{t('main.lastPrice')}</Text>
                </View>
                <View style={localStyles.marginChangeTextContainer}>
                    <Text style={appStyles.infoPriceHeaderText}>{t('main.change24h')}</Text>
                </View>
            </View>
            <View style={appStyles.trendHeaderContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={10}
                    windowSize={5}
                    removeClippedSubviews
                    ListEmptyComponent={
                        <Text style={appStyles.emptyListText}>
                            {t('common.loadingData')}
                        </Text>
                    }
                />
            </View>
        </View>
    );
});

const localStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  marginPriceTextContainer:{
    marginLeft: 20,
  },
  marginChangeTextContainer:{
    marginRight: 10,
  },
});

export default InfoTrendCurrencies;