import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, useWindowDimensions } from 'react-native'
import React from 'react'
import ApSubtitle from '../topography/subtitle';
import { FormikProps } from 'formik';

interface IProps extends TextInputProps {
    className?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    formikProps?: FormikProps<any>;
    style?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<TextStyle>;
    type?: string;
}

const ApTextInput = (props: IProps) => {

    const { width } = useWindowDimensions()


    const { className, label, name, placeholder, value, formikProps, style, inputStyle, type } = props

    return (
        <View style={{ width: width, paddingHorizontal: 20 }}>
            <Text>{label}</Text>
            <TextInput
                className={className ? className : "rounded-lg  shadow-lg shadow-black  bg-slate-200  "}
                {...props}
                style={[styles.input, inputStyle,]}
                placeholder={placeholder}
                onChangeText={formikProps?.handleChange(name)}
                onBlur={() => formikProps?.setFieldTouched(name)}
                value={formikProps?.values[name]} />

            <>
                {formikProps?.touched[name] && formikProps?.errors[name] && (
                    <Text
                        style={{
                            fontSize: 14,
                            color: "red",
                            marginBottom: 10,
                            marginTop: 5,
                        }}
                    >
                        {(formikProps?.errors as any)[name]}
                    </Text>
                )}
            </>
        </View>

    )

}

export default ApTextInput

const styles = StyleSheet.create({
    container: { padding: 3 },
    input: {
        backgroundColor: "white",
        height: 50,
        shadowRadius: 20,
        marginVertical: 10,
        paddingHorizontal: 8


    },
});