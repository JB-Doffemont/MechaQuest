/* La logique de cette view:
- Si présence du token mais pas de robot selectionné, doit renvoyer sur le tuto puis selection du robot (if getItem AsyncStorage !== null && 1st_co == 0)
- Si présence du token et d'un robot selectionné, doit renvoyer sur la home page du joueur (if getItem AsyncStorage!== null && 1st_co == 1)
- Si pas de présence du token, doit renvoyer sur le "Starter Screen Unco" pour permettre de s'enregistrer ou de se connecter (if getItem == null)

Il va falloir faire une requete en back qui compare notre "access_token" à l'auth token qui est dans la table "personnal access token" afin de récupérer l'email.
 */


import logo from "../../assets/logo.png";
import styles from "../../style/StarterScreenStyle";
import { useEffect } from "react";
import React, { useState } from "react";
import { Image, View, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PreStarterScreen(navigator) {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState("");  

    useEffect(() => {
      AsyncStorage.clear();
            const getUser = async () => {
                try {
                const userEmail = await AsyncStorage.getItem('email');
                const token = await AsyncStorage.getItem('access_token');
                
                if(!token) {
                    navigator.navigation.navigate('StarterScreen');   
                } else {
                    
                    const response = await fetch(
                        `http://192.168.43.192:8000/api/users/${userEmail}`, {
                          // http://127.0.0.1:8000/api/users/${userEmail}
                          // http://192.168.43.192:8000/api/users/${userEmail}
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
                        setToken(token);
                    }
                    
                } catch (error) {
                  console.error(error);
                }
              };
              
            getUser();
            if(token && user.first_connexion == 0) {
              navigator.navigation.navigate('IntroScreen');
             
            } 
            else if (token && user.first_connexion == 1) {
                navigator.navigation.navigate('HomeScreen');
               
            }
            
          
            
      }, [token]);
    
    return(
       <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <ActivityIndicator size="large" color="#61FFF5" />
       </View>
    );

    
}