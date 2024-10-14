import React from "react"
import { View } from "react-native"
import { ApIcon } from "../../../components/icon"
import { useNavigation } from "@react-navigation/native";


export const CourseHeader = () => {
    const navigation = useNavigation();

    return (

        <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
            <View className=" rounded-full hover:bg-blue-300 hover:text-white justify-center items-center  w-10 h-10 bg-white">
                <ApIcon type="Feather" name="chevron-left" size={22}
                    onPress={() => navigation.goBack()} />
            </View>


            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                <View className=" rounded-full hover:bg-blue-300 hover:text-white justify-center items-center  w-10 h-10 bg-white">
                    <ApIcon type="Entypo" name="share" size={22} />
                </View>
                <View className=" rounded-full hover:bg-blue-300 hover:text-white justify-center items-center  w-10 h-10 bg-white">
                    <ApIcon type="FontAwesome" name="bookmark" size={22} />
                </View>

            </View>
        </View>

    )
}