import React from "react";
import { useState } from "react";
import { View } from "react-native";
import styles from "../style/LogInFormStyle";
import InputWithLabel from "./usable/InputWithLabel";
import ButtonRequest from "../components/usable/ButtonRequest";



export default function SignUp(navigator) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

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
                  email: email,
                  password: password,
                })
              });;
             const json = await response.json();
             setData(json);

             setError(json.message);

             console.log(json);
           } catch (error) {
             console.error(error);
           } finally {
             setLoading(false);
           }
           // console.log(navigator);
          // navigator.navigation.navigate('SignUpForm');
         };
    
  

    return(
        <View style={styles.container}>
            <InputWithLabel 
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Entrez votre e-mail"
                />
                  {error && (<p> {error} </p>)}

            <InputWithLabel 
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
                />
                {error && (<p> {error} </p>)}


                <ButtonRequest buttonLabel="Me Connecter"
                method={getLoginData}/>
        </View>
    );
}
