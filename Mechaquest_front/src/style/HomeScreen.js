import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#020829",
  },

  greetingsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
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
    position: "absolute",
    top: 30,
    left: 90,
    width: 150,
    height: 50,
  },
});
