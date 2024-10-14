import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export const ApSearchInput = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        // Handle the search logic here
        console.log('Searching for:', searchText);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
                onSubmitEditing={handleSearch}
                className='border-white bg-white rounded-md'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        height: 40,
        // borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        width: 300,
        paddingVertical: 10
    },
});


