/* La logique de cette view:
- Si présence du token mais pas de robot selectionné, doit renvoyer sur le tuto puis selection du robot (if getItem AsyncStorage !== null && 1st_co == 0)
- Si présence du token et d'un robot selectionné, doit renvoyer sur la home page du joueur (if getItem AsyncStorage!== null && 1st_co == 1)
- Si pas de présence du token, doit renvoyer sur le "Starter Screen Unco" pour permettre de s'enregistrer ou de se connecter (if getItem == null)
 */


import logo from "../assets/logo.png";
import styles from "../style/StarterScreenStyle";
import { useEffect } from "react";
import React, { useState } from "react";
import { Image, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PreStarterScreen(navigator) {
    const [user, setUser] = useState([]);
    const token = AsyncStorage.getItem('access_token');

    function redirection () {
        // const token = await AsyncStorage.getItem('access_token');
        getUser();
        
        if(token && user.first_connexion == 1) {
            navigator.navigation.navigate('HomeScreen');
        }
        else if(token && user.first_connexion == 0) {
            navigator.navigation.navigate('TutorialScreen');
         } else {
            navigator.navigation.navigate('StarterScreen');
         }
    }

    const getUser = async () => {
        try {
        const userEmail = await AsyncStorage.getItem('email');
       
          const response = await fetch(
            `http://192.168.43.192:8000/api/users/${userEmail}`, {
                method: 'GET',
                // mode: 'no-cors',
                headers: {
                    "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json',  
                },
              });
         
          const json = await response.json();
              
         setUser(json[0]);
          
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {

     redirection();
      }, []);

    return(
       <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
       </View>
    );
}