import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ApSubtitle from "../topography/subtitle";
import { FormikProps } from "formik";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have this package installed for icons

interface IProps extends TextInputProps {
  className?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  formikProps?: FormikProps<any>;
  style?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  type?: string; // 'text' or 'password'
}

const ApTextInput = (props: IProps) => {
  const { width } = useWindowDimensions();
  const {
    className,
    label,
    name,
    placeholder,
    formikProps,
    style,
    inputStyle,
    type,
  } = props;

  // State to handle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={{ width: width, paddingHorizontal: 20 }}>
      <Text>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          className={
            className
              ? className
              : "rounded-lg shadow-lg shadow-black bg-slate-200"
          }
          {...props}
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          secureTextEntry={type === "password" && !isPasswordVisible} // Show/hide password based on state
          onChangeText={formikProps?.handleChange(name)}
          onBlur={() => formikProps?.setFieldTouched(name)}
          value={formikProps?.values[name]}
        />
        {type === "password" && ( // Only show toggle button if it's a password field
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"} // Use appropriate icon based on visibility
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
      {formikProps?.touched[name] && formikProps?.errors[name] && (
        <Text style={styles.errorText}>
          {(formikProps?.errors as any)[name]}
        </Text>
      )}
    </View>
  );
};

export default ApTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    shadowRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 8,
    flex: 1, // Allows the input to take up remaining space
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
    marginTop: 2,
  },
});
