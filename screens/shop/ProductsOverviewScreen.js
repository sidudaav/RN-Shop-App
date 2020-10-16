import React from "react"
import { FlatList, Platform, Button } from "react-native"
import { useSelector, useDispatch } from "react-redux"

import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton' 

import Colors from '../../constants/Colors'

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
                >
                    <Button 
                        color={Colors.primary} 
                        title="View Details" 
                        onPress={() => {
                            props.navigation.navigate({
                                routeName: 'ProductDetail',
                                params: {
                                    productId: itemData.item.id
                                }
                            })
                        }}
                    />
                    <Button 
                        color={Colors.primary} 
                        title="To Cart"
                        onPress={() => {dispatch(cartActions.addToCart(itemData.item))}} 
                    />
                </ProductItem>
            )} 
        />
    )
}

ProductOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => (
            <HeaderButton
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart' }
                onPress={() => {navData.navigation.navigate('Cart')}}
            />
        ),
        headerLeft: () => (
            <HeaderButton
                name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu' }
                onPress={() => {navData.navigation.toggleDrawer()}}
            />
        )
    }
}

export default ProductOverviewScreen