import React from "react"
import { FlatList, Platform, Button } from "react-native"
import { useSelector, useDispatch } from "react-redux"

import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'

import * as productsActions from '../../store/actions/products'

import Colors from '../../constants/Colors'

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    return (
        <FlatList 
            data={userProducts}
            renderItem={itemData => (
                <ProductItem 
                    item={itemData.item} 
                >
                    <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={() => {
                            props.navigation.navigate({
                                routeName: 'EditProduct',
                                params: {
                                    productId: itemData.item.id
                                }
                            })
                        }}
                    />
                    <Button 
                        color={Colors.primary} 
                        title="Delete"
                        onPress={() => {dispatch(productsActions.deleteProduct(itemData.item.id))}}
                    />
                </ProductItem>
            )}
        />
    )
}

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButton
                name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {navData.navigation.toggleDrawer()}}
            />
        ),
        headerRight: () => (
            <HeaderButton
                name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct')
                }}
            />
        )
    }
}

export default UserProductScreen