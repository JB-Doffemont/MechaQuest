// Ecran affichant le combat de robot du joueur contre un ordinateur

import React, { useState } from "react";
import ipConfig from "../../../IpConfig";
import { View, Image } from "react-native";
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

    const type = ["Red", "Green", "Blue"]
       
    

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
        console.log(areaChoosen);
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
            </View>

            {/* Affichage du dé */}
            <MechaQuestDice />
           
            {/* Emplacement du robot adverse */}
            <View style={styles.robotIAContainer}>
                <Image source={{uri:  `${ipConfig}/${robotArea.robot_image}`}} style={styles.card}></Image>
            </View>
        </View>
    );

}