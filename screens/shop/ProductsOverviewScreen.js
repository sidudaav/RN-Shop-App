import React from "react"
import { Text, FlatList, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"

import ProductItem from '../../components/ProductItem'

import * as cartActions from '../../store/actions/cart'

const ProductOverviewScreen = props  => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    return (
    <FlatList 
        data={products}
        renderItem={itemData => (
            <ProductItem 
                item={itemData.item}
                onView={() => {
                    props.navigation.navigate({
                        routeName: 'ProductDetail',
                        params: {
                            productId: itemData.item.id
                        }
                    })
                }}
                onAdd={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }}
            />
        )} 
    />
    )
}

ProductOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

const styles = StyleSheet.create({
    title: {
        color: 'black'
    }
})

export default ProductOverviewScreen