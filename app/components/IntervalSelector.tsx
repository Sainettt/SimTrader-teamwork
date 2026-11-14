import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/responsive';

type Props = {
    intervals: string[];                
    selectedInterval: string;           
    onSelect: (interval: string) => void; 
};

export const IntervalSelector: React.FC<Props> = ({ intervals, selectedInterval, onSelect }) => {
    return (
        <View style={styles.intervalsContainer}>
            {intervals.map((interval) => (
                <TouchableOpacity
                    key={interval}
                    style={[
                        styles.intervalButton,
                        selectedInterval === interval && styles.activeIntervalButton
                    ]}
                    onPress={() => onSelect(interval)}
                >
                    <Text style={[
                        styles.intervalText,
                        selectedInterval === interval && styles.activeIntervalText
                    ]}>
                        {interval}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    intervalsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: scale(20),
        marginVertical: verticalScale(8),
    },
    intervalButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(10),
        backgroundColor: 'transparent',
    },
    activeIntervalButton: {
        backgroundColor: '#0E1013',
    },
    intervalText: {
        color: '#777',
        fontFamily: 'Poppins-Bold',
        fontSize: moderateScale(13),
    },
    activeIntervalText: {
        color: '#FFFFFF',
    },
});