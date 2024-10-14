
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
// import { IQuiz } from './model';
interface IProp {
    loading: boolean;
    lessons: any[],
    lesson: any,
    getLessons: (contentId: string) => void;
    getLesson: (lessonId: any) => void;
}
const LessonContext = createContext<IProp>({
    loading: false,
    lessons: [],
    lesson: {},
    getLessons(contentId) { },
    getLesson(lessonId) { },

});

export const useLessonContext = () => {
    let context = useContext(LessonContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const LessonProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [lessons, setLessons] = useState<any[]>([]);
    const [lesson, setLesson] = useState<any>({})


    const port = "https://lightboardserver.onrender.com/api"




    const getLessons = async (contentId: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${port}/lessons/${contentId}`);
            setLessons(response.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error('Error getting Lessons....:', error);
            throw error;
        }
    };


    const getLesson = async (lessonId: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${port}/lesson/${lessonId}`);
            setLesson(response.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error('Error  getting Lesson:', error);
            throw error;
        }
    };



    return (
        <LessonContext.Provider
            value={{
                loading,
                lessons,
                lesson,
                getLesson,
                getLessons,

            }}>
            {children}
        </LessonContext.Provider>
    )
}