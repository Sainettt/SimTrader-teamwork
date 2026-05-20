import React, { useState, useCallback, useRef, useContext } from 'react';
import { View, FlatList, ListRenderItem, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import BottomBar from '../../components/BottomBar';
import { appStyles } from '../../styles/appStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../src/navigation/appTypes';
import UpperText from '../../components/UpperText';
import CurrencyItem from '../../components/CurrencyItem';
import { AuthContext } from '../../context/AuthContext';
import { currencyAPI } from '../../services/api';
import { walletAPI } from '../../services/api';
import { Currency } from '../../src/types/types';
type AllCurrenciesProps = NativeStackScreenProps<
  AppStackParamList,
  'AllCryptoAssets'
>;

const AllCryptoAssetsScreen: React.FC<AllCurrenciesProps> = ({
  navigation,
}) => {
  const { userId } = useContext(AuthContext);
  const [allCryptoAssets, setAllCryptoAssets] = useState<Currency[]>([]);
  const [portfolioAssets, setPortfolioAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const isLoaded = useRef(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchAllCurrencies = async () => {
        if (!isLoaded.current) {
          setLoading(true);
        }
        try {
          const cryptoData = await currencyAPI.getTopCryptos(100);
          const portfolioData = userId
            ? await walletAPI.getPortfolio(userId)
            : null;
          if (isActive) {
            setAllCryptoAssets(cryptoData);
            setPortfolioAssets(portfolioData ? portfolioData.assets : []);
            isLoaded.current = true;
          }
        } catch (e) {
          console.log(e);
        } finally {
          if (isActive) setLoading(false);
        }
      };
      fetchAllCurrencies();

      const intervalId = setInterval(fetchAllCurrencies, 30000);

      return () => {
        isActive = false;
        clearInterval(intervalId);
      };
    }, [userId]),
  );
  const handleCurrencyPress = useCallback((item: Currency) => {
    const asset = portfolioAssets.find((a: any) => a.symbol === item.name);
    const ownedAmount = asset ? asset.amount : 0;

    navigation.navigate('Exchange', {
      coinId: item.id,
      symbol: item.name,
      name: item.name,
      currentPrice: item.price,
      priceChange: item.change,
      ownedAmount: ownedAmount,
    });
  }, [navigation, portfolioAssets]);

  const renderItem = useCallback<ListRenderItem<Currency>>(
    ({ item }) => <CurrencyItem item={item} onPressItem={handleCurrencyPress} />,
    [handleCurrencyPress],
  );

  const goToMain = useCallback(() => navigation.navigate('Main'), [navigation]);
  const goToWallet = useCallback(() => navigation.navigate('Wallet'), [navigation]);
  const goToHistory = useCallback(() => navigation.navigate('TransactionHistory'), [navigation]);
  const goToSettings = useCallback(() => navigation.navigate('Settings'), [navigation]);
  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <SafeAreaView style={appStyles.flexContainer} edges={['top', 'left', 'right']}>
      <View style={appStyles.containerWithoutPadding}>
        <UpperText
          title="All Crypto Assets"
          onPress={goBack}
        />
        {loading && allCryptoAssets.length === 0 ? (
          <View style={appStyles.indicatorStyle}>
            <ActivityIndicator size="large" color="#83EDA6" />
          </View>
        ) : (
          <FlatList
            data={allCryptoAssets}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            initialNumToRender={20}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews
            ListEmptyComponent={
              <Text style={appStyles.emptyListText}>Loading data...</Text>
            }
          />
        )}
      </View>
      <BottomBar
        homePress={goToMain}
        walletPress={goToWallet}
        transactionPress={goToHistory}
        settingsPress={goToSettings}
      />
    </SafeAreaView>
  );
};
export default AllCryptoAssetsScreen;
