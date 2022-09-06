import React from "react";
import { useState } from "react";
import { View } from "react-native";
import InputWithLabel from "./usable/InputWithLabel";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return(
        <View>
            <InputWithLabel 
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Entrez votre e-mail"
                />
            <InputWithLabel 
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
                />
       
        </View>
    );
}

