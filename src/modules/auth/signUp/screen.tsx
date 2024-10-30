import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  useWindowDimensions,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import React from "react";
import ApTextInput from "../../../components/input";
import { Formik, FormikProps } from "formik";
import ApSafeAreaProvider from "../../../components/safeAreaView";
import { ApButton } from "../../../components";
import ApSubtitle from "../../../components/topography/subtitle";
import { useAuthContext } from "../../../context";
import { router } from "expo-router";
import * as Yup from "yup";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ApFullScreenLoader from "../../../components/loader/FullScreenLoader";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string().required("Password is required"),
});

const SignUpScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { signUp, loading } = useAuthContext();

  const handleSubmit = async (payload: any) => {
    try {
      await signUp(payload);
      ToastAndroid.show("You are welcome", ToastAndroid.SHORT);
      navigation.navigate("SignUp");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ApSafeAreaProvider>
      <ApFullScreenLoader loading={loading} />
      <View>
        <View className="my-5">
          <View className="w-screen flex items-center justify-center">
            <View style={{ width: 50, height: 50 }}>
              <Image
                source={require("../../../../assets/LB.png")}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "contain",
                  borderRadius: 25,
                }}
              />
            </View>
          </View>
          <Text className="text-center text-lg font-bold">Sign Up</Text>
          <ApSubtitle>Welcome to LightBoard</ApSubtitle>
        </View>

        <View>
          <Formik
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
          >
            {(props: FormikProps<any>) => (
              <>
                <ApTextInput
                  label="FirstName"
                  placeholder="Teacher1"
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
                  label="Email"
                  placeholder="Student@gmial.com"
                  name="email"
                  formikProps={props}
                />
                <ApTextInput
                  label="Password"
                  placeholder="Password"
                  name="password"
                  formikProps={props}
                  type="password"
                />

                <View
                  className="my-2"
                  style={{ width: width, paddingHorizontal: 20 }}
                >
                  <ApButton
                    onPress={props.handleSubmit}
                    label={"Sign Up"}
                    type="primary"
                    loading={loading}
                    round="lg"
                  />
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => {
                      router.navigate("/signin");
                    }}
                  >
                    <Text className="text-center text-red-400">
                      Sign in to your account!
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ApSafeAreaProvider>
  );
};

export default SignUpScreen;
