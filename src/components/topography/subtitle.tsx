import React from 'react'
// import { Text } from '@rneui/themed';
import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import { theme } from "../../constants/theme"


interface IProps {
    children: string;
    styleText?: StyleProp<TextStyle>
}

const ApSubtitle = ({ children, styleText }: IProps) => {
    return (
        <View>
            <Text style={[styles.textStyle, styleText]}>{children}</Text>
        </View>
    )
}

export default ApSubtitle

const styles = StyleSheet.create({
    textStyle: {
        fontWeight: "normal",
        fontSize: 16,
        textAlign: "center",
        // fontFamily: theme.fonts.Montserrat_500Medium,
    }
})