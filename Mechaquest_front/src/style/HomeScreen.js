import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#020829",
  },

  greetingsContainer: {
    flexDirection: "row",
    width: 100,
    height: 50,
  },

  logo: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 70,
    height: 70,
  },

  greetings: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    position: "absolute",
    top: 32,
    left: 90,
    width: 150,
    height: 50,
  },

  navigationContainer: {
    position: "absolute",
    right: 10,
    top: 35,
    width: "55%",
    flexDirection: "row",
  },
});
