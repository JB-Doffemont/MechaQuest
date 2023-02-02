import { StyleSheet, Dimensions } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  heroeschoice: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.6,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "center",
  },
});
