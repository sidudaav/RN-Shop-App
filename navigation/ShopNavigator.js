import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer"
import { Platform } from 'react-native'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductScreen'
import EditProductScreen from '../screens/user/EditProductScreen'

import Colors from '../constants/Colors'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: {
        screen: ProductsOverviewScreen,
    },
    ProductDetail: {
        screen: ProductDetailScreen,
    },
    Cart: {
        screen: CartScreen
    }
}, {
    defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    Orders: {
        screen: OrdersScreen
    },

}, {

    defaultNavigationOptions: defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    UserProducts: {
        screen: UserProductsScreen
    },
    EditProduct: {
        screen: EditProductScreen
    }
}, {

    defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(ShopNavigator)