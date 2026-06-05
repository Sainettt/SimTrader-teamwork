import React, { useState, useRef, useContext, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, ListRenderItem, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyles } from '../../styles/appStyles';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';

import BottomBar from '../../components/BottomBar';
import UpperText from '../../components/UpperText';
import WalletHeader from '../../components/WalletHeader';
import WalletAssetItem from '../../components/WalletAssetItem';
import { AuthContext } from '../../context/AuthContext';

import { walletAPI } from '../../services/api';


type Asset = {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  value: number;
  price: number;
  change: number;
};

const WalletScreen = ({ navigation }: any) => {
  const { userId } = useContext(AuthContext);
  const { t } = useTranslation();
  const [totalBalance, setTotalBalance] = useState('0.00');
  const [portfolioAssets, setPortfolioAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [portfolioStats, setPortfolioStats] = useState({
    val: '0.00',
    pct: '0.00',
  });
  const isLoaded = useRef(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchWalletData = async () => {
        if (!userId) return;
        if (!isLoaded.current) setLoading(true);

        try {
          const data = await walletAPI.getPortfolio(Number(userId));

          if (isActive) {
            setTotalBalance(data.totalBalanceUsd);
            setPortfolioAssets(data.assets);
            setPortfolioStats({
              val: data.totalChangeValue,
              pct: data.totalChangePercent,
            });
            isLoaded.current = true;
          }
        } catch (e) {
          console.log('Error fetching wallet:', e);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchWalletData();
      const intervalId = setInterval(fetchWalletData, 15000);

      return () => {
        isActive = false;
        clearInterval(intervalId);
      };
    }, [userId]),
  );

  const handleAssetPress = useCallback((item: Asset) => {
    if (item.symbol === 'USD') return;
    navigation.navigate('Exchange', {
      coinId: `${item.symbol}USDT`,
      symbol: item.symbol,
      name: item.name,
      currentPrice: item.price,
      priceChange: item.change,
      ownedAmount: item.amount,
    });
  }, [navigation]);

  const renderItem = useCallback<ListRenderItem<Asset>>(
    ({ item }) => <WalletAssetItem item={item} onPress={handleAssetPress} />,
    [handleAssetPress],
  );

  const goBack = useCallback(() => navigation.goBack(), [navigation]);
  const goToMain = useCallback(() => navigation.navigate('Main'), [navigation]);
  const goToHistory = useCallback(() => navigation.navigate('TransactionHistory'), [navigation]);
  const goToSettings = useCallback(() => navigation.navigate('Settings'), [navigation]);
  const goToTopUp = useCallback(() => navigation.navigate('BalanceTopUp'), [navigation]);
  const goToWithdraw = useCallback(() => navigation.navigate('Withdraw'), [navigation]);
  const noop = useCallback(() => {}, []);

  const listHeader = useMemo(
    () => (
      <WalletHeader
        balance={`${totalBalance}`}
        changeValue={portfolioStats.val}
        changePercent={portfolioStats.pct}
        loading={loading && !isLoaded.current}
        onTopUpPress={goToTopUp}
        onWithdrawPress={goToWithdraw}
      />
    ),
    [totalBalance, portfolioStats.val, portfolioStats.pct, loading, goToTopUp, goToWithdraw],
  );

  const listEmpty = useMemo(
    () =>
      !loading ? (
        <View style={styles.listEmptyContainer}>
          <Text style={styles.noAssetsFoundText}>{t('wallet.noAssets')}</Text>
        </View>
      ) : null,
    [loading, t],
  );

  return (
    <SafeAreaView
      style={appStyles.containerWithoutPadding}
      edges={['top', 'left', 'right']}
    >
      <UpperText title={t('wallet.title')} onPress={goBack} />

      <View style={appStyles.flexContainer}>
        <FlatList
          data={portfolioAssets}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={listEmpty}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>

      <View>
        <BottomBar
          homePress={goToMain}
          walletPress={noop}
          transactionPress={goToHistory}
          settingsPress={goToSettings}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { 
    paddingHorizontal: scale(20), 
    paddingBottom: verticalScale(20) 
  },
  noAssetsFoundText: {
    color: '#999',
    fontSize: moderateScale(14)
  },
  listEmptyContainer: {
    padding: moderateScale(20), 
    alignItems: 'center'
  }
})


export default WalletScreen;
