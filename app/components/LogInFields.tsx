import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { authStyles } from '../styles/authStyles';
import { colors } from '../src/theme/theme';

type LoginFieldsProps = {
    username: string;
    setUsername: (username: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    showUsername?: boolean;
};
const LoginFields: React.FC<LoginFieldsProps> = ({ username, setUsername, email, setEmail, password, setPassword, showUsername = true }) => {
    const { t } = useTranslation();
    return (
        <View style={authStyles.containerFields}>
            {showUsername && (
                <>
                    <Text style={authStyles.fieldsName}>{t('auth.fields.username')}</Text>
                    <TextInput style={authStyles.fields} placeholderTextColor={colors.textMuted} placeholder={t('auth.fields.placeholderUsername')} value={username} onChangeText={setUsername} autoCapitalize="none" />
                </>
            )}
            <Text style={authStyles.fieldsName}>{t('auth.fields.email')}</Text>
            <TextInput style={authStyles.fields} placeholderTextColor={colors.textMuted} placeholder={t('auth.fields.placeholderEmail')} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <Text style={authStyles.fieldsName}>{t('auth.fields.password')}</Text>
            <TextInput style={authStyles.fields} placeholderTextColor={colors.textMuted} placeholder={t('auth.fields.placeholderPassword')} secureTextEntry value={password} onChangeText={setPassword} />
        </View>
    )
}

export default LoginFields;
