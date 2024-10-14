import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ICurrentUser } from './modal';

interface IProp {
    loading: boolean;
    userToken: any;
    user: ICurrentUser,
    signIn: (payload: any) => Promise<any>;
    signUp: (values: any) => void;
    currentUser: (userId: any) => void;
    signOut: () => void;
}
const AuthContext = createContext<IProp>({
    loading: false,
    userToken: null,
    user: null,
    signIn: (payload) => {
        return null
    },
    signUp: (values) => { },
    currentUser: (userId) => { },
    signOut: () => { }
});

export const useAuthContext = () => {
    let context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("app dispatch must be used within app global provider");
    }
    return context;
};

interface IProps {
    children: React.ReactNode;
    navigation?: any;
}

export const AuthProvider: React.FC<IProps> = ({ children, navigation }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState({} as any);
    const [userToken, setUserToken] = useState(null)



    const port = "https://lightboardserver.onrender.com/api";

    const signIn = async (payload: any) => {
        setLoading(true)

        try {
            const response = await axios.post(`${port}/auth/students`, payload);
            await AsyncStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            setUserToken(response.data.jwt)
            console.log(response.data.jwt)
            setLoading(false);

            return userToken

        } catch (error) {
            setLoading(false)
            console.error('Error signing up:', error);
            throw error;
        }
    };

    const signUp = async (userData: any) => {
        try {
            const response = await axios.post(`${port}/students`, userData);
            await AsyncStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    };

    const currentUser = async (userId: any) => {
        try {
            const response = await axios.get(`${port}/student/${userId}`);
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }
    };


    const signOut = async () => {
        setLoading(true);
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            setUserToken(null)
            setLoading(false);
            return userToken;

        } catch (error) {
            setLoading(false);
            console.error('Error signing out:', error);
            throw error;
        }
    };


    return (
        <AuthContext.Provider
            value={{ loading, user, signIn, signUp, currentUser, signOut, userToken }}>
            {children}

        </AuthContext.Provider>
    )
}