import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { ApBackButton, ApHeader } from '../../components/header'
import { CourseItem } from './components/courseLists'
import { useNavigation } from '@react-navigation/native'
import { useCourseContext } from '../course/context'
import { ApIcon } from '../../components/icon'
import { ApLoader } from '../../components/loader'

type Props = {}

const BookMarkscreen = (props: Props) => {
    const navigation = useNavigation()
    const categories = [
        {
            category: "All",
            id: 1
        },
        {
            category: "Programming",
            id: 2
        },
        {
            category: "Education",
            id: 3
        },
        {
            category: "Technology",
            id: 4
        },
        {
            category: "Technology",
            id: 5
        },
        {
            category: "Technology",
            id: 6
        },



    ];

    const { getCourses, courses, loading } = useCourseContext();

    useEffect(() => {
        getCourses()
    }, [])
    const RenderItem = ({ item }) => (
        <View style={{ margin: 5 }}>
            <Text style={{ padding: 10, borderRadius: 8, textAlign: 'center', color: 'black' }} className='shadow-sm border-2 border-slate-200'>
                {item.category}
            </Text>
        </View>
    );

    return (

        <View>
            <ApHeader title="Bookmark" left={<ApBackButton />} right={<ApIcon
                size={24}
                name="search"
                type="FontAwesome"
                color="gray"
            // onPress={}
            />} />

            <ScrollView>

                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <RenderItem item={item} />}
                />
                {loading ? (
                    <View>
                        <ApLoader />
                    </View>
                ) : (
                    <View style={{ margin: 4 }}>
                        <FlatList
                            nestedScrollEnabled={true}
                            scrollEnabled={false}
                            data={courses}
                            keyExtractor={(item) => item?.id}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item: course, index }) => (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("CourseDetail", { course })}>
                                    <CourseItem course={course} />
                                </TouchableOpacity>
                            )}
                        // {...panResponder.panHandlers}
                        />
                    </View>)}
            </ScrollView>




        </View>
    )
}

export default BookMarkscreen

const styles = StyleSheet.create({})