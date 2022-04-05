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
import { getTrending } from "../stores/trending/trendingActions";
import { useFocusEffect } from '@react-navigation/native';

import { MainLayout } from ".";
import { Header } from "../components";
import { TextButton } from "../components";

import { SIZES, COLORS, FONTS } from '../constants';


const Trending = ({ getTrending, coins }) => {

    useFocusEffect(
        React.useCallback(() => {
            getTrending()
        }, [])
    )

    const renderItem = ({ item: crypto }) => {

        let positionColor = (crypto.item.score < 3)
        ? COLORS.lightGreen : COLORS.white

        return (
            <TouchableOpacity style={styles.touchableOpacity}>
                {/*Logo*/}
                <View style={styles.viewLogo}>
                    <Image
                        source={{ uri: crypto.item.small }}
                        style={styles.imageLogo}
                    />
                </View>

                {/*Crypto*/}
                <View style={styles.viewCrypto1}>
                    <Text style={styles.textCrypto}>{crypto.item.name}</Text> 
                </View>

                <View>
                    <Text style={{ ...styles.textPosition,
                        color: positionColor, 
                    }}>{crypto.item.score + 1}°</Text>
                    <View style={styles.viewCrypto2}
                    />
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <MainLayout>
            <View style={styles.viewMain1} >
                <Header
                    title="Most Searched"
                />

                <View style={styles.viewMain2}>
                    <TextButton
                        label="Top 7 Crypto"
                    />
                    <TextButton
                        containerStyle={{
                            marginLeft: SIZES.base
                        }}
                        label="Last 24h"
                    />
                </View>

                {/*LISTA CRYPTO*/}
                
                <FlatList
                    data={coins}
                    keyExtractor={item => item.item.id} 
                    contentContainerStyle={{ 
                        paddingHorizontal: SIZES.padding 
                    }}
                    
                    renderItem={renderItem}
                />
            </View>
        </MainLayout>
    )
}

function mapStateToProps(state) {
    return {
        coins: state.trendingReducer.coins
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTrending: () => {
            return dispatch(getTrending())}
    }
}

const TrendingContainer = connect(mapStateToProps, mapDispatchToProps)(Trending);
export default TrendingContainer;

// styles
const styles = StyleSheet.create({
    touchableOpacity: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewLogo: {
        width: 40
    },
    viewCrypto1: {
        flex: 1
    },
    viewCrypto2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    viewMain1: {
        flex: 1,
        backgroundColor: COLORS.black
    },
    viewMain2: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        padding: SIZES.base
    },
    imageLogo: {
        height: 20,
        width: 20
    },
    textCrypto:{
        color: COLORS.white,
        ...FONTS.h3    
    },
    textPosition: {
        textAlign:'right', 
        ...FONTS.h4
    }
});