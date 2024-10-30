import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import ApTextInput from "../../../components/input";
import { ApButton } from "../../../components";
import ApSubtitle from "../../../components/topography/subtitle";
import { useAuthContext } from "../../../context";
import { router } from "expo-router";
import ApFullScreenLoader from "../../../components/loader/FullScreenLoader";

const SignInScreen = ({ navigation }) => {
  const { loading, signIn } = useAuthContext();
  const { width } = useWindowDimensions();

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (payload) => {
    try {
      await signIn(payload);
      router.navigate("home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      <ApFullScreenLoader loading={loading} />

      <View className="w-full items-center">
        <View className="w-12 h-12">
          <Image
            source={require("../../../../assets/LB.png")}
            className="w-full h-full object-contain rounded-full"
          />
        </View>
        <Text className="text-center text-lg font-bold">Sign In</Text>
        <ApSubtitle>Welcome to LightBoard</ApSubtitle>
        <Formik
          validationSchema={validationSchema} // Attach the validation schema
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
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
                type="password" // Specify the type for password handling
              />

              <View className="my-2 w-full px-5">
                <ApButton
                  label={"Sign In"}
                  type="primary"
                  loading={loading}
                  round="lg"
                  onPress={props.handleSubmit}
                />
              </View>
              <View>
                <TouchableOpacity onPress={() => router.navigate("/signup")}>
                  <Text className="text-center text-red-400">
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

export default SignInScreen;
