import React from "react";
import { ApIcon } from "../../src/components/icon";
import { Tabs } from "expo-router";

const HomeLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
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
        name={"home"}
      />
      <Tabs.Screen
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
        name={"courses"}
      />
      <Tabs.Screen
        name={"bookmarks"}
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
      <Tabs.Screen
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
        name={"profile"}
      />

      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
