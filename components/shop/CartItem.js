import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CartItem = props => {
    const product = props.product
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{product.quantity}</Text>
                <Text style={styles.title}>{product.productTitle}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.amount}>${product.productPrice}</Text>
                {
                    props.deletable 
                    &&
                    <TouchableOpacity
                        onPress={props.onRemove}
                        style={styles.deleteButton}
                    >
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                            size={23}
                            color="red" 
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontSize: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '800',
    },
    amount: {
        fontSize: 16,
    }
})

export default CartItem