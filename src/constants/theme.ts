//App Color
const colors = {
  mainColor: "#FFFFF0",
  textColor: "#FFFFF0",
  primaryColor: "#1E90FF",
  buttonSecondaryColor: "",
};

//App Fonts
const fonts = {
  H1: {
    fontFamily: "Montserrat-Medium",
    fontSize: 28,
    lineHeight: 32 * 1.3,
    color: "white",
  },
  H2: {
    // fontFamily: "Inter-Bold",
    fontSize: 22,
    lineHeight: 22 * 1.4,
  },
  H3: {
    // fontFamily: "Inter-Medium",
    // fontSize: 20,
    fontSize: 16,
    lineHeight: 20 * 1.2,
  },
  H4: {
    // fontFamily: "Inter-Medium",
    fontSize: 18,
    lineHeight: 18 * 1.2,
  },
  H5: {
    // fontFamily: "Inter-SemiBold",
    fontSize: 14,
    lineHeight: 14 * 1.2,
  },
  DMSans_400Regular: {
    fontFamily: "Montserrat-Regular",
  },
  Montserrat_500Medium: {
    fontFamily: "Montserrat-Medium",
  },
  Montserrat_700Bold: {
    fontFamily: "Montserrat-Bold",
  },
  textStyle14: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    lineHeight: 14 * 1.5,
  },
  textStyle16: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    lineHeight: 16 * 1.7,
  },
};

//App Screens
const screens: any = {
  //OnBoarding
  TabNavigator: "TabNavigator",
  OnBoardingScreen: "OnBoarding",

  //Home
  HomeScreen: "home",
  CourseScreen: "My Course",
  ProfileScreen: "Profile",
  CourseDetailScreen: "CourseDetail",
  ContentListsScreen: "ContentLists",
  ContentScreen: "ContentScreen",
  BookMarkScreen: "BookMark",

  //Authentication
  SignupScreen: "SignUp",
  SigninScreen: "SignIn",
};

const theme = { colors, fonts, screens };
export { theme };
