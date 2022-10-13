import React from "react";
import styles from "../../style/ButtonStyle"
import {Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Button({buttonLabel, route}) {
    const navigation = useNavigation();
    
    return(
        <View>
            <TouchableOpacity         onPress={() => navigation.navigate(`${route}`)}
                style={styles.button}>
            <Text style={styles.button_text}>{buttonLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}