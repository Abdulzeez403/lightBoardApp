import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { theme } from "../../constants/theme"


interface IProps {
    children: string,
}

export const ApText = ({ children }: IProps) => {
    return (
        <View >
            <Text style={styles.TextStyle}>{children}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    TextStyle: {
        //    theme.fonts.H1,

    }
})




