import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { theme } from "../../constants/theme"
import { ApBackButton, ApHeader } from '../../components/header'
import RoundedImage from '../../components/image/avatar'
import { ApIcon } from '../../components/icon'
import { useAuthContext } from '../../context'
import { ApButton } from '../../components'


interface IProps {
    icon: React.ReactNode, title: string
}



const ProfileScreen = ({ navigation }) => {
    const { signOut, user } = useAuthContext();



    const handleSignOut = async () => {
        try {
            await signOut();
            // navigation.navigate(theme.screens.SigninScreen);
        } catch (err) {
            console.log(err);
        }
    };



    const ProfileList = ({ icon, title }: IProps) => (
        <View className="p-8 shadow-lg shadow-slate-400 rounded-md flex justify-center items-center" style={{ width: 170, height: 170 }}>
            <View className='text-center bg-blue-200 p-4 rounded-full'>
                {icon}
            </View>

            <Text className='text-center'>{title}</Text>


        </View>
    )


    return (
        <SafeAreaView style={styles.container}>
            <ApHeader title='Profile' left={<ApBackButton />} />

            <View className='flex-1 items-center m-0 mt-10'>

                <View style={{ width: 350, paddingVertical: 15 }} className="py-5 shadow-lg shadow-slate-400">
                    <View className='items-center '>
                        <RoundedImage source={require("../../../assets/studentAvatar.jpeg")} width={80} height={80} />
                        <Text className="font-bold text-lg">Abdulazeez Sodiq</Text>
                        <Text className="text-sm">Student</Text>
                    </View>
                </View>


                <View className='flex mt-5'>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <ProfileList
                            icon={<ApIcon
                                size={32}
                                name="book"
                                type="FontAwesome"
                                color="white"
                            // onPress={}
                            />} title="Courses" />

                        <ProfileList icon={<ApIcon
                            size={32}
                            name="fact-check"
                            type="MaterialIcons"
                            color="white"
                        />} title="Attendances" />
                    </View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <ProfileList icon={<ApIcon
                            size={32}
                            name="Trophy"
                            type="AntDesign"
                            color="white"

                        // onPress={navigation.navigate("Result")}
                        />} title="Results" />

                        <ProfileList icon={<ApIcon
                            size={32}
                            name="text-document"
                            type="Entypo"
                            color="white"

                        // onPress={}
                        />} title="Home Works" />
                    </View>
                </View>

                <View>
                    <ApButton
                        onPress={handleSignOut}
                        label="SignOut"
                    />
                </View>



            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: theme.colors.buttonPrimaryColor
    }
})