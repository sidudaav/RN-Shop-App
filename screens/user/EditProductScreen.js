import React, { useState, useEffect, useCallback } from "react"
import { Text, View, StyleSheet, ScrollView, TextInput, Platform, Alert } from "react-native"
import HeaderButton from '../../components/UI/HeaderButton'

import { useSelector, useDispatch } from "react-redux"
import * as productsActions from '../../store/actions/products'

import Colors from '../../constants/Colors'

const EditProductScreen = props => {
    const productId = props.navigation.getParam('productId')
    const product = useSelector(state => state.products.userProducts.find(prod => prod.id === productId))

    const [title, setTitle] = useState(product ? product.title : '')
    const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(product ? product.description : '')

    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        if (product) {
            dispatch(productsActions.updateProduct({
                productId: productId,
                ownerId: product.ownerId,
                title: title,
                imageUrl: imageUrl,
                description: description,
                price: product.price
            }))

            Alert.alert(
                "Product Updated",
                "Your product has been updated successfully!",
                [
                    { 
                        text: "OK",
                        style: 'default', 
                        onPress: () => props.navigation.navigate('UserProducts')
                    }
                ]
            )
        } else {
            dispatch(productsActions.createProduct({
                title: title,
                imageUrl: imageUrl,
                description: description,
                price: +price,
            }))

            Alert.alert(
                "Product Added",
                "Your product has been added successfully!",
                [
                    { 
                        text: "OK",
                        style: 'default', 
                        onPress: () => props.navigation.navigate('UserProducts')
                    }
                ]
            )
        }
    }, [title, imageUrl, price, description])

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
    }, [submitHandler])
    
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={val => setTitle(val)}
                        value={title}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>ImageUrl</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={val => setImageUrl(val)}
                        value={imageUrl} 
                    />                
                </View>
                {product ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={val => setPrice(val)}
                        value={price}
                        keyboardType="decimal-pad" 
                    />                
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={val => setDescription(val)}
                        value={description} 
                    />                
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButton
                name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                size={40}
                onPress={submitFn} 
            />
        )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20, 
    },
    formControl: {
        marginVertical: 10,
    },
    label: {
        color: Colors.primary,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        padding: 2,
    },
})

export default EditProductScreen