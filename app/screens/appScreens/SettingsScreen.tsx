import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
    Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';
import {
    changeLanguage,
    SUPPORTED_LANGUAGES,
    SupportedLanguage,
} from '../../src/i18n';

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
    en: 'English',
    pl: 'Polski',
    de: 'Deutsch',
};

const SettingsScreen = () => {
    const navigation = useNavigation();
    const { logout, userInfo } = useContext(AuthContext);
    const { t, i18n } = useTranslation();
    const [languageModalVisible, setLanguageModalVisible] = useState(false);

    const currentLang = (i18n.resolvedLanguage || i18n.language || 'en') as SupportedLanguage;

    const handleSelectLanguage = async (lng: SupportedLanguage) => {
        setLanguageModalVisible(false);
        if (lng !== currentLang) {
            await changeLanguage(lng);
        }
    };

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
                <Text style={styles.headerText}>{t('settings.title')}</Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('settings.profile')}</Text>
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
                    <Text style={styles.sectionTitle}>{t('settings.general')}</Text>

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => setLanguageModalVisible(true)}
                    >
                        <View style={styles.settingItemLeft}>
                            <Icon name="language-outline" size={moderateScale(20)} color="#D9D9D9" />
                            <Text style={styles.settingText}>{t('settings.language')}</Text>
                        </View>
                        <Text style={styles.settingValue}>{LANGUAGE_LABELS[currentLang] || 'English'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.logoutContainer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutText}>{t('settings.logOut')}</Text>
                        <Icon name="log-out-outline" size={moderateScale(18)} color="#EB5B5B" />
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <Modal
                visible={languageModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setLanguageModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setLanguageModalVisible(false)}
                >
                    <Pressable style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('settings.languageModal.title')}</Text>
                        {SUPPORTED_LANGUAGES.map((lng) => {
                            const selected = lng === currentLang;
                            return (
                                <TouchableOpacity
                                    key={lng}
                                    style={[styles.languageOption, selected && styles.languageOptionSelected]}
                                    onPress={() => handleSelectLanguage(lng)}
                                >
                                    <Text style={styles.languageOptionText}>{LANGUAGE_LABELS[lng]}</Text>
                                    {selected && (
                                        <Icon name="checkmark" size={moderateScale(20)} color="#83EDA6" />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </Pressable>
                </Pressable>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(30),
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#3C3C3C',
        borderRadius: moderateScale(16),
        padding: moderateScale(20),
        borderWidth: 1,
        borderColor: '#555',
    },
    modalTitle: {
        fontSize: moderateScale(18),
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        marginBottom: verticalScale(15),
        textAlign: 'center',
    },
    languageOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(14),
        paddingHorizontal: scale(12),
        borderRadius: moderateScale(10),
        backgroundColor: '#4A4A4A',
        marginBottom: verticalScale(8),
    },
    languageOptionSelected: {
        borderWidth: 1,
        borderColor: '#83EDA6',
    },
    languageOptionText: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontFamily: 'Poppins-Medium',
    },
});

export default SettingsScreen;
