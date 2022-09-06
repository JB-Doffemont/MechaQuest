import React from "react";
import styles from "./src/style/AppStyle";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpForm from "./src/components/SignUpForm";
import StarterScreen from "./src/components/StarterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StarterScreen" component={StarterScreen} />
        <Stack.Screen name="SignUpForm" component={SignUpForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
