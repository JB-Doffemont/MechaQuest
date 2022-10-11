import React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import styles from "../style/LogInFormStyle";
import inputStyle from "../style/InputStyle";
import InputWithLabel from "./usable/InputWithLabel";
import ButtonRequest from "../components/usable/ButtonRequest";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LogIn(navigator) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");


    const [data, setData] = useState({});

    const loginData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
            // Pour se connecter, ne pas oublier php artisan serve avec le bon host  http://172.20.10.7:8000/api/login
            // localhost pc http://127.0.0.1:8000/api/login
            // http://192.168.43.192:8000
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
              console.log(json);
              await AsyncStorage.setItem('access_token', json.access_token);
              await AsyncStorage.setItem('email', email);

              navigator.navigation.navigate('IntroScreen');
             
          } else {
            setErrorEmail(json.email);
             setErrorPassword(json.password);
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
                 <Text style={inputStyle.error}> {errorEmail && (<Text> {errorEmail}  </Text>)} </Text>

            <InputWithLabel 
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
                />
                 <Text style={inputStyle.error}> {errorPassword && (<Text> {errorPassword} </Text>)} </Text>


                <ButtonRequest buttonLabel="Connexion"
                method={loginData}/>
        </View>
    );
}

