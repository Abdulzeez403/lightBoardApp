import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { AuthProvider } from "../src/context";
import { CourseProvider } from "../src/modules/course/context";
import { ContentProvider } from "../src/modules/courseDetail/context";
import { LessonProvider } from "../src/modules/lesson/context";
import { QuizProvider } from "../src/modules/quiz/context";
import * as Updates from "expo-updates";
import { router, SplashScreen, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-BlackItalic.ttf"),
  });

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem("token");
      router.replace(token ? "/(tabs)/profile" : "/signin");
    };

    checkTokenAndNavigate();
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    if (fontError) throw fontError;
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const onFetchUpdateAsync = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        alert(`Error fetching latest Expo update: ${error}`);
      }
    };
    onFetchUpdateAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AuthProvider>
      <CourseProvider>
        <ContentProvider>
          <LessonProvider>
            <QuizProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
