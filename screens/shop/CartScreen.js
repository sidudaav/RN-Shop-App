import React from "react"
import { View, Text, StyleSheet, FlatList, Button } from "react-native"

import { useSelector, useDispatch } from "react-redux"
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'

import Colors from '../../constants/Colors'

import CartItem from '../../components/shop/CartItem'

const CartScreen = () => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const dispatch = useDispatch()

    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                product: state.cart.items[key]
            })
        }

        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1:-1 )
    })

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button 
                    color={Colors.accent} 
                    title="Order Now" 
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        return dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
                    }}
                />
            </View>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={prod => prod.productId}
                    renderItem={itemData => (
                        <CartItem 
                            product={itemData.item.product}
                            onRemove={() => {dispatch(cartActions.removeFromCart(itemData.item.productId))}}
                            deletable 
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    summaryText: {
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
})

export default CartScreen