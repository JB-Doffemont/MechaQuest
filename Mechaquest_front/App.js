import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpFormScreen from "./src/components/views/SignUpFormScreen";
import LogInFormScreen from "./src/components/views/LogInFormScreen";
import PreStarterScreen from "./src/components/views/PreStarterScreen";
import StarterScreen from "./src/components/views/StarterScreen";
import IntroScreen from "./src/components/views/IntroScreen";
import RobotChoiceScreen from "./src/components/views/RobotChoiceScreen";
import HomeScreen from "./src/components/views/HomeScreen";
import CollectionScreen from "./src/components/views/CollectionScreen";
import ProfilScreen from "./src/components/views/ProfilScreen";
import RankingScreen from "./src/components/views/RankingScreen";
import ShopScreen from "./src/components/views/ShopScreen";
import AreaChoiceScreen from "./src/components/views/AreaChoiceScreen";

/**
 * Mon Ip préférée : http://192.168.43.192:8000
 */

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="AreaChoiceScreen"
          component={AreaChoiceScreen}
          options={{ headerShown: false }}
        /> */}
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
        <Stack.Screen
          name="LogInFormScreen"
          component={LogInFormScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpFormScreen"
          component={SignUpFormScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RobotChoiceScreen"
          component={RobotChoiceScreen}
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
