import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react"
import { screens } from '../modules/index';
import QuizScreen from '../modules/quiz/screen';
import ContentScreen from '../modules/lesson/screen';
import TabNavigator from '../navigation/mainTab'
import ContentListsScreen from "../modules/contentLists/screen"
import HomeScreen from "../modules/home/screen"
import { theme } from '../constants/theme';
import { useAuthContext } from '../context';


export type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    OnBoarding: undefined;
    SignUp: undefined;
    Profile: undefined;
    Course: undefined;
    TabNavigator: undefined;
    CourseDetail: undefined;
    AuthStack: undefined;
    MainStack: undefined;
    CourseStack: undefined;
    ContentScreen: undefined;
    QuizScreen: undefined;
    ContentLists: undefined;
}

const Stack = createNativeStackNavigator();

const ScreensStack = () => {
    const { userToken } = useAuthContext()

    return (
        <Stack.Navigator initialRouteName={userToken ? "TabNavigator" : "OnBoarding"}
            screenOptions={{ header: () => null }}>

            {userToken ? (

                <Stack.Group>
                    <Stack.Screen name={"Home"} component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen
                        name={"TabNavigator"} component={TabNavigator} options={{ headerShown: false }} />

                    <Stack.Screen name="Profile" component={screens.ProfileScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Course" component={screens.CourseScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CourseDetail" component={screens.CourseDetailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="QuizScreen" component={QuizScreen} />
                    <Stack.Screen name="ContentScreen" component={ContentScreen} />
                    <Stack.Screen name="ContentLists" component={ContentListsScreen} />

                    <Stack.Screen name="BookMark" component={screens.BookMarkScreen} />

                    <Stack.Screen name="Result" component={screens.ResultScreen} />
                </Stack.Group>

            ) : (
                <Stack.Group>
                    <Stack.Screen name="OnBoarding" component={screens.OnBoardingScreen} options={{ headerShown: false }} />

                    <Stack.Screen name="SignIn" component={screens.SignInScreen} options={{ headerShown: false }} />

                    <Stack.Screen name="SignUp" component={screens.SignUpScreen} options={{ headerShown: false }} />


                </Stack.Group>
            )}
        </Stack.Navigator>
    )

};

export default ScreensStack;