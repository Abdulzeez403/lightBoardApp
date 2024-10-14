
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
interface IProp {
    loading: boolean;
    courses: any[],
    course: any,
    enrollStudent: any,
    enrolledCourses: any[],
    getCourses: () => void;
    getCourse: (courseId: any) => void;
    getEnrolledStudent: (studentId: any, courseId: any) => Promise<void>;
    createEnrolledStudent: (payload: any,) => void;
    fetchEnrolledCourses: (studentId: any,) => void;

}
const CourseContext = createContext<IProp>({
    loading: false,
    courses: [],
    course: {},
    enrollStudent: {},
    enrolledCourses: [],
    getCourses() { },
    getCourse(courseId) { },
    getEnrolledStudent(studentId, courseId) {
        return courseId
    },
    createEnrolledStudent(payload) { },
    fetchEnrolledCourses(studentId) { }

});

export const useCourseContext = () => {
    let context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
}

export const CourseProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState<[]>([]);
    const [course, setCourse] = useState<any>({})
    const [enrollStudent, setEnrollStudent] = useState<any>()
    const [enrolledCourses, setEnrolledCourses] = useState<[]>()


    const port = "https://lightboardserver.onrender.com/api"

    const getCourses = async () => {
        setLoading(true);
        try {
            // Check if cached data exists
            const cachedData = await AsyncStorage.getItem('cachedCourses');
            if (cachedData) {
                // Use cached data
                setCourses(JSON.parse(cachedData));
                setLoading(false);
            }
            // Make network request to get the latest data
            const response = await axios.get(`${port}/courses`);
            const coursesData = response.data;

            // Update the cache with the latest data
            await AsyncStorage.setItem('cachedCourses', JSON.stringify(coursesData));

            // Set the courses state with the latest data
            setCourses(coursesData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error getting Course:', error);
            throw error;
        }
    };



    const getCourse = async (courseId: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${port}/course/${courseId}`);
            setCourse(response.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error('Error Creating Course:', error);
            throw error;
        }
    };

    // const getEnrolledStudent = async (studentId: any, courseId: any) => {
    //     try {
    //         const response = await axios.get(`${port}/checkEnrolledStudent/${studentId}/${courseId}`);
    //         setEnrollStudent(response.data);
    //         console.log(response.data)
    //         return enrollStudent
    //     } catch (error) {
    //         console.error('Error checking enrollement status!:', error);
    //         throw error;
    //     }

    // }

    const getEnrolledStudent = async (studentId: any, courseId: any) => {
        setLoading(true)

        try {
            const response = await fetch(`${port}/checkEnrolledStudent/${studentId}/${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch enrollment status');
            }
            const data = await response.json();
            setEnrollStudent(data.success);
            console.log(enrollStudent, "jdjdjd")

            setLoading(false)
        } catch (error) {
            console.error('Error checking enrollment status:', error);
            throw error;
        }
    }


    const createEnrolledStudent = async (payload: any) => {
        try {
            const response = await axios.post(`${port}/enrollStudent`, payload);
            setEnrollStudent(response.data);
            return enrollStudent
        } catch (error) {
            console.error('Error Creating enrollment:', error);
            throw error;
        }

    }

    const fetchEnrolledCourses = async (studentId: any) => {
        setLoading(true)

        try {
            const response = await axios.get(`${port}/enrolledCourses/${studentId}`);
            setEnrolledCourses(response.data);
            setLoading(false)

        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
        }
    };


    return (
        <CourseContext.Provider
            value={{ loading, courses, course, getCourses, getCourse, createEnrolledStudent, getEnrolledStudent, enrollStudent, enrolledCourses, fetchEnrolledCourses }}>
            {children}

        </CourseContext.Provider>
    )
}