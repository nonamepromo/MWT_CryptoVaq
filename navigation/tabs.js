import React from "react";
import {
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { connect } from "react-redux";
import { setTradeModalVisibility } from "../stores/tab/tabActions";

import { Home, Trending } from "../screens"
import { TabIcon } from "../components";
import { COLORS, icons } from "../constants"

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({children, onPress}) => {
    return (
        <TouchableOpacity
        style={ styles.touchableOpacity}
        onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

const Tabs = ({ setTradeModalVisibility, isTradeModalVisible }) => {

    function tradeTabButtonOnClickHandler() {
        setTradeModalVisibility(!isTradeModalVisible)
    }

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    height: 140,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => { 
                        //Se seleziono MC nasconde il resto
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.home}
                                    label="Home"
                                />
                            )
                        }
                    }
                }}
                //Fa in modo che quando MC è selezionato non posso
                //selezionare le altre tab pur essendo nascoste
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon
                                focused={focused}
                                icon={isTradeModalVisible ? icons.close : icons.briefcase}
                                iconStyle={isTradeModalVisible ? {
                                    width: 15,
                                    height: 15,
                                } : null}
                                label={isTradeModalVisible ? "Close" : "MC"}
                                isTrade={true}
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                            onPress={() => tradeTabButtonOnClickHandler()}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Trending"
                component={Trending}
                options={{
                    tabBarIcon: ({ focused }) => {
                        //Se seleziono MC nasconde il resto
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.market}
                                    label="Trending"
                                />
                            )
                        }
                    }
                }}
                //Fa in modo che quando MC è selezionato non posso
                //selezionare le altre tab pur essendo nascoste
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

function mapStateToProps(state) {
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTradeModalVisibility: (isVisible) => {return dispatch(setTradeModalVisibility(isVisible))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

// styles
const styles = StyleSheet.create({
touchableOpacity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
}
});