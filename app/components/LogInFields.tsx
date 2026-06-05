import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { authStyles } from '../styles/authStyles';
type LoginFieldsProps = {
    username: string;
    setUsername: (username: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
};
const LoginFields: React.FC<LoginFieldsProps> = ({ username, setUsername, email, setEmail, password, setPassword }) => {
    const { t } = useTranslation();
    return (
        <View style={authStyles.containerFields}>
            <Text style={authStyles.fieldsName}>{t('auth.fields.username')}</Text>
            <TextInput style={authStyles.fields} placeholder={t('auth.fields.placeholderUsername')} value={username} onChangeText={setUsername} />
            <Text style={authStyles.fieldsName}>{t('auth.fields.email')}</Text>
            <TextInput style={authStyles.fields} placeholder={t('auth.fields.placeholderEmail')} value={email} onChangeText={setEmail} />
            <Text style={authStyles.fieldsName}>{t('auth.fields.password')}</Text>
            <TextInput style={authStyles.fields} placeholder={t('auth.fields.placeholderPassword')} secureTextEntry value={password} onChangeText={setPassword} />
        </View>
    )
}

export default LoginFields;
