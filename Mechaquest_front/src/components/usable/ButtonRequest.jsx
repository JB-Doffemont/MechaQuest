import React from "react";
import styles from "../../style/ButtonStyle"
import {Text, TouchableOpacity, View } from "react-native";
import { useRoute } from '@react-navigation/native';


export default function Button({buttonLabel, method}) {

    const route = useRoute();
    
        if (route.name == 'RobotChoice') {
            return(
                <View>
                        <TouchableOpacity onPress={method} style={[styles.choiceButton]}>
                        <Text style={styles.button_text}>{buttonLabel}</Text>
                        </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View>
                    <TouchableOpacity onPress={method} style={[styles.button]}>
                    <Text style={styles.button_text}>{buttonLabel}</Text>
                    </TouchableOpacity>
                </View>)
        }
}
   