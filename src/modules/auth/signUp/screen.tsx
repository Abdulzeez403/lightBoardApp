import { View, Text, SafeAreaView, TouchableOpacity, ToastAndroid, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import ApTextInput from '../../../components/input'
import { Formik, FormikProps } from 'formik'
import ApSafeAreaProvider from '../../../components/safeAreaView'
import { ApButton } from '../../../components'
import ApSubtitle from '../../../components/topography/subtitle'
import { theme } from '../../../constants/theme'
import { useAuthContext } from '../../../context'

const SignUpScreen = ({ navigation }) => {
    const { width } = useWindowDimensions()
    const { signUp, loading } = useAuthContext()

    const handleSubmit = async (payload: any) => {
        try {
            await signUp(payload);
            ToastAndroid.show('You are welcome', ToastAndroid.SHORT);
            navigation.navigate('SignUp');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <ApSafeAreaProvider>
            {/* <View style={{ width: 50, height: 50 }}>
                <Image source={require("../../../../assets/LB.png")} />
            </View> */}
            <View>

                <View className='my-5' >

                    <Text className='text-center text-lg font-bold'>Sign Up</Text>
                    <ApSubtitle>Welcome to LightBoard</ApSubtitle>


                </View>
                <View>
                    <Formik
                        // validationSchema={FormSchema}
                        onSubmit={handleSubmit}
                        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
                    >
                        {(props: FormikProps<any>) => (
                            <>
                                <ApTextInput
                                    label="FirstName"
                                    placeholder='Teacher1'
                                    name="firstName"
                                    formikProps={props}
                                />

                                <ApTextInput
                                    label="LastName"
                                    placeholder="lastName"
                                    name="lastName"
                                    formikProps={props}
                                />
                                <ApTextInput
                                    label='Email'
                                    placeholder="Student@gmial.com"
                                    name="email"
                                    formikProps={props}
                                />
                                <ApTextInput
                                    label="Password"
                                    placeholder="Password"
                                    name="password"
                                    formikProps={props}
                                />

                                <View className='my-2'
                                    style={{ width: width, paddingHorizontal: 20 }}>
                                    <ApButton
                                        onPress={props.handleSubmit}
                                        label={loading ? 'Submit...' : "Submit"}
                                        type="primary"
                                        round="lg" />

                                </View>

                                <View>
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate(theme.screens.SigninScreen) }}>
                                        <Text className='text-center text-red-400'>
                                            Sign in to your account!</Text>
                                    </TouchableOpacity>


                                </View>

                            </>

                        )}
                    </Formik>
                </View>

            </View>
        </ApSafeAreaProvider>


    )
}

export default SignUpScreen