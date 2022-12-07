// Ecran affichant le combat de robot du joueur contre un ordinateur

import React, { useState } from "react";
import ipConfig from "../../../IpConfig";
import { View, Image, Button, Text } from "react-native";
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

    const [playerTurn, setPlayerTurn] = useState("");

    const mainRobotType = mainRobot.type_robot;
    const opponentRobotType = robotArea.type_robot;
    const type = ["Red", "Green", "Blue"]

    // Le typeMultiplier confère plus de dégats en fonction du type du robot (tour du joueur)
    const typeMultiplierPlayerTurn = () => {
        // Si le robot est rouge contre vert, vert contre bleu, ou bleu contre rouge: avantage
        if ((mainRobotType == type[0] && opponentRobotType == type[1]) || (mainRobotType == type[1] && opponentRobotType == type[2]) || (mainRobotType == type[2] && opponentRobotType == type[0])) {
            return 1.2;
        }
        // Si le robot est rouge contre bleu, vert contre rouge, ou bleu contre vert: désavantage
        else if ((mainRobotType == type[0] && opponentRobotType == type[2]) || (mainRobotType == type[1] && opponentRobotType == type[0]) || (mainRobotType == type[2] && opponentRobotType == type[1]) ){
            return 0.8;
        }
        // Dans les autres scénarios, type neutre donc pas de multiplicateur à appliquer
        else {
            return 1;
        }
    }

    // Le typeMultiplier confère plus de dégats en fonction du type du robot (tour de l'adversaire)
    const typeMultiplierOpponentTurn = () => {
        // Si le robot est rouge contre vert, vert contre bleu, ou bleu contre rouge: avantage
        if ((opponentRobotType == type[0] && mainRobotType == type[1]) || (opponentRobotType == type[1] && mainRobotType == type[2]) || (opponentRobotType == type[2] && mainRobotType == type[0])) {
            return 1.2;
        }
        // Si le robot est rouge contre bleu, vert contre rouge, ou bleu contre vert: désavantage
        else if ((opponentRobotType == type[0] && mainRobotType == type[2]) || (opponentRobotType == type[1] && mainRobotType == type[0]) || (opponentRobotType == type[2] && mainRobotType == type[1]) ){
            return 0.8;
        }
        // Dans les autres scénarios, type neutre donc pas de multiplicateur à appliquer
        else {
            return 1;
        }
    }
    typeMultiplierPlayerTurn();
    console.log((typeMultiplierPlayerTurn()));     
    

    // const battleDamage = () => {
    //     try {
    //           const json = response.json();
    //           setUser(json[0]);  
    //           console.log("get user", json);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    // battleDamage();

    useEffect(() => {
        if(areaChoosen.length !== 0) {
         // Récupération de la route et de sa position pour ensuite afficher le robot
         const getRobotArea = async () => {

                try {
                    
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
                <View>
                    <Text style={styles.text}> HP : {mainRobot.current_hp} </Text>
                    <Text style={styles.text}> Atk : {mainRobot.current_atk} </Text>
                    <Text style={styles.text}> Def : {mainRobot.current_def} </Text>
                </View>
            </View>

            {/* Affichage du dé */}

            <MechaQuestDice />
            <Button wrapper
                    title="Afficher le dè"
                    color="#3273a8"
                    onPress={() => console.log(MechaQuestDice.diceResult)}
                />
           
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