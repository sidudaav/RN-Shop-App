import React from "react"
import { FlatList, Text, Platform } from "react-native"
import { useSelector } from "react-redux"

import HeaderButton from '../../components/UI/HeaderButton' 
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = () => {
    const orders = useSelector(state => state.orders.orders)

    return (
        <FlatList
            data={orders}
            renderItem={itemData => <OrderItem order={itemData.item} />}
        />
    )
}

OrdersScreen.navigationOptions = navData => {
    return  {
        headerTitle: "Your Orders",
        headerLeft: () => (
            <HeaderButton
                name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu' }
                onPress={() => {navData.navigation.toggleDrawer()}}
            />
        )
    }
}

export default OrdersScreen