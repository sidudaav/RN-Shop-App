import React from "react"
import { Platform, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import Colors from "../../constants/Colors"

const CustomHeaderButton = props => {
    return (
        <Ionicons
            style={styles.button}
            size={30}
            color={
                Platform.OS === 'android' ? 'white' : Colors.primary
            }
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 20,
    }
})

export default CustomHeaderButton
