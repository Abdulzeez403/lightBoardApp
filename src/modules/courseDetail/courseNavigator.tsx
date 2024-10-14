
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react"
import { AboutScreen } from "./components/about";
import { LessonsScreen } from "./components/lessons";
import { ReviewScreen } from "./components/review";
import { IContent } from "./model";
import { useCourseContext } from "../course/context";
import { useContentContext } from "./context";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

interface IProps {
    course: any,
}
const CourseNavigatorTab = ({ course }: IProps) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="About" component={AboutScreen} initialParams={{ course: course }} />
            <Tab.Screen name="Lesson" component={LessonsScreen}
                initialParams={{ course: course }}
            />
            <Tab.Screen name="Review" component={ReviewScreen} />
        </Tab.Navigator>
    );
}

export default CourseNavigatorTab;