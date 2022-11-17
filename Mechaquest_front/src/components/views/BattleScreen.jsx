// Ecran affichant le combat de robot du joueur contre un ordinateur

import React from "react";
import { useEffect, useContext } from "react";
import { View, Image } from "react-native";
import styles from "../../style/BattleScreenStyle";
import ipConfig from "../../../IpConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainRobotContext } from "../../lib/MainRobotContext";

export default function BattleScreen() {

    // const [areas, setAreas] = useState([]);
    const {mainRobot} = useContext(MainRobotContext);

    useEffect(() => {
      
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
            <View style={styles.robotPlayerContainer}>
                <Image source={{uri:  `${ipConfig}/${mainRobot.robot_image}`}} style={styles.card}></Image>
            </View>
            <View style={styles.robotIAContainer}>
                <Image source={{uri:  `${ipConfig}/${mainRobot.robot_image}`}} style={styles.card}></Image>
            </View>
        </View>
    );
}