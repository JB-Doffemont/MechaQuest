import logo from "../../assets/logo.png";
import { View, Image, Text, Button } from "react-native";
import { useEffect } from "react";
import React, { useState } from "react";
import styles from "../../style/HomeScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
    const [user, setUser] = useState([]);
    const [mainRobot, setMainRobot] = useState([]);

    
    useEffect(() => {
              const getUser = async () => {
                  try {
                  const userEmail = await AsyncStorage.getItem('email');
                
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
                          console.log(json);
                  } catch (error) {
                    console.error(error);
                  }
                };
                
              getUser();

              const getMainRobot = async () => {
                try {
                    const response = await fetch(
                        `http://192.168.43.192:8000/api/mainrobot`, {
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
                        setMainRobot(json[0]);
                    
                } catch (error) {
                  console.error(error);
                }
              };
              
            getMainRobot();
        }, []);

    return(
        <View style={styles.container}>
            <View style={styles.greetingsContainer}>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.greetings}> Bonjour {user.pseudo} !</Text>
            </View>
            <View style={styles.gameModeContainer}>
                <Text style={styles.options}>
                   - Aventure Solo
                </Text>
                <Text style={styles.options}>
                   - Joueur vs Joueur
                </Text>
            </View>
            <View style={styles.navigationContainer}>
                <Text style={styles.link}
                  onPress={() => navigation.navigate('CollectionScreen')}>
                    Collection
                  </Text>
                <Text style={styles.link}
                  onPress={() => navigation.navigate('ShopScreen')}>
                    Boutique
                  </Text>
                <Text style={styles.link}
                  onPress={() => navigation.navigate('RankingScreen')}>
                    Classement
                  </Text>
                <Text style={styles.link}
                  onPress={() => navigation.navigate('ProfilScreen')}>
                    Profil
                </Text>
            </View>
            <View style={styles.robotContainer}>
                <Image source={{uri:  `http://192.168.43.192:8000/${mainRobot.robot_image}`}} style={styles.card}></Image>
                <Text style={styles.stam}>Stamina {mainRobot.current_stam} / 50 pts</Text>
            </View>
        </View>
    );
}