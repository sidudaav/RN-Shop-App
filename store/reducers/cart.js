import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import { ADD_ORDER } from "../actions/orders"
import CartItem from '../../models/cart'
import { DELETE_PRODUCT } from '../actions/products'

const initalState = {
    items: {},
    totalAmount: 0
}

export default (state=initalState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title

            if(state.items[addedProduct.id]) {
                const updatedCartItem = new CartItem (
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )

                return {
                    ...state,
                    items: {...state.items, [addedProduct.id]: updatedCartItem},
                    totalAmount: state.totalAmount + prodPrice
                }
            } else {
                const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
                return {
                    ...state,
                    items: {...state.items, [addedProduct.id]: newCartItem},
                    totalAmount: state.totalAmount + prodPrice
                }
            }
        case REMOVE_FROM_CART: 
            const selectedCartItem = state.items[action.productId]

            if (selectedCartItem.quantity === 1) {
                delete state.items[action.productId]
                state.totalAmount = state.totalAmount - selectedCartItem.productPrice
                return state                 
            } else {
                const updatedCartItem = new CartItem (
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                )

                return {
                    ...state,
                    items: {...state.items, [action.productId]: updatedCartItem},
                    totalAmount: state.totalAmount - selectedCartItem.productPrice
                }    
            }
        case ADD_ORDER:
            return initalState
        case DELETE_PRODUCT:
            if (state.items[action.productId] === undefined) {
                return {
                    ...state
                }
            }

            const deletedProductPrice = state.items[action.productId].productPrice
            const deletedProductQuantity = state.items[action.productId].quantity

            delete state.items[action.productId]

            return {
                ...state,
                totalAmount: state.totalAmount - deletedProductPrice * deletedProductQuantity
            }
    }

    return state
}