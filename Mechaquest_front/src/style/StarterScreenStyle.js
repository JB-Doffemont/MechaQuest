import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 605,
    height: 359,
    marginBottom: 10,
  },
  title: {
    color: "#888",
    fontSize: 58,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#49ada5",
    padding: 20,
    borderRadius: 5,
    transition: 0.5,
    color: "#41403E",
    // font-size:2rem;
    // letter-spacing:1px;
    // outline:none;
    // box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2);
    // border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  },
  button_text: {
    fontSize: 20,
    color: "#fff",
  },
});
