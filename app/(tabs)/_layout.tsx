import React, { useEffect } from "react";
import { ApIcon } from "../../src/components/icon";
import { Tabs, useNavigation } from "expo-router";

const HomeLayout = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const getTabBarIcon =
    (type: any, name: any) =>
    ({ focused }) =>
      (
        <ApIcon
          type={type}
          name={name}
          size={24}
          color={focused ? "#1E90FF" : "black"}
        />
      );

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: getTabBarIcon("AntDesign", "appstore-o"),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          tabBarIcon: getTabBarIcon("MaterialIcons", "library-books"),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarIcon: getTabBarIcon("Ionicons", "bookmarks-outline"),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: getTabBarIcon("Ionicons", "person-circle-outline"),
          headerShown: false,
        }}
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
