import React from "react";
import { useState } from "react";
import { View, ScrollView, Text} from "react-native";
import styles from "../style/SignUpFormStyle"
import InputWithLabel from "./usable/InputWithLabel";
import ButtonRequest from "../components/usable/ButtonRequest";

export default function SignUp(navigator) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPseudo, setErrorPseudo] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');


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
            setErrorEmail(json.email);
            setErrorPassword(json.password);
            setErrorPseudo(json.pseudo);
            setErrorConfirmPassword("La confirmation du mot de passe est différente du mot de passe.");

            if (json.status_code == 200) {
                navigator.navigation.navigate('LogInForm');
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
        <Text>{errorPseudo && (<p> {errorPseudo} </p>)} </Text>

        <InputWithLabel label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Entrez votre e-mail"
                        />
        <Text>{errorEmail && (<p> {errorEmail} </p>)}</Text>

        <InputWithLabel label="Mot de passe"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Entrez votre mot de passe"
                        secureTextEntry
                        />
        <Text>{errorPassword && (<p> {errorPassword} </p>)}</Text>

        <InputWithLabel label="Confirmation"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirmez votre mot de passe"
                        secureTextEntry
                        />
        <Text>{errorConfirmPassword && (<p> {errorConfirmPassword} </p>)}</Text>

        <ButtonRequest buttonLabel="Valider"
                method={register}/>
        </ScrollView>
        </View>
    );
}