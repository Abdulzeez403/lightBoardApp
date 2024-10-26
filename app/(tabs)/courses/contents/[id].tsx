import { View, Text } from "react-native";
import React from "react";
import ContentScreen from "../../../../src/modules/lesson/screen";
import { useLocalSearchParams } from "expo-router";

const ApContentScreen = () => {
  const { id } = useLocalSearchParams();
  return <ContentScreen content={id} />;
};

export default ApContentScreen;
