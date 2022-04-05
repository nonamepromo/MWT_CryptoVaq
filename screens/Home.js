import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet
} from 'react-native';

import { connect } from "react-redux";
import { getMarket } from "../stores/market/marketActions";
import { useFocusEffect } from '@react-navigation/native';

import { MainLayout } from "./";
import { Header } from "../components";
import { TextButton } from "../components";

import { SIZES, COLORS, FONTS, icons } from '../constants';

const Home = ({ getMarket, coins }) => {

    useFocusEffect(
        React.useCallback(() => {
            getMarket()
        }, [])
    )

    const renderItem = ({ item }) => {
        
        let priceColor = (item.price_change_percentage_30d_in_currency == 0)
        ? COLORS.lightGray3 : (item.price_change_percentage_30d_in_currency > 0)
        ? COLORS.lightGreen : COLORS.red

        return (
            <TouchableOpacity style={styles.touchableOpacity}>
                {/*Logo*/}
                <View style={styles.viewLogo}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.imageLogo}    
                    />
                </View>

                {/*Crypto*/}
                <View style={styles.viewCrypto}>
                    <Text style={styles.textCrypto}>{item.name}</Text> 
                </View>

                {/*Price*/}
                <View>
                    <Text style={styles.textCryptoPrice}>€ {item.current_price}</Text>
                    <View style={styles.viewCryptoPrice}>
                        {
                            item.price_change_percentage_30d_in_currency != 0 &&
                            <Image
                                source={icons.upArrow}
                                style={{...styles.imagePrice,
                                    tintColor: priceColor,
                                    transform: item.price_change_percentage_30d_in_currency > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
                                }}
                            />
                        }
                        {/*Percentage*/}
                        <Text
                            style={{...styles.textPercentage,
                                color: priceColor,
                                ...FONTS.body5,
                            }}
                        >{item.price_change_percentage_30d_in_currency.toFixed(2)}%</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <MainLayout>
            <View style={styles.viewMainLayout}>
                <Header
                    title="Top Cryptocurrency"
                />
                
                {/*TextButton*/}
                <View style={styles.viewMainTextButton}>
                    <TextButton
                        label="EUR"
                    />

                    <TextButton
                        containerStyle={{
                            marginLeft: SIZES.base
                        }}
                        label="Last 30 days"
                    />

                    <TextButton
                        containerStyle={{
                            marginLeft: SIZES.base
                        }}
                        label="Crypto: 30"
                    />
                </View>

                {/*Lista Crypto*/}
                <FlatList
                    data={coins}
                    keyExtractor={item => item.id} 
                    contentContainerStyle={{ 
                        paddingHorizontal: SIZES.padding 
                    }}
                    
                    renderItem={renderItem}
                    
                    ListFooterComponent={
                        <View style={styles.viewListCrypto}/>
                    }
                />
            </View>
        </MainLayout>
    )
}

function mapStateToProps(state) {
    return {
        coins: state.marketReducer.coins
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))}
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;

// styles
const styles = StyleSheet.create({
    imagePrice: {
        height: 10,
        width: 10,
    },
    touchableOpacity: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewLogo: {
        width: 40
    },
    viewCrypto: {
        flex: 1
    },
    viewCryptoPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    viewMainLayout: {
        flex: 1,
        backgroundColor: COLORS.black
    },
    viewMainTextButton: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        padding: SIZES.base
    },
    viewListCrypto: {
        marginBottom: 10
    },
    imageLogo: {
        height: 20,
        width: 20
    },
    textCrypto: {
        color: COLORS.white, 
        ...FONTS.h3
    },
    textCryptoPrice: {
        textAlign:'right', 
        color: COLORS.white, 
        ...FONTS.h4
    },
    textPercentage: {
        lineHeight: 15,
        marginLeft: 5,
    },
});