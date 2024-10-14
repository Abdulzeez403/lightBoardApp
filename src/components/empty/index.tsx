import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface IProps {
    title: string
}

const ApEmpty = ({ title = "No Data!" }: IProps) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

export default ApEmpty

const styles = StyleSheet.create({})