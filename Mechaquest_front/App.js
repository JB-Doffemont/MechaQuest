import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpForm from "./src/components/SignUpForm";
import LogInForm from "./src/components/LogInForm";
import PreStarterScreen from "./src/components/PreStarterScreen";
import StarterScreen from "./src/components/StarterScreen";
import IntroScreen from "./src/components/IntroScreen";

/**
 * Mon Ip préférée : http://192.168.43.192:8000
 */

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="PreStarterScreen" component={PreStarterScreen} /> */}
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
