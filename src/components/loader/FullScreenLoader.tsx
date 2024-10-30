import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Modal, View, Text, Animated } from "react-native";

interface LoaderProps {
  loading: boolean;
}

const ApFullScreenLoader: React.FC<LoaderProps> = ({ loading }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current; // Initial rotation value

  // Rotate animation
  const startRotation = () => {
    rotateAnim.setValue(0); // Reset rotation to 0
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1, // Rotate to 1 (full rotation)
        duration: 1000, // Duration of one full rotation
        useNativeDriver: true, // Use native driver for performance
      })
    ).start();
  };

  useEffect(() => {
    if (loading) {
      startRotation();
    }
  }, [loading]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal transparent visible={loading} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="flex items-center">
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <Feather name="loader" size={40} color="white" />
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

export default ApFullScreenLoader;
