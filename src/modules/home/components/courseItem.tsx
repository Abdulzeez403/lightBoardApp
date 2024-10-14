import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ApIcon } from '../../../components/icon'

interface Props {
    course: any
}

export const HomeCourseItem = ({ course }: Props) => {

    return (
        <View style={styles.courseContainer} className='shadow-md shadow-slate-300'>
            <View className='pr-4 pl-4 pt-4 relative'>
                <Image source={{ uri: course?.images?.[0]?.uri }} style={{
                    width: 230, height: 130, borderRadius: 10,
                }} />
            </View>
            <View style={{ flexDirection: "row", gap: 6 }} className='absolute  p-1 bg-white rounded-md top-6 left-6 '>
                <ApIcon type="MaterialIcons" name="star" size={20} color="gold" />
                <Text className='font-semibold'>4.6</Text>
            </View>

            <View>

                <View className='px-5 pb-3'>
                    <Text className='font-semibold text-lg'>
                        {course?.title.slice(0, 25)}...
                    </Text>
                    <View style={{ flexDirection: "row", gap: 6 }}>
                        <ApIcon type="MaterialIcons" name="person" size={20} />
                        <Text className='font-semibold'>
                            {course?.instructor}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 4 }} className='py-1'>
                        <Text className='bg-green-300 text-green-600 rounded-lg px-2'>Free</Text>
                        <Text className='bg-yellow-300 text-yellow-600 rounded-lg px-2'>Best Selling</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    courseContainer: {
        width: 260,
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,



    }
})