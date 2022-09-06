import React from "react";
import logo from "../assets/logo.png";
import styles from "../style/StarterScreenStyle"
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function StarterScreen({navigation}) {
    return(
       <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('SignUpForm')} style={styles.button}>
            <Text style={styles.button_text}>S'inscrire </Text>
        </TouchableOpacity>
       </View>
    );
}