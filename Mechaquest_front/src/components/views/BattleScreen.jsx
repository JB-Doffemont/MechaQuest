// Ecran affichant le combat de robot du joueur contre un ordinateur

import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { View, Image, Text } from "react-native";
import styles from "../../style/BattleScreenStyle";
import ipConfig from "../../../IpConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainRobotContext } from "../../lib/MainRobotContext";
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';
import { AreaChoosenContext } from "../../lib/AreaChoosenContext";


export default function BattleScreen() {

    // const [areas, setAreas] = useState([]);
    const {mainRobot} = useContext(MainRobotContext);
    const [diceNumber, setdiceNumber] = useState("");
    const {areaChoosen} = useContext(AreaChoosenContext);

    console.log(areaChoosen);

    
      const rollDoneCallback = async (num) => {
        setdiceNumber(num)
      }
    
      console.log(diceNumber);

    useEffect(() => {

        // const getArea = async () => {
        //     try {
        //         const response =  await fetch()

        //     } catch {

        //     }
        // }
      
        // Récupération de la route et de sa position pour ensuite afficher le robot
        const getRobotArea = async () => {
            try {
                const response = await fetch(
                    `${ipConfig}/api/areas`, {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',  
                        },
                    });
                
                    const json = await response.json();
                    console.log(json);
                    setAreas(json);
                    
            } catch (error) {
              console.error(error);
            }
          };
        
        getRobotArea();
        
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
                rollDone={rollDoneCallback}
                />
                <Text style={styles.diceNumberP}> Le résultat du dé est <br />
                <Text style={styles.diceNumber}>{diceNumber}</Text> </Text>
            </View>
            
            {/* Emplacement du robot adverse */}
            <View style={styles.robotIAContainer}>
                <Image source={{uri:  `${ipConfig}/${mainRobot.robot_image}`}} style={styles.card}></Image>
            </View>
        </View>
    );

   
}