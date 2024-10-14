import { Button, Dimensions, SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Progress from 'react-native-progress';
import { ApIcon } from '../../components/icon';
import { ModalComponent } from '../../components/modal';
import { useNavigation } from '@react-navigation/native';
import { ApButton } from '../../components';

import { theme } from "../../constants/theme"
import { useQuizContext } from './context';
import RenderItem from '../Onboard/components/RenderItem';
import { ApLoader } from '../../components/loader';


const QuizScreen = ({ route }) => {
    const { questions, loading } = useQuizContext()

    // const FetchQuiz = async () => {
    //     await getQuizs(course?._id);
    //     const singleQuiz = quizs?.[0];
    //     if (singleQuiz) {
    //         const quizId = singleQuiz._id;
    //         getQuestions(quizId);
    //         console.log(quizs, "quiz");
    //         console.log(quizId, "...quizId");
    //         console.log(course?._id, "...courseId");
    //     } else {
    //         console.log("No quiz found");
    //     }
    // };

    // useEffect(() => {
    //     FetchQuiz();
    // }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const { width, height } = Dimensions.get('window');
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(false))
    const [score, setScore] = useState(null);
    const [countdown, setCountdown] = useState(10);
    const [countdownInterval, setCountdownInterval] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(questions.length);
    const [solvedQuestions, setSolvedQuestions] = useState(0);
    const flatListRef = useRef(null);
    const navigation = useNavigation();



    // useEffect(() => {
    //     if (countdown > 0) {
    //         // If countdown is still active, continue decreasing it every second
    //         const interval = setInterval(() => {
    //             setCountdown((prevCountdown) => Math.max(prevCountdown - 1, 0));
    //         }, 4000);

    //         return () => clearInterval(interval); // Cleanup the interval when the component unmounts
    //     } else {
    //         // If countdown reaches 0, perform any actions needed (e.g., show modal)
    //         calculateScore()
    //         showModal();
    //     }
    // }, [countdown]);


    const resetQuestions = () => {
        setSelectedOptions(Array(questions.length).fill(null));
        setScore(null);
        setCountdown(10);
        setCountdownInterval(null);
        flatListRef.current.scrollToIndex({ index: 0 });
        setSolvedQuestions(0);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            const nextIndex = currentIndex + 1;

            flatListRef.current?.scrollToIndex({
                animated: true,
                index: nextIndex,
                viewPosition: 1.0,
                viewOffset: 0.6,
            });
            setCurrentIndex(nextIndex);
            setSolvedQuestions((prevSolved) => prevSolved + 1);

        }
    };

    const handleOptionPress = (questionIndex, optionIndex) => {
        setSelectedOptions(prevSelected => {
            const newSelectedOptions = [...prevSelected];
            newSelectedOptions[questionIndex] = optionIndex;
            setCountdown(prevCountdown => Math.max(prevCountdown - 1, 0));
            return newSelectedOptions;
        });
    };

    const CalculateScore = () => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        const newScore = questions.reduce((acc, question, index) => {
            const selectedOptionIndex = selectedOptions[index];
            const correctOptionIndex = question?.options.findIndex(option => option === question.answer);
            const isCorrect = selectedOptionIndex === correctOptionIndex;
            return acc + (isCorrect ? 1 : 0);
        }, 0);

        setScore(newScore);
    };


    const RenderItem = ({ item, index }) => (
        <View style={[styles.flashcard, { width: width }]}>


            <View style={{ flexDirection: "row", gap: 15, alignItems: "center", marginBottom: 24, justifyContent: "center" }}>
                <ApIcon
                    type="AntDesign"
                    name="close" size={15} color="black"
                    onPress={resetQuestions} />
                <View>
                    {/* <Progress.Bar progress={solvedQuestions / totalQuestions} width={270} /> */}
                </View>

                {/* <Text className='text-bold'>{totalQuestions}/{solvedQuestions}</Text> */}

            </View>


            <View className='shadow-lg shadow-slate-500 py-20 bg-white rounded-lg relative'>
                <Text style={styles.question} className='text-center '>
                    {item?.question}</Text>
                <View className="absolute -top-5 left-[40%] bg-white p-3 rounded-full shadow-md">
                    <View>
                        <Progress.Circle
                            size={50}
                            progress={countdown / 10} // Normalize the countdown value to be between 0 and 1
                            showsText={true}
                            strokeCap="round"
                        />
                    </View>

                </View>

            </View>

            {item.options.map((option, optionIndex) => (
                <TouchableOpacity
                    key={optionIndex}
                    style={[styles.option, { borderColor: selectedOptions[index] === optionIndex ? '#1E90FF' : 'grey', alignItems: "center" }]}
                    className='border-2 py-3 my-2 rounded-lg px-3'
                    onPress={() => {
                        handleOptionPress(index, optionIndex);
                        console.log(selectedOptions)
                    }}
                >
                    {selectedOptions[index] === optionIndex ? (
                        <ApIcon type="AntDesign" name="checkcircle" size={22} color={"#1E90FF"} />
                    ) : (
                        <ApIcon type="Feather" name="circle" size={22} />
                    )}
                    <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }} >
                        <Text className='font-semibold'>{option}</Text>
                    </View>

                </TouchableOpacity>
            ))}
        </View>
    );


    const [modal, setModal] = useState(false);

    const showModal = () => {
        setModal(true);
    };

    const hideModal = () => {
        setModal(false);
    };

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (<ApLoader />) : (<View>
                <FlatList
                    ref={flatListRef}
                    data={questions}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                    showsHorizontalScrollIndicator={false}
                    initialScrollIndex={0}
                    getItemLayout={(data, index) => ({
                        length: 300,
                        offset: 460 * index,
                        index,
                    })}
                />




                {currentIndex === questions.length - 1 ? (
                    <View style={{ paddingHorizontal: 13 }}>
                        <ApButton label="Submit"
                            onPress={() => {
                                CalculateScore();
                                showModal();

                            }} />

                    </View>
                ) : (
                    <View style={{ paddingHorizontal: 13 }}>
                        <ApButton label="Next"
                            onPress={() => {
                                handleNext();
                            }}
                            disabled={currentIndex === questions.length - 1}
                        />
                    </View>


                )}
                <ModalComponent
                    modalVisible={modal}
                    hideModal={hideModal}>
                    <View className='flex justify-center' style={{ height: height / 1 }}>
                        <View >
                            <View className='flex justify-center m-0 items-center '>
                                <ApIcon
                                    type="Feather"
                                    name="check-circle" size={75} color="#1E90FF" />
                            </View>

                            <Text className='text-center font-bold text-lg'>Congraducation! You score  is {score}</Text>
                            <ApButton label='Back to Course'
                                onPress={handlePress}
                            />
                        </View>
                    </View>

                </ModalComponent>
            </View>)}


        </SafeAreaView>
    )
}

export default QuizScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 40,
        paddingBottom: 5
    },
    flashcard: {
        paddingHorizontal: 20,
        // backgroundColor: '#e0e0e0',
        // borderRadius: 10,
        // marginHorizontal: 10,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    option: {
        fontSize: 16,
        marginBottom: 5,
        flexDirection: "row",
        // justifyContent: "space-between"
        gap: 10
    },
})