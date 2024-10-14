import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../../../../assets/animations/student.json"),
    text: "Start your learning journey! Explore, engage, excel",
    textColor: "#00000",
    backgroundColor: "white",
  },
  {
    id: 2,
    animation: require("../../../../assets/animations/student.json"),
    text: "Empower your teaching. Inspire, guide, collaborate.",
    textColor: "#00000",
    backgroundColor: "#997950",
  },
  {
    id: 3,
    animation: require("../../../../assets/animations/student.json"),
    text: "Join the adventure! Stay connected, nurture learning",
    textColor: "#00000",
    backgroundColor: "grey",
  },
];

export default data;
