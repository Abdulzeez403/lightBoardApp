import React from "react";
import CourseDetailScreen from "../../../../src/modules/courseDetail/screen";
import { useLocalSearchParams } from "expo-router";

const courseDetail = () => {
  const { course } = useLocalSearchParams();
  const courseData = JSON.parse(course as any);

  return <CourseDetailScreen course={courseData} />;
};

export default courseDetail;
