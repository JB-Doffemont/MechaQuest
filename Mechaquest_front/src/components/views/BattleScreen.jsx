// Ecran affichant le combat de robot du joueur contre un ordinateur

import React, { useState } from "react";
import ipConfig from "../../../IpConfig";
import ReactDice from 'react-dice-complete';
import { useEffect, useContext } from "react";
import { View, Image, Text } from "react-native";
import styles from "../../style/BattleScreenStyle";
import 'react-dice-complete/dist/react-dice-complete.css';
import { MainRobotContext } from "../../lib/MainRobotContext";
import { AreaChoosenContext } from "../../lib/AreaChoosenContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BattleScreen() {

    const [robotArea, setRobotArea] = useState([]);
    const {mainRobot} = useContext(MainRobotContext);

    const [diceNumber, setdiceNumber] = useState("");
    const {areaChoosen} = useContext(AreaChoosenContext);
    const [position, setPosition] = useState(1);

      const rollDoneCallback = async (num) => {
        setdiceNumber(num)
      }

    useEffect(() => {
        if(areaChoosen.length !== 0) {
        console.log(areaChoosen);
         // Récupération de la route et de sa position pour ensuite afficher le robot
         const getRobotArea = async () => {

                 try {
                    console.log(areaChoosen);
                    
                const response = await fetch(
                    `${ipConfig}/api/positions/${areaChoosen}/${position}`, {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',  
                        },
                    });

                    const json = await response.json();
                    console.log(json);
                    setRobotArea(json);
 
            } catch (error) {
              console.error(error);
            }
            
          };
          getRobotArea();
        }
        
    }, [areaChoosen]);

    
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
                rollDone={rollDoneCallback}
                />
                <Text style={styles.diceNumberP}> Le résultat du dé est <br />
                <Text style={styles.diceNumber}>{diceNumber}</Text> </Text>
            </View>
            
            {/* Emplacement du robot adverse */}
            <View style={styles.robotIAContainer}>
                <Image source={{uri:  `${ipConfig}/${robotArea.robot_image}`}} style={styles.card}></Image>
            </View>
        </View>
    );

   
}