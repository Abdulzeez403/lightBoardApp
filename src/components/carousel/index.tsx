import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';



const { width: screenWidth } = Dimensions.get('window');

interface CarouselItem {
    title: string;
    illustration: string;
}

const MyCarousel: React.FC = () => {
    const entries: CarouselItem[] = [
        {
            title: 'Item 1',
            illustration: 'https://placekitten.com/200/300',
        },
        {
            title: 'Item 2',
            illustration: 'https://placekitten.com/201/301',
        },
        {
            title: 'Item 3',
            illustration: 'https://placekitten.com/202/302',
        },
    ];

    const renderItem = ({ item }: { item: CarouselItem }) => {
        return (
            <View style={styles.slide}>
                <ParallaxImage
                    source={{ uri: item.illustration }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                />
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Carousel
                data={entries}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth - 60}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    slide: {
        width: screenWidth - 60,
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageContainer: {
        flex: 1,
        // marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    title: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        color: 'white',
    },
});

export default MyCarousel;
