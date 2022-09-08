import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpForm from "./src/components/SignUpForm";
import LogInForm from "./src/components/LogInForm";
import StarterScreen from "./src/components/StarterScreen";
import IntroScreen from "./src/components/IntroScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StarterScreen" component={StarterScreen} />
        <Stack.Screen
          name="LogInForm"
          component={LogInForm}
          options={{ title: "Log-in" }}
        />
        <Stack.Screen name="SignUpForm" component={SignUpForm} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
