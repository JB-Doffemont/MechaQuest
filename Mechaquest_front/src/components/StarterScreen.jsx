import React from "react";
import logo from "../assets/logo.png";
import styles from "../style/StarterScreenStyle"
import { Image, Text, TouchableOpacity, View } from "react-native";
import Button from "./usable/Button";

export default function StarterScreen({navigation}) {
    return(
       <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
       <Button
       buttonLabel="Inscription"
       route="SignUpForm"/>
       <Button
       buttonLabel="Connexion"
       route="LogInForm"/>
   
       </View>
    );
}