import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../constants/theme"

interface IProps {
    label: string;
    disabled?: boolean;
    round?: "" | "sm" | "md" | "lg";
    type?: "primary" | "secondary" | "link" | "black"; //| "light"
    onPress?: () => void;
}

export const ApButton: React.FC<IProps> = ({
    label,
    onPress,
    disabled,
    round = "",
    type = "primary",
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[styles.button, styles[`round_${round}`], style[type].button,]}
        >
            <Text style={{ ...style[type].text }}>{label}</Text>
        </TouchableOpacity>
    );
};

const style = {
    primary: StyleSheet.create({
        button: {
            backgroundColor: "#1E90FF",
            borderRadius: 8,
            // marginHorizontal: 20

        },
        text: {
            color: "white",
            fontFamily: "Montserrat-Bold"
        },
    }),
    secondary: StyleSheet.create({
        button: {
            backgroundColor: "rgb(1, 147, 179)",
            width: 320,
        },
        text: {
            color: "white",
        },
    }),
    link: StyleSheet.create({
        button: {
            backgroundColor: "white",
            marginTop: 0,
        },
        text: {
            color: "blue",
        },
    }),

    black: StyleSheet.create({
        button: {
            backgroundColor: "white",
            marginTop: 0,
            borderWidth: 1,
            borderColor: "grey",
            padding: 4,
            height: 35,
            marginLeft: 6,
        },
        text: {
            color: "grey",
        },
    }),
};

const styles = StyleSheet.create({
    container: { padding: 5 },
    text: {
        textAlign: "center",
        color: "white",
    },
    button: {
        padding: 10,
        height: 50,
        marginTop: 20,
        display: "flex",
        alignItems: "center",
    },
    round_: {},
    round_sm: {
        borderRadius: 2,
    },
    round_md: {
        borderRadius: 4,
    },
    round_lg: {
        borderRadius: 6,
    },
});
