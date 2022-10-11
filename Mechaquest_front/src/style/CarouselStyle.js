import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#020829",
    // justifyContent: "center",
    // alignItems: "center",
  },
  slideImage: { width: windowWidth * 0.3, height: windowHeight * 0.8 },
  slideTitle: { fontSize: 24, color: "white" },
  slideSubtitle: { fontSize: 18, color: "white" },

  pagination: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: { backgroundColor: "lightblue" },
  paginationDotInactive: { backgroundColor: "black" },

  carousel: { flex: 1 },
});
