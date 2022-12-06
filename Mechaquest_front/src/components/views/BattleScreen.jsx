// Ecran affichant le combat de robot du joueur contre un ordinateur

import React, { useState } from "react";
import ipConfig from "../../../IpConfig";
import { View, Image, Text } from "react-native";
import { useEffect, useContext } from "react";
import styles from "../../style/BattleScreenStyle";
import MechaQuestDice from "../usable/MechaQuestDice";
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

    useEffect(() => {
        if(areaChoosen.length !== 0) {
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

    console.log(mainRobot);
    return(
        <View style={styles.container}>
            {/* Emplacement pour le robot du joueur */}
            <View style={styles.robotPlayerContainer}>
                <Image source={{uri:  `${ipConfig}/${mainRobot.robot_image}`}} style={styles.card}></Image>
                <View>
                    <Text style={styles.text}> HP : {mainRobot.current_hp} </Text>
                    <Text style={styles.text}> Atk : {mainRobot.current_atk} </Text>
                    <Text style={styles.text}> Def : {mainRobot.current_def} </Text>
                </View>
            </View>

            {/* Affichage du dé */}
            <MechaQuestDice />
           
            {/* Emplacement du robot adverse */}
            <View style={styles.robotIAContainer}>
                <Image source={{uri:  `${ipConfig}/${robotArea.robot_image}`}} style={styles.card}></Image>
                <View>
                    <Text style={styles.text}> HP : {robotArea.current_hp} </Text>
                    <Text style={styles.text}> Atk : {robotArea.current_atk} </Text>
                    <Text style={styles.text}> Def : {robotArea.current_def} </Text>
                </View>
                
            </View>
        </View>
    );

}