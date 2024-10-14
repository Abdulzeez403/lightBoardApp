import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { OngoingScreen } from "./components/ongoing";
import { CompletedScreen } from "./components/completed";
import React from "react";

interface IProps {
    // courses: any,
    // // onRefresh: () => void;
    // refreshing: any
}



const Tab = createMaterialTopTabNavigator();
const MyCourseNavigatorTab = ({ }: IProps) => {
    return (
        <Tab.Navigator >
            <Tab.Screen name="Ongoing" component={OngoingScreen}
            // initialParams={{ courses: courses, refreshing: refreshing }}
            />

            <Tab.Screen name="Completed" component={CompletedScreen}

            // initialParams={{ courses: courses, refreshing: refreshing }} 
            />
        </Tab.Navigator>
    );
}

export default MyCourseNavigatorTab;
