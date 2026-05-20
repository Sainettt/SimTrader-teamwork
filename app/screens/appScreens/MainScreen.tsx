import React, { useState, useContext, useCallback, useRef} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { appStyles } from '../../styles/appStyles';
import InfoTrendCurrencies from '../../components/InfoTrendCurrencies';
import BottomBar from '../../components/BottomBar';
import { AppStackParamList } from '../../src/navigation/appTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { currencyAPI, walletAPI } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import  TotalBalance  from '../../components/TotalBalance';
type MainProps = NativeStackScreenProps<AppStackParamList, 'Main'>;

const MainScreen: React.FC<MainProps> = ({ navigation }: MainProps) => {
  const {userId} = useContext(AuthContext);
  const [totalBalance, setTotalBalance] = useState('0.00');
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [portfolioAssets, setPortfolioAssets] = useState<any[]>([]);
  const [portfolioStats, setPortfolioStats] = useState({
      val: '0.00',
      pct: '0.00',
    });
  const [loading, setLoading] = useState(false);

  const isLoaded = useRef(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        if (!userId) return;
        if (!isLoaded.current) setLoading(true);

        try {
          const [cryptoData, portfolioData] = await Promise.all([
             currencyAPI.getTopCryptos(10),
             walletAPI.getPortfolio(userId)
          ]);
          if (isActive){
            setCryptoAssets(cryptoData);
            setTotalBalance(portfolioData.totalBalanceUsd);
            setPortfolioAssets(portfolioData.assets);
            setPortfolioStats({
              val: portfolioData.totalChangeValue,
              pct: portfolioData.totalChangePercent,
            });
            isLoaded.current = true;
          }
        } catch (e) {
          console.log(e);
        } finally {
          if (isActive) setLoading(false);
        }
      };
      fetchData();

      const intervalId = setInterval(fetchData, 15000);

      return () => {
        isActive = false;
        clearInterval(intervalId);
      };

    }, [userId])
  );
  const handleCurrencyPress = useCallback((item: any) => {
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

  const goToPaymentMethod = useCallback(() => navigation.navigate('PaymentMethod'), [navigation]);
  const goToWithdraw = useCallback(() => navigation.navigate('Withdraw'), [navigation]);
  const goToAllAssets = useCallback(() => navigation.navigate('AllCryptoAssets'), [navigation]);
  const goToWallet = useCallback(() => navigation.navigate('Wallet'), [navigation]);
  const goToHistory = useCallback(() => navigation.navigate('TransactionHistory'), [navigation]);
  const goToSettings = useCallback(() => navigation.navigate('Settings'), [navigation]);
  const noop = useCallback(() => {}, []);

  return (
    <SafeAreaView style={appStyles.flexContainer} edges={['top', 'left', 'right']}>
      <View style={appStyles.container}>
        <View style={appStyles.headerContainer}>
          <Text style={appStyles.titleHeader}>Trending currencies</Text>
        </View>
        <TotalBalance
          balance={totalBalance}
          onTopUpPress={goToPaymentMethod}
          onWithdrawPress={goToWithdraw}
          changeValue={portfolioStats.val}
          changePercent={portfolioStats.pct}
          loading={loading}
        />
        <InfoTrendCurrencies data={cryptoAssets} onPressItem={handleCurrencyPress} />
        <View style={appStyles.viewAllContainer}>
          <TouchableOpacity
            style={appStyles.viewAllButton}
            onPress={goToAllAssets}
          >
            <Text style={appStyles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomBar
        homePress={noop}
        walletPress={goToWallet}
        transactionPress={goToHistory}
        settingsPress={goToSettings}
      />
    </SafeAreaView>
  );
};
export default MainScreen;
