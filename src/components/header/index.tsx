import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { ApIcon } from "../icon";

interface IProps {
    title: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
    subheader?: React.ReactNode;
}

export const ApBackButton = () => {
    const navigation = useNavigation();

    return (
        <View className="">

            <ApIcon
                size={32}
                name="chevron-left"
                type="Feather"
                onPress={() => navigation.goBack()}
            />
        </View>

    );
};

export const ApHeader: React.FC<IProps> = memo(
    ({ title, left, right, subheader }) => {
        return (
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        {left}

                        <View><Text style={{ fontSize: 20, fontWeight: "600" }}>{title}</Text></View>

                        {right}
                    </View>
                    {subheader}
                </View>
            </SafeAreaView>
        );
    }
);

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    headerContainer: {
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 10,
        marginTop: 13
    },
    title: {
        textAlign: "center",
    },
});
