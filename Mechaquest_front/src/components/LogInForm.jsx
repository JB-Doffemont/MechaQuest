import React from "react";
import { useState } from "react";
import { TouchableOpacity, Text,  View } from "react-native";
import styles from "../style/LogInFormStyle";
import InputWithLabel from "./usable/InputWithLabel";


export default function SignUp(navigator) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getLoginData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: 'a@a1.com',
                  password: 'adminadmin'
                })
              });;
             const json = await response.json();
             setData(json);
             console.log(json);
           } catch (error) {
             console.error(error);
           } finally {
             setLoading(false);
           }
           console.log(navigator);
           navigator.navigation.navigate('SignUpForm');
         };
    
  

    return(
        <View style={styles.container}>
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
        
        <TouchableOpacity  onPress={() => getLoginData()}
         style={styles.button} >
        <Text style={styles.button_text}>Me Connecter</Text>
        </TouchableOpacity>
        </View>
    );
}

