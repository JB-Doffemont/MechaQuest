import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "./assets/logo.png";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      {/* <Text style={styles.title}>MECHA QUEST</Text> */}

      <TouchableOpacity onPress={() => alert("$ boule")} style={styles.bouton}>
        <Text style={styles.bouton_text}>Découvrir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  bouton: {
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
  bouton_text: {
    fontSize: 20,
    color: "#fff",
  },
});
