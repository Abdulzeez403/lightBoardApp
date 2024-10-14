
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { IQuiz } from './model';
interface IProp {
    loading: boolean;
    quizs: IQuiz[],
    quiz: any,
    questions: any,
    question: any,
    getQuizs: (courseId: string) => void;
    getQuiz: (quizId: any) => void;
    getQuestions: (quizId: string) => void;
    getQuestion: (questionId: any) => void;
}
const QuizContext = createContext<IProp>({
    loading: false,
    quizs: [],
    quiz: {},
    questions: [],
    question: {},
    getQuestions(quizId) { },
    getQuestion(questionId) { },
    getQuizs(courseId) { },
    getQuiz(quizId) { },

});

export const useQuizContext = () => {
    let context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const QuizProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [quizs, setQuizs] = useState<IQuiz[]>([]);
    const [quiz, setQuiz] = useState<any>({})
    const [questions, setQuestions] = useState<[]>([]);
    const [question, setQuestion] = useState<any>({})


    const port = "https://lightboardserver.onrender.com/api"




    const getQuizs = async (courseId: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${port}/quizzes/${courseId}`);
            setQuizs(response.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error('Error Getting Quiz:', error);
            throw error;
        }
    };


    const getQuiz = async (quizId: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${port}/quiz/${quizId}`);
            setQuiz(response.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error('Error Creating Course:', error);
            throw error;
        }
    };

    const getQuestions = async (quizId: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${port}/questions/${quizId}`);
            setQuestions(response.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error('Error getting Questions:', error);
            throw error;
        }
    };


    const getQuestion = async (questionId: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${port}/question/${questionId}`);
            setQuestion(response.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error('Error getting Question:', error);
            throw error;
        }
    };






    return (
        <QuizContext.Provider
            value={{ loading, quizs, quiz, getQuiz, getQuizs, getQuestion, getQuestions, questions, question }}>
            {children}
        </QuizContext.Provider>
    )
}