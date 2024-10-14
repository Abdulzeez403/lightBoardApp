import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

interface IProps {
    imgURL: string
}

const ApImage = ({ imgURL }: IProps) => {
    return (
        <Image
            source={{ uri: imgURL }}
            containerStyle={styles.item}
            PlaceholderContent={<ActivityIndicator />}
        />
    )
}

export default ApImage


const styles = StyleSheet.create({
    item: {
        aspectRatio: 1,
        width: '100%',

    },
});