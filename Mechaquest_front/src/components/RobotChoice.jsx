import { useEffect } from "react";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View } from "react-native";


export default function RobotChoice() {
    const [robot, setRobot] = useState([]);
    

    useEffect(() => {
        const getRobots = async () => {
            try {
            const userEmail = await AsyncStorage.getItem('email');
            console.log(userEmail);
            const token = await AsyncStorage.getItem('access_token');
            console.log(token + 2);

             
                const response = await fetch(
                    'http://192.168.43.192:8000/api/robots', {
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
                    setRobot(json);
                    
                
            } catch (error) {
              console.error(error);
            }
          };
        
        getRobots();

    }, []);

    return (
        <View>
        </View>
    );
}