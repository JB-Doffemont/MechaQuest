import React from "react";
import styles from "../../style/ButtonStyle"
import {Text, TouchableOpacity, View } from "react-native";


export default function Button({buttonLabel, method}) {

   
    
    return(
        <View>
            <TouchableOpacity         onPress={method}
                style={styles.button}>
            <Text style={styles.button_text}>{buttonLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}