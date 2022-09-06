import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./src/style/AppStyle";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "./src/components/SignUpForm";
import LogInForm from "./src/components/LogInForm";
import StarterScreen from "./src/components/StarterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StarterScreen" component={StarterScreen} />
        <Stack.Screen
          name="LogIn"
          component={LogInForm}
          options={{ title: "Log-in" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
