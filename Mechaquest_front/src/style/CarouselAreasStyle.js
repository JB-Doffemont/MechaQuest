import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#020829",
    justifyContent: "space-around",
  },

  containerTop: {
    flex: 2,
    width: windowWidth,
  },
  containerBottom: {
    flex: 3,
    width: windowWidth,
  },

  slideImage: {
    flexBasis: 100,
    flexGrow: 0.45,
    marginBottom: 100,
  },

  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  slideDescription: {
    fontSize: 14,
    color: "white",
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
  },
  slideButton: {
    color: "red",
    backgroundColor: "green",
  },

  pagination: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    color: "white",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },

  paginationDotActive: { backgroundColor: "red" },
  paginationDotInactive: { backgroundColor: "white" },
});
