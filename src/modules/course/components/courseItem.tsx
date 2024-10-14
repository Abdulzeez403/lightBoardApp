import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ApIcon } from '../../../components/icon'
// import * as Progress from 'react-native-progress';


interface Props {
    course: any
}

export const CourseItem = ({ course }: Props) => {
    const item = course.courseId;
    return (
        <View style={{ flexDirection: "row", gap: 20, marginVertical: 4, alignItems: "center" }} className='shadow-md shadow-slate-300  p-3 rounded-md pt-6 mx-3' >
            <View >
                <Image source={{ uri: item?.images?.[0]?.uri }}
                    resizeMode="cover"
                    style={{ width: 110, backgroundColor: "black", height: 110, borderRadius: 10 }} />
            </View>
            <View>

                <View style={{ flexDirection: "row", gap: 6 }}>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <ApIcon type="MaterialIcons" name="video-collection" size={20} color="#1E90FF" />
                            <View>
                                <Text>{course?.lessons} Lessons</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <ApIcon type="MaterialIcons" name="timer" size={20} color="red" />
                            <View>
                                <Text>{item?.time?.hour}hr {item?.time?.minute}min, {course?.time?.second}sec</Text>
                            </View>
                        </View>

                    </View>

                </View>
                <Text className='font-semibold text-lg'>
                    {item?.title}
                </Text>
                <Text>
                    <Text className='text-red-400'>Instructor:</Text> {item?.instructor}
                </Text>
                {/* <View className='my-2'>
                    <Progress.Bar progress={0.8} width={180} />
                </View> */}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({})