import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { OnboardingData } from './data';
import LottieView from 'lottie-react-native';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';


interface AnimatedCircleProps {
    index: number;
    scrollOffset: SharedValue<number>;
    item: OnboardingData;

};


const RenderItem: React.FC<AnimatedCircleProps> = ({ item, index, scrollOffset }) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    const circleAnimation = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollOffset.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
            ],
            [1, 4, 4],
            Extrapolation.CLAMP,
        );

        return {
            transform: [{ scale: scale }],
        };
    });


    return (
        <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
            <View style={styles.items}>

                <View style={styles.itemCircle}>
                    <Animated.View
                        style={[
                            {
                                width: SCREEN_WIDTH,
                                height: SCREEN_WIDTH,
                                borderRadius: SCREEN_WIDTH / 2,
                                backgroundColor: item.backgroundColor,
                            },
                            circleAnimation,
                        ]}
                    />

                </View>
                <Animated.View>
                    <LottieView
                        source={item.animation}
                        style={{
                            width: SCREEN_WIDTH * 0.9,
                            height: SCREEN_WIDTH * 0.9,
                        }}
                        autoPlay
                        loop
                    />
                </Animated.View>

                <Text style={styles.itemText}>{item.text}</Text>
            </View>

        </View>
    )
}

export default RenderItem

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 120
    },
    itemText: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        marginVertical: 20,
        marginHorizontal: 20,

    },
    itemCircle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    items: {
        flex: 1,
        justifyContent: 'center',
    }
})