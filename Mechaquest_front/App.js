import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpForm from "./src/components/views/SignUpForm";
import LogInForm from "./src/components/views/LogInForm";
import PreStarterScreen from "./src/components/views/PreStarterScreen";
import StarterScreen from "./src/components/views/StarterScreen";
import IntroScreen from "./src/components/views/IntroScreen";
import RobotChoice from "./src/components/views/RobotChoice";
import HomeScreen from "./src/components/views/HomeScreen";
import CollectionScreen from "./src/components/views/CollectionScreen";
import ProfilScreen from "./src/components/views/ProfilScreen";
import RankingScreen from "./src/components/views/RankingScreen";
import ShopScreen from "./src/components/views/ShopScreen";

/**
 * Mon Ip préférée : http://192.168.43.192:8000
 */

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PreStarterScreen"
          component={PreStarterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StarterScreen"
          component={StarterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LogInForm" component={LogInForm} />
        <Stack.Screen
          name="SignUpForm"
          component={SignUpForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RobotChoice"
          component={RobotChoice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
        <Stack.Screen name="ShopScreen" component={ShopScreen} />
        <Stack.Screen name="RankingScreen" component={RankingScreen} />
        <Stack.Screen name="ProfilScreen" component={ProfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
