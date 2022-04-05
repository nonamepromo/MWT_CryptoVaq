import React from 'react'
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native'

 import { COLORS, FONTS, SIZES } from "../constants";

 const Header = ({title}) => {
    return (
        <View style={styles.view}>
        <Text style={styles.text}>
            {title}
        </Text>
        </View>
    )
 }

 export default Header;

  // styles
const styles = StyleSheet.create({
    view: {
        paddingHorizontal: SIZES.padding,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: COLORS.gray
    },
    text: {
        color: COLORS.white, 
        ...FONTS.h3, 
        fontSize: 18, 
        marginTop: 60, 
        marginBottom: 10
    }
  });