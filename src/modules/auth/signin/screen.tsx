import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, useWindowDimensions, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApTextInput from '../../../components/input';
import { Formik, FormikProps } from 'formik';
import { ApButton } from '../../../components';
import ApSubtitle from '../../../components/topography/subtitle';
import { useAuthContext } from '../../../context';
import { theme } from '../../../constants/theme';


const SignInScreen = ({ navigation }) => {
    const { loading, signIn, user } = useAuthContext();
    const { width } = useWindowDimensions()


    const handleSubmit = async (payload: any) => {
        try {
            await signIn(payload);
            // navigation.navigate(theme.screens.HomeScreen)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                {/* <View style={{ width: 50, height: 50 }}>
                    <Image source={require("../../../../assets/LB.png")} />
                </View> */}
                <Text className='text-center text-lg font-bold'>Sign In</Text>
                <ApSubtitle>Welcome to LightBoard</ApSubtitle>
                <Formik
                    style={styles.formContainer}
                    onSubmit={handleSubmit}
                    initialValues={{ email: '', password: '' }}
                >
                    {(props: FormikProps<any>) => (
                        <>
                            <ApTextInput
                                label="Email"
                                placeholder="Email"
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
                                    label={loading ? 'Loading...' : 'Sign In'}
                                    type="primary"
                                    round="lg"
                                    onPress={props.handleSubmit}
                                />
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate(theme.screens.SignUpScreen)}>
                                    <Text style={styles.textLink}>
                                        Don't have an account yet?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </View>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // paddingHorizontal: 16,
    },
    contentContainer: {
        width: '100%',
    },
    formContainer: {
        width: '100%',
    },
    buttonContainer: {
        marginTop: 10,
    },
    textLink: {
        textAlign: 'center',
        color: 'red',
    },
});

export default SignInScreen;
