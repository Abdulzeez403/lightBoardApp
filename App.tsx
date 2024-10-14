import { StyleSheet, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font'
import React, { useCallback, useEffect, useState } from 'react';
import { AuthProvider, useAuthContext } from './src/context';
import { CourseProvider } from './src/modules/course/context';
import { ContentProvider } from './src/modules/courseDetail/context';
import { LessonProvider } from './src/modules/lesson/context';
import { QuizProvider } from './src/modules/quiz/context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ScreensStack from './src/navigation/stack';
import * as Updates from 'expo-updates';



const Stack = createNativeStackNavigator();

export default function App() {
    const { userToken } = useAuthContext()
    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-Bold': require('./assets/fonts/Montserrat-BlackItalic.ttf'),
    });

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //         await SplashScreen.hideAsync() as any;
    //     }
    // }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    async function onFetchUpdateAsync() {
        try {
            const update = await Updates.checkForUpdateAsync();

            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }
        } catch (error) {
            // You can also add an alert() to see the error message in case of an error when fetching updates.
            alert(`Error fetching latest Expo update: ${error}`);
        }
    }
    useEffect(() => {
        onFetchUpdateAsync()

    }, [])

    return (
        <NavigationContainer>
            <AuthProvider>
                <CourseProvider>
                    <ContentProvider>
                        <LessonProvider>
                            <QuizProvider>
                                <ScreensStack />
                            </QuizProvider>
                        </LessonProvider>
                    </ContentProvider>
                </CourseProvider>
            </AuthProvider>
        </NavigationContainer>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});




