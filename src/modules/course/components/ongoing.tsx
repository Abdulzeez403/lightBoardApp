import { View, Text, TouchableOpacity, PanResponder, FlatList, Animated, StyleSheet, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { CourseItem } from './courseItem';
import { useNavigation } from '@react-navigation/native';

interface IProps {
    refreshing: any,
    route: any

}

export const OngoingScreen = ({ route, refreshing, }: IProps) => {
    const navigation = useNavigation();
    // const courses = route.params.courses;
    // console.log(courses, "...courses...")


    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_event, gestureState) => {
                // Allow pan responder if the user is scrolling down and not already refreshing
                return gestureState.dy > 0 && !refreshing;
            },
            onPanResponderRelease: (_event, gestureState) => {
                if (gestureState.dy > 50) { // Check if the user has dragged down enough
                    // onRefresh();
                }
            },
        })
    ).current;

    return (
        <View className='bg-white w-96'>

            {/* <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                data={courses}
                keyExtractor={(item) => item?.id}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                // refreshControl={
                //     <Animated.View style={{ height: refreshing ? 50 : 0, backgroundColor: "red", }} />
                // }
                renderItem={({ item: course, index }) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate("CourseDetail", { course })}>
                        <CourseItem course={course} />
                    </TouchableOpacity>
                )}
                {...panResponder.panHandlers}
            /> */}
            {/* {courses?.map((course, index) => (
                <View key={index}>
                    <Text>{course?.title}</Text>
                    <Text>{course?.instructor}</Text>
                </View>
            ))} */}

            <Text>hhhh</Text>
        </View>

    )
};

const styles = StyleSheet.create({
    courseView: {
        flex: 1,
        // width: '90%', // 90% of the screen width
    },
});
