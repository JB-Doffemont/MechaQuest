/* La logique de cette view:
- Si présence du token mais pas de robot selectionné, doit renvoyer sur le tuto puis selection du robot (if getItem !== null && 1st_co == 0)
- Si présence du token et d'un robot selectionné, doit renvoyer sur la home page du joueur (if getItem !== null && 1st_co == 1)
- Si pas de présence du token, doit renvoyer sur le "Starter Screen Unco" pour permettre de s'enregistrer ou de se connecter (if getItem == null)

Il va falloir faire une requete en back qui compare notre "access_token" à l'auth token qui est dans la table "personnal access token" afin de récupérer l'email.
 */

import React from "react";
import logo from "../assets/logo.png";
import styles from "../style/StarterScreenStyle"
import { Image, View, ActivityIndicator } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 

export default function PreStarterScreen() {

    //const token = await AsyncStorage.getItem('access_token');
    return(
       <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <ActivityIndicator size="large" color="#61FFF5" />
       </View>
    );
}