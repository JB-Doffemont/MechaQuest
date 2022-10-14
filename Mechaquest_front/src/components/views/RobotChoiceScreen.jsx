import { useEffect } from "react";
import React, { useState } from "react";
import Carousel from "../usable/Carousel";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ipConfig from "../../../IpConfig";

import { View, Text } from "react-native";

export default function RobotChoice() {
    const [robots, setRobots] = useState([]);
  
    useEffect(() => {
        const getRobots = async () => {
            try {
            const userEmail = await AsyncStorage.getItem('email');
            console.log(userEmail);
            

                const response = await fetch(
                    `${ipConfig}/api/robots`, {
                      // http://127.0.0.1:8000/api/robots
                      // http://192.168.43.192:8000/api/users/${userEmail}
                        method: 'GET',
                     
                        headers: {
                            "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',  
                        },
                    });
                
                    const json = await response.json();
                    console.log(json);
                    setRobots(json);
   
            } catch (error) {
              console.error(error);
            }
          };
        
        getRobots();

    }, []);

    return (
        <View>
                    <Text style={{color: "white", backgroundColor: "#020829", textAlign:"center", fontSize:18, fontWeight: "bold"}}>
                        CHOIX DU ROBOT
                    </Text>
        <View>
            <Carousel robots={robots} />
        </View>
       
        </View>
    );
}
