import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ApButton } from "../../components";
import { useLessonContext } from "./context";
import { ApIcon } from "../../components/icon";
import { ApLoader } from "../../components/loader";
import { ModalComponent } from "../../components/modal";

const ContentScreen = ({ route }) => {
  const { width, height } = Dimensions.get("window");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { item } = route.params;
  const { getLessons, lessons, loading } = useLessonContext();
  const flatListRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) {
      const nextIndex = currentIndex + 1;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: nextIndex,
          viewPosition: 0.5, // Change this value as needed
        });
      }
      setCurrentIndex(nextIndex);
    }
  };

  useEffect(() => {
    getLessons(item?._id);
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 60000); // 10 minutes in milliseconds

    return () => clearTimeout(timeout);
  }, []);

  const navigation = useNavigation();

  const [text, setText] = useState("");

  const handleChangeText = (inputText) => {
    setText(inputText);
  };

  const handleRequest = async () => {
    const apiKey = "";

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: inputText,
              },
            ],
          }),
        }
      );
      const data = await response.json();
      console.log("Response data:", data); // Check the response data
      console.log("Choices:", data.choices); // Check the choices array
      if (data.choices && data.choices.length > 0) {
        setResponseText(data.choices[0].message.content); // Assuming the first choice is the completion
      } else {
        setResponseText("No response received");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error gracefully
    }
  };

  const LessonItem = ({ item, index }) => {
    return (
      <ScrollView>
        <View
          key={index}
          style={{
            paddingHorizontal: 10,
            width: width,
            paddingBottom: 90,
            paddingTop: 20,
            flex: 1,
          }}
        >
          <Text className="text-center font-semibold text-lg">
            {item?.title}
          </Text>
          {/* <RichTextPreview htmlContent={item?.note} /> */}
          <Text className="text-md">{item?.note}</Text>
        </View>
      </ScrollView>
    );
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={showModal} style={{ position: "absolute" }}>
        <Image
          source={require("../../../assets/chatGpt.png")}
          style={{ width: 30, height: 30, margin: 10 }}
        />
      </TouchableOpacity>
      <View>
        {loading ? (
          <ApLoader />
        ) : (
          <View>
            <FlatList
              ref={flatListRef}
              data={lessons}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <LessonItem item={item} index={index} />
              )}
              getItemLayout={(data, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
            />
            {currentIndex === lessons.length - 1 ? (
              <View style={styles.stickyButtonContainer}>
                <ApButton
                  label="Next Chapter"
                  onPress={() => navigation.goBack()}
                />
              </View>
            ) : (
              <View style={styles.stickyButtonContainer}>
                <ApButton label="Next" onPress={handleNext} />
              </View>
            )}
          </View>
        )}

        <ModalComponent
          modalVisible={isVisible}
          hideModal={hideModal}
          present="formSheet"
        >
          <View className={{ height: 200 }}></View>
          <Text>Mark Your Attendance!</Text>
        </ModalComponent>

        <ModalComponent modalVisible={modal} hideModal={hideModal}>
          <SafeAreaView
            style={{
              // flexDirection: 'column',
              // flexGrow: 1,
              // justifyContent: 'space-between'

              flexGrow: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 17,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 35,
                }}
              >
                <Image
                  source={require("../../../assets/chatGpt.png")}
                  style={{ width: 30, height: 30, margin: 10 }}
                />
                <Text className="text-lg font-semibold">Chat GPT</Text>
              </View>
              <View>
                <ApIcon
                  size={32}
                  name="close"
                  type="Ionicons"
                  color="black"
                  onPress={hideModal}
                />
              </View>
            </View>

            <KeyboardAvoidingView
              // behavior={Platform.OS === 'ios' ? 'padding' : null}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                className="border-2 rounded-md"
              >
                <TextInput
                  placeholder="Type something..."
                  value={inputText}
                  onChangeText={setInputText}
                  style={{ width: 300, padding: 8 }}
                />
                <View style={{ padding: 2, alignItems: "center" }}>
                  <ApIcon
                    size={32}
                    name="send"
                    type="Ionicons"
                    color="black"
                    onPress={handleRequest}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>

            <View style={{ paddingHorizontal: 10 }}>
              <Text>{text}</Text>
            </View>
          </SafeAreaView>
        </ModalComponent>
      </View>
    </SafeAreaView>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 1,
    padding: 20,
    // Add any styles for your main content
  },
  stickyButtonContainer: {
    position: "absolute",
    bottom: 20, // Adjust as needed
    borderRadius: 5,
    width: Dimensions.get("window").width,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
