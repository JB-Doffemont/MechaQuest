import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./src/style/AppStyle";
import SignUp from "./src/components/SignUpForm";
import StarterScreen from "./src/components/StarterScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StarterScreen />
    </View>
  );
}
