import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from "react-native"

import Colors from '../../constants/Colors'

import CartItem from './CartItem'

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false)
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.order.totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.order.readableDate}</Text>
            </View>
            <Button 
                color={Colors.primary} 
                title="Show Details" 
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }}
            />
            {
                showDetails
                &&
                props.order.items.map(item => (
                    <CartItem
                        key={item.productId} 
                        product={item.product} 
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        overflow: 'hidden',
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    totalAmount: {
        fontSize: 16,
    },
    date: {
        fontSize: 16,
        color: '#888'
    }
})

export default OrderItem