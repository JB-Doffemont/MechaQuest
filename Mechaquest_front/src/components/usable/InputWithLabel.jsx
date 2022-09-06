import {View, Text, TextInput} from "react-native";
import React from "react";
import styles from "../../style/InputStyle.js";

export default function InputWithLabel() {

    return(
        <View>
            <Text style={styles.label}>Test</Text>
            <TextInput/>
        </View>
    );
}

