import logo from "../../assets/logo.png";
import { View, Image, Text, Button } from "react-native";
import { useEffect } from "react";
import React, { useState } from "react";
import styles from "../../style/HomeScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
    const [user, setUser] = useState([]);
    const [robots, setRobots] = useState([]);
    const [token, setToken] = useState("");
    
    useEffect(() => {
              const getUser = async () => {
                  try {
                  const userEmail = await AsyncStorage.getItem('email');
                  console.log(userEmail);
                  const token = await AsyncStorage.getItem('access_token');
                  console.log(token + 2);
  
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
                          console.log(json);
                          setUser(json[0]);
                          setRobots(json[1]);
                          setToken(token);
                      
                  } catch (error) {
                    console.error(error);
                  }
                };
                
              getUser();
        }, []);

    return(
        <View style={styles.container}>
            <View style={styles.greetingsContainer}>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.greetings}> Bonjour {user.pseudo} !</Text>
            </View>
            <View style={styles.navigationContainer}>
                <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontSize:16, color:"white" }}
                  onPress={() => navigation.navigate('CollectionScreen')}>
                    Collection
                  </Text>
                <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontSize:16, color:"white" }}
                  onPress={() => navigation.navigate('ShopScreen')}>
                    Boutique
                  </Text>
                <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontSize:16, color:"white" }}
                  onPress={() => navigation.navigate('RankingScreen')}>
                    Classement
                  </Text>
                <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontSize:16, color:"white" }}
                  onPress={() => navigation.navigate('ProfilScreen')}>
                    Profil
                  </Text>
            </View>
        </View>
    );
}