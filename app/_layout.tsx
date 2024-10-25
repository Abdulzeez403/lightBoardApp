import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { AuthProvider, useAuthContext } from "../src/context";
import { CourseProvider } from "../src/modules/course/context";
import { ContentProvider } from "../src/modules/courseDetail/context";
import { LessonProvider } from "../src/modules/lesson/context";
import { QuizProvider } from "../src/modules/quiz/context";
import * as Updates from "expo-updates";

import { router, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const { userToken } = useAuthContext();
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-BlackItalic.ttf"),
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
  // useEffect(() => {
  //     onFetchUpdateAsync()

  // }, [])

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem("jwt");
      if (!token) {
        router.replace("/signin");
      } else {
        router.replace("/(tabs)");
      }
    };

    checkTokenAndNavigate(); // Execute the async function
  });

  return (
    <AuthProvider>
      <CourseProvider>
        <ContentProvider>
          <LessonProvider>
            <QuizProvider>
              <Stack
                initialRouteName={userToken ? "TabNavigator" : "OnBoarding"}
                screenOptions={{ header: () => null }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="OnBoarding"
                  options={{ headerShown: false }}
                />

                <Stack.Screen name="signin" options={{ headerShown: false }} />

                <Stack.Screen name="signup" options={{ headerShown: false }} />
              </Stack>
            </QuizProvider>
          </LessonProvider>
        </ContentProvider>
      </CourseProvider>
    </AuthProvider>
  );
}
