import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useContentContext } from "../../../src/modules/courseDetail/context";
import { useQuizContext } from "../../../src/modules/quiz/context";
import { ApIcon } from "../../../src/components/icon";
import { ApLoader } from "../../../src/components/loader";
import { ApButton } from "../../../src/components";

const ContentListScreen = () => {
  const { id } = useLocalSearchParams();
  const { getContents, contents } = useContentContext();
  const { getQuizs, getQuestions, quizs } = useQuizContext();

  const FetchQuiz = async () => {
    await getQuizs(id);
    const singleQuiz = quizs?.[0];
    if (singleQuiz) {
      const quizId = singleQuiz._id;
      getQuestions(quizId);
    } else {
      console.log("No quiz found");
    }
  };

  useEffect(() => {
    getContents(id);
    FetchQuiz();
  }, []);

  const ContentItem = ({ item, index }) => {
    const number = (index + 1).toString().padStart(2, "0");

    return (
      <Link href={`/(tabs)/courses/contents/${item._id}`} asChild>
        <TouchableOpacity
          style={{
            flexDirection: "column",
            gap: 10,
            marginVertical: 4,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderRadius: 30,
              paddingVertical: 5,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "grey",
              paddingHorizontal: 5,
            }}
            className="shadow-lg shadow-white px-2"
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <View className=" rounded-full bg-blue-200 hover:text-white justify-center items-center  w-10 h-10">
                <Text className="text-blue-500 font-bold text-lg">
                  {number}
                </Text>
              </View>
              <Text className="font-bold" style={{ fontSize: 18 }}>
                `{item?.title.slice(0, 30)}...`
              </Text>
            </View>
            <View className=" rounded-full hover:bg-blue-300 hover:text-white justify-center items-center  w-8 h-10 bg-white">
              <ApIcon type="AntDesign" name="play" size={32} color="blue" />
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <SafeAreaView className="p-4">
      <View className="">
        {contents.length === 0 ? (
          <ApLoader />
        ) : (
          <ScrollView>
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={contents}
              contentContainerStyle={{ paddingBottom: 10 }}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <ContentItem item={item} index={index} />
              )}
              ListFooterComponent={
                <View className="mt-4 px-4">
                  <ApButton
                    label="Take Quiz"
                    onPress={() => {
                      FetchQuiz();
                      router.push("(tabs)/courses/quiz");
                    }}
                  />
                </View>
              }
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ContentListScreen;
