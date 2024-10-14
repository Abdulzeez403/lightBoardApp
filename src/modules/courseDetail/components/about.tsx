
import React from "react"
import { ScrollView, Text, View } from "react-native"
import RoundedImage from "../../../components/image/avatar";
import { ApIcon } from "../../../components/icon";


export const AboutScreen = ({ route }) => {
    const { course } = route.params;
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            className="bg-white ">
            <View className="bg-white">
                <Text className="font-bold" style={{ fontSize: 20 }}>About Course</Text>
                <Text className="" style={{ fontSize: 18 }}>{course?.description}</Text>

            </View>
            <View>
                <Text className="font-bold" style={{ fontSize: 20 }}>Tutor</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>

                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center", paddingVertical: 10 }}>
                        <RoundedImage source={require("../../../../assets/studentAvatar.jpeg")}
                            width={50} height={50}
                        />
                        <View>
                            <Text className="font-bold text-lg">
                                {course?.instructor}</Text>
                            <Text>Teacher</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View className=" rounded-full hover:bg-blue-300 hover:text-white justify-center items-center border-2 border-slate-200 w-14 h-14">
                            <ApIcon type="Feather" name="phone-call" size={22} />
                        </View>
                        <View className=" rounded-full hover:bg-blue-300 hover:text-white justify-center items-center border-2 border-slate-200 w-14 h-14">
                            <ApIcon type="Entypo" name="chat" size={22} />
                        </View>
                    </View>

                </View>
            </View>

            {/* <View>
                <Text className="font-bold" style={{ fontSize: 20 }}>Tutor</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>

                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center", paddingVertical: 10 }}>
                        <RoundedImage source={require("../../../../assets/studentAvatar.jpeg")}
                            width={50} height={50}
                        />
                        <View>
                            <Text className="font-bold text-lg">Abdulazeez Sodiq</Text>
                            <Text>Abdulazeez Sodiq</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View className=" rounded-full hover:bg-blue-300 hover:text-white justify-center items-center border-2 border-slate-200 w-14 h-14">
                            <ApIcon type="Feather" name="phone-call" size={22} />
                        </View>
                        <View className=" rounded-full hover:bg-blue-300 hover:text-white justify-center items-center border-2 border-slate-200 w-14 h-14">
                            <ApIcon type="Entypo" name="chat" size={22} />
                        </View>
                    </View>

                </View>
            </View> */}



        </ScrollView>
    )
};
