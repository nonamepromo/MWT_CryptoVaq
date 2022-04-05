import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { COLORS, FONTS } from '../constants';

const TextButton = ({label, containerStyle, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.touchableOpacity,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TextButton;

// styles
const styles = StyleSheet.create({
text: {
    color: COLORS.white,
    ...FONTS.h3
},
touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 18,
    borderRadius: 15,
    backgroundColor: COLORS.gray1,
}
});