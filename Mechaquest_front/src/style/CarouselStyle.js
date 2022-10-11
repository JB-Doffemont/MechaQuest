import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#020829",
    flexDirection: "row",
    // flex: 1,
    justifyContent: "space-around",
    // justifyContent: "center",
    // alignItems: "center",
  },
  slideImage: {
    flexBasis: 100,
    flexGrow: 0.45,
    marginBottom: 100,
    // flex: 0.5,
  },
  slideTitle: { fontSize: 24, color: "white" },
  slideSubtitle: {
    fontSize: 18,
    color: "white",
    width: windowWidth * 0.3,
    height: windowHeight * 0.3,
  },

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
