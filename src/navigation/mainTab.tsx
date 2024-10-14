import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApIcon } from "../components/icon";
import { theme } from "../constants/theme";
import { screens } from "../modules/index";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <ApIcon
              type="AntDesign"
              name="appstore-o"
              size={24}
              color={focused ? "#1E90FF" : "black"}
            />
          ),
          headerShown: false,
        }}
        name={theme.screens.HomeScreen}
        component={screens.HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <ApIcon
              type="MaterialIcons"
              name="library-books"
              size={24}
              color={focused ? "#1E90FF" : "black"}
            />
          ),
          headerShown: false,
        }}
        name={theme.screens.CourseScreen}
        component={screens.CourseScreen}
      />
      <Tab.Screen
        name={theme.screens.BookMarkScreen}
        component={screens.BookMarkScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ApIcon
              type="Ionicons"
              name="bookmarks-outline"
              size={24}
              color={focused ? "#1E90FF" : "black"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <ApIcon
              type="Ionicons"
              name="person-circle-outline"
              size={24}
              color={focused ? "#1E90FF" : "black"}
            />
          ),
          headerShown: false,
        }}
        name={theme.screens.ProfileScreen}
        component={screens.ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
