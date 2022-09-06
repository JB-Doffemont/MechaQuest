import React from "react";
import { useState } from "react";
import { View } from "react-native";
import styles from "../style/SignUpFormStyle"
import InputWithLabel from "./usable/InputWithLabel";
import Button from "./usable/Button";

export default function SignUp() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");

    function matchPassword(props) {
      const{nativeEvent: {text},} = props;  

      if(text !== password) {
        alert("Le mot de passe et la confirmation doivent être identiques !")
      }
    }

    return(
        <View style={styles.container}>
        <InputWithLabel label="Pseudo"
                        value={pseudo}
                        onChangeText={setPseudo}
                        placeholder="Entrez votre pseudo"
                        />
        <InputWithLabel label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Entrez votre e-mail"
                        />
        <InputWithLabel label="Mot de passe"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Entrez votre mot de passe"
                        secureTextEntry
                        />
        <InputWithLabel label="Confirmation"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onSubmitEditing={matchPassword}
                        placeholder="Confirmez votre mot de passe"
                        secureTextEntry
                        />

        <Button buttonLabel="Go to login"
                route="LogInForm"/>
        
        </View>
    );
}

