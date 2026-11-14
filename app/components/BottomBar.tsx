import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import { appStyles } from '../styles/appStyles';
import { moderateScale } from '../utils/responsive';

type BottomBarProps = {
    homePress: () => void;
    walletPress: () => void;
    transactionPress: () => void;
    settingsPress: () => void;
}

const ICON_SIZE = moderateScale(32);
const ICON_COLOR = '#AAB2BF';

const BottomBar: React.FC<BottomBarProps> = ({ homePress, walletPress, transactionPress, settingsPress }) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[appStyles.bottomBarContainer, { paddingBottom: moderateScale(12) + insets.bottom }]}>
            <TouchableOpacity onPress={homePress} hitSlop={8}>
                <Ionicons name="home" size={ICON_SIZE} color={ICON_COLOR} />
            </TouchableOpacity>
            <TouchableOpacity onPress={walletPress} hitSlop={8}>
                <Entypo name="wallet" size={ICON_SIZE} color={ICON_COLOR} />
            </TouchableOpacity>
            <TouchableOpacity onPress={transactionPress} hitSlop={8}>
                <Octicons name="history" size={ICON_SIZE} color={ICON_COLOR} />
            </TouchableOpacity>
            <TouchableOpacity onPress={settingsPress} hitSlop={8}>
                <Ionicons name="settings-sharp" size={ICON_SIZE} color={ICON_COLOR} />
            </TouchableOpacity>
        </View>
    );
};

export default BottomBar;
