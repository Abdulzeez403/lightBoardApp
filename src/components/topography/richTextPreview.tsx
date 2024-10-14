import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import React from "react"

const RichTextPreview = ({ htmlContent }) => {
    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={styles.webview}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
        borderWidth: 1, // Example border width
        borderColor: 'red', // Example border color
        borderRadius: 8, // Example border radius
    },
});

export default RichTextPreview;
