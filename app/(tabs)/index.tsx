import { Redirect, useNavigation } from "expo-router";
import React, { useEffect } from "react";

export default function index() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return <Redirect href="/(tabs)" />;
}
// import React from "react";
// import HomeScreen from "../../src/modules/home/screen";
// import { View, Tet } from "react-native";

// const index = ({ navigate }: any) => {
//   // return <HomeScreen navigation={navigate} />;
//   return (
//     <View>
//       <Text>This is it</Text>
//       </View>
//   )
// };

// export default index;
