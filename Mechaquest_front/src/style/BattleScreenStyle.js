import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#070F3C",
  },

  robotPlayerContainer: {
    position: "absolute",
    alignItems: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.8,
    left: "3%",
    top: "10%",
  },

  diceContainer: {
    position: "absolute",
    left: "41%",
    top: "10%",
  },

  robotIAContainer: {
    position: "absolute",
    alignItems: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.8,
    right: "14%",
    top: "10%",
  },

  card: {
    flex: 5,
    width: windowWidth * 0.3,
  },

  diceNumberP: {
    color: "white",
    fontSize: 14,
  },

  diceNumber: {
    color: "white",
    alignItems: "center",
    marginLeft: 60,
    fontSize: 36,
  },
});
