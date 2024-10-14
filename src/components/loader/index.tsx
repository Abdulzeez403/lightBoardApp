
import React from "react"
import { View, Text, ActivityIndicator } from "react-native"
export const ApLoader = () => {
    return (
        <View>
            <ActivityIndicator size="large" color="#1E90FF" />
            <Text className="text-center">Loading...</Text>
        </View>
    )
}