import PRODUCTS from '../../data/dummy-data'

import Product from '../../models/product'

import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../actions/products'

const initalState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state=initalState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(prod => prod.id !== action.productId),
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.productId)
            }
        case CREATE_PRODUCT:
            const createdProductData = action.productData

            const createdProduct = new Product (
                new Date().toString(),
                'u1',
                createdProductData.title,
                createdProductData.imageUrl,
                createdProductData.description,
                createdProductData.price,
            )

            return {
                ...state,
                userProducts: [...state.userProducts, createdProduct],
                availableProducts: [...state.availableProducts, createdProduct],
            }
        case UPDATE_PRODUCT:
            const productData = action.productData
            const productId = productData.productId

            const newProduct = new Product(
                productId,
                productData.ownerId,
                productData.title,
                productData.imageUrl,
                productData.description,
                productData.price,
            )

            return {
                ...state,
                userProducts: state.userProducts.map(prod => {
                    if (prod.id === productId) {
                        return newProduct
                    } else {
                        return prod
                    }
                }),
                availableProducts: state.availableProducts.map(prod => {
                    if (prod.id === productId) {
                        return newProduct
                    } else {
                        return prod
                    }
                })
            }
    }
    return state
}