import React, { useState, useContext, useCallback } from 'react';
import { View, FlatList, ListRenderItem, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appStyles } from '../../styles/appStyles';
import UpperText from '../../components/UpperText';
import BottomBar from '../../components/BottomBar';
import TransactionItem from '../../components/TransactionItem';

import { AuthContext } from '../../context/AuthContext';
import { walletAPI } from '../../services/api';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';

const TransactionHistoryScreen = ({ navigation }: any) => {
  const { userId } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchHistory = async () => {
        if (!userId) return;
        try {
          const data = await walletAPI.getTransactions(Number(userId));
          if (isActive) {
            setTransactions(data);
          }
        } catch (e) {
          console.log(e);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchHistory();

      return () => {
        isActive = false;
      };
    }, [userId])
  );

  const renderItem = useCallback<ListRenderItem<any>>(
    ({ item }) => <TransactionItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const goBack = useCallback(() => navigation.goBack(), [navigation]);
  const goToMain = useCallback(() => navigation.navigate('Main'), [navigation]);
  const goToWallet = useCallback(() => navigation.navigate('Wallet'), [navigation]);
  const goToSettings = useCallback(() => navigation.navigate('Settings'), [navigation]);
  const noop = useCallback(() => {}, []);

  return (
    <SafeAreaView
        style={appStyles.containerWithoutPadding}
        edges={['top', 'left', 'right']}
    >

      <UpperText
        title="History"
        onPress={goBack}
      />

      <View style={appStyles.flexContainer}>
        {loading ? (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#83EDA6" />
            </View>
        ) : (
            <FlatList
                data={transactions}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.emptyText}>No transactions yet</Text>
                    </View>
                }
            />
        )}
      </View>

      <View>
        <BottomBar
            homePress={goToMain}
            walletPress={goToWallet}
            transactionPress={noop}
            settingsPress={goToSettings}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(40),
    },
    emptyText: {
        color: '#777',
        fontFamily: 'Poppins-Regular',
        fontSize: moderateScale(16),
    },
    contentContainerStyle: {
        paddingHorizontal: scale(20),
        paddingBottom: verticalScale(20),
    },
});

export default TransactionHistoryScreen;