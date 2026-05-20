import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const { logout, userInfo } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Icon name="arrow-back" size={moderateScale(26)} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Settings</Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profile</Text>
                    <View style={styles.card}>
                        <View style={styles.userInfoRow}>
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>
                                    {userInfo?.username?.charAt(0).toUpperCase() || 'U'}
                                </Text>
                            </View>
                            <View style={styles.userTextWrap}>
                                <Text style={styles.username} numberOfLines={1}>{userInfo?.username || 'User'}</Text>
                                <Text style={styles.email} numberOfLines={1}>{userInfo?.email || 'email@example.com'}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>General</Text>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <Icon name="language-outline" size={moderateScale(20)} color="#D9D9D9" />
                            <Text style={styles.settingText}>Language</Text>
                        </View>
                        <Text style={styles.settingValue}>English</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <Icon name="notifications-outline" size={moderateScale(20)} color="#D9D9D9" />
                            <Text style={styles.settingText}>Notifications</Text>
                        </View>
                        <Icon name="chevron-forward" size={moderateScale(18)} color="#9D9C9C" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <Icon name="shield-checkmark-outline" size={moderateScale(20)} color="#D9D9D9" />
                            <Text style={styles.settingText}>Security</Text>
                        </View>
                        <Icon name="chevron-forward" size={moderateScale(18)} color="#9D9C9C" />
                    </TouchableOpacity>
                </View>

                <View style={styles.logoutContainer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutText}>Log Out</Text>
                        <Icon name="log-out-outline" size={moderateScale(18)} color="#EB5B5B" />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3C3C3C',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(15),
    },
    backButton: {
        marginRight: scale(15),
    },
    headerText: {
        fontSize: moderateScale(20),
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: scale(20),
        paddingBottom: verticalScale(20),
    },
    section: {
        marginBottom: verticalScale(20),
    },
    sectionTitle: {
        color: '#D9D9D9',
        fontSize: moderateScale(13),
        marginBottom: verticalScale(8),
        textTransform: 'uppercase',
        fontFamily: 'Poppins-SemiBold',
    },
    card: {
        backgroundColor: '#636363',
        borderRadius: moderateScale(12),
        padding: moderateScale(15),
        elevation: 5,
    },
    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(25),
        backgroundColor: '#83EDA6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(15),
    },
    avatarText: {
        color: '#3C3C3C',
        fontSize: moderateScale(22),
        fontFamily: 'Poppins-Bold',
    },
    userTextWrap: {
        flex: 1,
    },
    username: {
        color: '#FFFFFF',
        fontSize: moderateScale(17),
        fontFamily: 'Poppins-Bold',
    },
    email: {
        color: '#D9D9D9',
        fontSize: moderateScale(13),
        marginTop: 2,
        fontFamily: 'Poppins-Regular',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#636363',
        padding: moderateScale(14),
        marginBottom: verticalScale(8),
        borderRadius: moderateScale(12),
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
    },
    settingText: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontFamily: 'Poppins-Medium',
    },
    settingValue: {
        color: '#D9D9D9',
        fontSize: moderateScale(13),
        fontFamily: 'Poppins-Regular',
    },
    logoutContainer: {
        marginTop: verticalScale(10),
        marginBottom: verticalScale(20),
    },
    logoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(235, 91, 91, 0.15)',
        padding: moderateScale(14),
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: 'rgba(235, 91, 91, 0.5)',
    },
    logoutText: {
        color: '#EB5B5B',
        fontSize: moderateScale(15),
        marginRight: scale(8),
        fontFamily: 'Poppins-SemiBold',
    },
});

export default SettingsScreen;
