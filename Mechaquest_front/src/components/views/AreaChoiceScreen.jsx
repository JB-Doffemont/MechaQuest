// Ecran de choix du stage avant de lancer une partie

import { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import styles from "../../style/AreaChoiceScreenStyle";
import ipConfig from "../../../IpConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CarouselAreas from "../usable/CarouselAreas";
import { MainRobotContext } from "../../lib/MainRobotContext";



// Récupération des arenes en BDD
export default function AreaChoiceScreen() {

    // On utilise le context pour stocker la valeur de mainRobot
    const {setMainRobot} = useContext(MainRobotContext);
    const [areas, setAreas] = useState([]);
    

    useEffect(() => {
        const getAreas = async () => {
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
        
        getAreas();

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

    }, []);


    return (
        <View>
            <View>
                {/* Utilisation du Carousel pour permettre à l'utilisateur un choix dynamique du stage */}
                <CarouselAreas areas={areas}/>
            </View>
        </View>
    );
}