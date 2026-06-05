import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import LoginFields from './LogInFields';
import { authStyles } from '../styles/authStyles';

type RegisterFieldsProps = {
    username: string;
    setUsername: (username: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
};
const RegisterFields: React.FC<RegisterFieldsProps> = ({ username, setUsername, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {
    const { t } = useTranslation();
    return (
        <View style={authStyles.containerFields}>
            <LoginFields
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
            />
            <Text style={authStyles.fieldsName}>{t('auth.fields.confirmPassword')}</Text>
            <TextInput style={authStyles.fields} placeholder={t('auth.fields.placeholderConfirmPassword')} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        </View>
    )
}

export default RegisterFields;
