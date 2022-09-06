import React from "react";
import {Text, TouchableOpacity, View } from "react-native";

export default function Button() {
    return(
        <View>
            <TouchableOpacity         onPress={() => navigation.navigate('LogIn')}
                style={styles.button}>
            <Text style={styles.button_text}>{buttonLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}