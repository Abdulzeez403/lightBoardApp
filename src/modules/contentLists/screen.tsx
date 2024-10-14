import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useContentContext } from '../courseDetail/context'
import { useNavigation } from '@react-navigation/native'
import { ApIcon } from '../../components/icon'
import { ApButton } from '../../components'
import { useQuizContext } from '../quiz/context'
import { ApLoader } from '../../components/loader'
import { SafeAreaView } from 'react-native-safe-area-context'


const ContentListScreen = ({ route }) => {

    const { item } = route.params;

    const navigation = useNavigation()

    const { getContents, contents, } = useContentContext();

    const { getQuizs, getQuestions, quizs } = useQuizContext()

    const FetchQuiz = async () => {
        await getQuizs(item);
        const singleQuiz = quizs?.[0];
        if (singleQuiz) {
            const quizId = singleQuiz._id;
            getQuestions(quizId);
        } else {
            console.log("No quiz found");
        }
    };

    useEffect(() => {
        getContents(item);
        FetchQuiz()
    }, [])

    const ContentItem = ({ item, index }) => {

        const number = (index + 1).toString().padStart(2, '0');
        return (
            <TouchableOpacity
                style={{ flexDirection: "column", gap: 10, marginVertical: 4 }}
                onPress={() => navigation.navigate("ContentScreen", { item: item })}
            >
                <View style={{ flexDirection: "row", justifyContent: "space-between", borderRadius: 30, paddingVertical: 5, backgroundColor: "white", borderWidth: 1, borderColor: "grey" }} className="shadow-lg shadow-white px-2">
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center", backgroundColor: "white" }}  >
                        <View className=" rounded-full bg-blue-200 hover:text-white justify-center items-center  w-10 h-10">
                            <Text className="text-blue-500 font-bold text-lg">{number}</Text>
                        </View>
                        <Text className="font-bold" style={{ fontSize: 18 }}>{item?.title}</Text>
                    </View>
                    <View className=" rounded-full hover:bg-blue-300 hover:text-white justify-center items-center  w-10 h-10 bg-white">
                        <ApIcon type="AntDesign" name="play" size={32} color="blue" />



                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    return (

        <SafeAreaView>
            <View className='px-3 py-2'>
                {contents.length === 0 ? (<ApLoader />) : (
                    <ScrollView>
                        <FlatList
                            nestedScrollEnabled={true}
                            scrollEnabled={false}
                            data={contents}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            keyExtractor={item => item._id}
                            renderItem={({ item, index }) => <ContentItem item={item} index={index} />}
                            ListFooterComponent={
                                <View>
                                    <ApButton
                                        label='Take Quiz'
                                        onPress={() => {
                                            FetchQuiz();
                                            navigation.navigate("QuizScreen", { course: item })
                                        }
                                        }
                                    />
                                </View>

                            }
                        />
                    </ScrollView>
                )}


            </View>
        </SafeAreaView>

    )
}

export default ContentListScreen

const styles = StyleSheet.create({})