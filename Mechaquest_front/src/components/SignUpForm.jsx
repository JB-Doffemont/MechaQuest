import React from "react";
import { useState } from "react";
import { View, ScrollView} from "react-native";
import styles from "../style/SignUpFormStyle"
import InputWithLabel from "./usable/InputWithLabel";
import ButtonRequest from "../components/usable/ButtonRequest";

export default function SignUp(navigator) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    
    const register = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  pseudo: pseudo,
                  email: email,
                  password: password,
                })
              });

            const json = await response.json();
            setData(json);

            if (json.status_code == 200) {
                navigator.navigation.navigate('LogInForm');
            }
            



        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function matchPassword(props) {
      const{nativeEvent: {text}} = props;  

      if(text !== password) {
        alert("Le mot de passe et la confirmation doivent être identiques !")
      }
    }

    return(
        <View style={styles.container}>
        <ScrollView>
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

        <ButtonRequest buttonLabel="Valider"
                method={register}/>
        </ScrollView>
        </View>
    );
}

