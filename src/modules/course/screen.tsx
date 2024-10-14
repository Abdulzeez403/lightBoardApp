import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, useWindowDimensions, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useCourseContext } from './context';
import { ApBackButton, ApHeader } from '../../components/header';
import { ApLoader } from '../../components/loader';
import MyCourseNavigatorTab from './MyCourseNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CourseItem } from './components/courseItem';
import { useNavigation } from '@react-navigation/native';

const CourseScreen = () => {
    const { fetchEnrolledCourses, enrolledCourses, loading } = useCourseContext();

    const navigation = useNavigation()

    useEffect(() => {
        fetchEnrolledCoursess()

    }, []);

    const fetchEnrolledCoursess = async () => {
        const userData = await AsyncStorage.getItem('user');
        if (!userData) {
            throw new Error('User data not found'); // Handle missing user data
        }
        const parsedUserData = JSON.parse(userData);
        fetchEnrolledCourses(parsedUserData?._id)
    }

    return (
        <View >
            <ApHeader title="My Course" left={<ApBackButton />} />

            {loading ? (
                <View>
                    <ApLoader />
                </View>
            ) : (
                <View>
                    {<FlatList
                        data={enrolledCourses}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate("ContentLists", { item: item?.courseId?._id })}>
                                <CourseItem course={item} />
                            </TouchableOpacity>
                        )}
                    />}
                </View>
            )

            }



        </View>
    );
};

export default CourseScreen;

const styles = StyleSheet.create({
    container: {

        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginVertical: 20,
        // backgroundColor: "white"


    },
    courseView: {
        flex: 1,
        // width: '90%', // 90% of the screen width
    },
});
