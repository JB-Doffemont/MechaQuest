import React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import styles from "../style/LogInFormStyle";
import inputStyle from "../style/InputStyle";
import InputWithLabel from "./usable/InputWithLabel";
import ButtonRequest from "../components/usable/ButtonRequest";



export default function LogIn(navigator) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [data, setData] = useState({});

    const loginData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: email,
                  password: password,
                })
              });;
             const json = await response.json();
             setData(json);

             if (json.status_code == 200) {
              navigator.navigation.navigate('IntroScreen');
          } else {
            setError(json.message);
          }
             
           } catch (error) {
          
            console.error(error);
           } 
          
          
         };
    
  

    return(
        <View style={styles.container}>
            <InputWithLabel 
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Entrez votre e-mail"
                />
                 <Text style={inputStyle.error}> {error && (<p> {error}  </p>)} </Text>

            <InputWithLabel 
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
                />
                 <Text style={inputStyle.error}> {error && (<p> {error} </p>)} </Text>


                <ButtonRequest buttonLabel="Connexion"
                method={loginData}/>
        </View>
    );
}

