import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpForm from "./src/components/views/SignUpForm";
import LogInForm from "./src/components/views/LogInForm";
import PreStarterScreen from "./src/components/views/PreStarterScreen";
import StarterScreen from "./src/components/views/StarterScreen";
import IntroScreen from "./src/components/views/IntroScreen";
import RobotChoice from "./src/components/views/RobotChoice";
import Carousel from "./src/components/usable/Carousel";
import HomeScreen from "./src/components/views/HomeScreen";

/**
 * Mon Ip préférée : http://192.168.43.192:8000
 */

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RobotChoice" component={RobotChoice} />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="PreStarterScreen" component={PreStarterScreen} />
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
