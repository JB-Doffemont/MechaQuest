import { useEffect } from "react";
import React, { useState } from "react";
import Carousel from "../usable/Carousel";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text } from "react-native";

export default function RobotChoice(navigation) {
    const [robots, setRobots] = useState([]);
  
    useEffect(() => {
        const getRobots = async () => {
            try {
            const userEmail = await AsyncStorage.getItem('email');
            console.log(userEmail);
            const token = await AsyncStorage.getItem('access_token');
            console.log(token);

             
                const response = await fetch(
                    ' http://127.0.0.1:8000/api/robots', {
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
    // navigator.navigation.navigate('HomeScreen');


    return (
        <View>
                    <Text style={{color: "white", backgroundColor: "#020829", textAlign:"center", fontSize:18, fontWeight: "bold"}}>
                        CHOIX DU ROBOT
                    </Text>
        <View>
            <Carousel robots={robots} navigation={navigation} />
        </View>
       
        </View>
    );
}
