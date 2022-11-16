// Ecran affichant le combat de robot du joueur contre un ordinateur

import React from "react";
import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import styles from "../../style/BattleScreenStyle";
import ipConfig from "../../../IpConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';


export default function BattleScreen() {

    // const [areas, setAreas] = useState([]);
    const [mainRobot, setMainRobot] = useState([]);

    useEffect(() => {
        // Récupération du robot du joueur
        const getMainRobot = async () => {
            try {
                const response = await fetch(
                    `${ipConfig}/api/mainrobot`, {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',  
                        },
                    });
                    
                    const json = await response.json();
                    setMainRobot(json[0]);
                    
            } catch (error) {
              console.error(error);
            }
          };
        getMainRobot();

        // Récupération de la route et de sa position pour ensuite afficher le robot
        // const getRobotArea = async () => {
        //     try {
        //         const response = await fetch(
        //             `${ipConfig}/api/areas`, {
        //                 method: 'GET',
        //                 headers: {
        //                     "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
        //                     Accept: 'application/json',
        //                     'Content-Type': 'application/json',  
        //                 },
        //             });
                
        //             const json = await response.json();
        //             console.log(json);
        //             setAreas(json);
                    
        //     } catch (error) {
        //       console.error(error);
        //     }
        //   };
        
        // getRobotArea();

    }, []);
    
    return(
        <View style={styles.container}>
            {/* Emplacement pour le robot du joueur */}
            <View style={styles.robotPlayerContainer}>
                <Image source={{uri:  `${ipConfig}/${mainRobot.robot_image}`}} style={styles.card}></Image>
            </View>
            {/* Affichage du dé */}
            <View style={styles.diceContainer}>
                <ReactDice
                numDice={1}
                faceColor={'#E61E1E'}
                dotColor={'#fffff'}
                // rollDone={this.rollDoneCallback}
                // ref={dice => this.reactDice = dice}
                />
            </View>
            {/* Emplacement du robot adverse */}
            <View style={styles.robotIAContainer}>
                <Image source={{uri:  `${ipConfig}/${mainRobot.robot_image}`}} style={styles.card}></Image>
            </View>
        </View>
    );
}