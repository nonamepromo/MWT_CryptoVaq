import React from 'react';
import { 
    View,
    Animated,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
 } from 'react-native';

import { connect } from "react-redux";
import { getCap } from '../stores/cap/capActions';
import { useSelector } from 'react-redux';

import { COLORS, SIZES, FONTS} from "../constants";

const MainLayout = ({ children, isTradeModalVisible, getCap}) => {

    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

    //Animazione del tasto MarketCap
    React.useEffect(() => {
        if(isTradeModalVisible) {
            getCap()
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    }, [isTradeModalVisible, getCap])
    
    const data = useSelector((state) => state.capReducer.data.total_market_cap)

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 380]
    })

    const renderItem = ({ item }) => {
        const coinMarketCap = Object.keys(item)
        const valueMarketCap = Object.values(item)
        //{coinMarketCap.map((finalItem, i ) => {
            return (
                <TouchableOpacity style={styles.touchableOpacity}>
                    <Text style={styles.textCrypto}>{coinMarketCap[0]}: </Text> 
                    <Text style={styles.textCryptoPrice}>{valueMarketCap[0]}</Text>
                    <Text style={styles.textCrypto}>{coinMarketCap[1]}: </Text> 
                    <Text style={styles.textCryptoPrice}>{valueMarketCap[1]}</Text>
                    <Text style={styles.textCrypto}>{coinMarketCap[2]}: </Text> 
                    <Text style={styles.textCryptoPrice}>{valueMarketCap[2]}</Text>
                </TouchableOpacity>
            )
        //})}
    }

    return(
        <View style={styles.viewMainLayout}>
        {children}
        {isTradeModalVisible &&
            <Animated.View style={styles.animatedViewHide}
                opacity={modalAnimatedValue}
            />
        }
        <Animated.View 
            style={{ ...styles.animatedView,
                top: modalY,
            }}
        >
                <View style={styles.viewModal2}>
                    <Text style={styles.createdText}>
                        Market Cap:
                    </Text>
                    
                    <FlatList
                        data={[data]}
                        renderItem={renderItem}
                    />
                </View>  
        </Animated.View>
        </View>
    )
                        
}

function mapStateToProps(state) {
    return {
        data: state.capReducer.data,
        isTradeModalVisible: state.tabReducer.isTradeModalVisible,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCap: () => {
            return dispatch(getCap())}
    }
}

const MainLayoutContainer = connect(mapStateToProps, mapDispatchToProps)(MainLayout);
export default MainLayoutContainer;

// styles
const styles = StyleSheet.create({
    textCrypto:{
        textAlign: 'left',
        paddingTop: 15,
        paddingRight: 300,
        color: COLORS.white,
        ...FONTS.h3    
    },
    textCryptoPrice: {
        textAlign: 'left',
        color: COLORS.lightGray3, 
        ...FONTS.h3
    },
    touchableOpacity: {
        height: '100%',
        flexDirection: 'column',
    },
    viewMainLayout: {
        flex: 1,
    },
    animatedViewHide: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.transparentBlack
    },
    animatedView: {
        position: 'absolute',
        left: 0,
        width: "100%",
        height: "100%",
        padding: SIZES.padding,
        backgroundColor: COLORS.primary,
    },
    viewModal2: {
        flex: 1,
    },
    createdText: {
        color: COLORS.white,
        ...FONTS.h2
    },
});