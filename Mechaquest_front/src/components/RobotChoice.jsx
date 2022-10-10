import { useEffect } from "react";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Image, Text } from "react-native";


export default function RobotChoice() {
    const [robots, setRobots] = useState([]);
  
    

    useEffect(() => {
        const getRobots = async () => {
            try {
            const userEmail = await AsyncStorage.getItem('email');
            console.log(userEmail);
            const token = await AsyncStorage.getItem('access_token');
            console.log(token);

             
                const response = await fetch(
                    'http://192.168.43.192:8000/api/robots', {
                      // http://127.0.0.1:8000/api/users/${userEmail}
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

                <Text>
                    <Text>
                        
                            Choix des robots
                        
                    </Text>
                </Text>
            
            {robots.map(({robot, id,robot_name, robot_image}, index) => (
                <View key={index}>
                    <Text>{robot_name}</Text>
                    <Image
                     style={{
                        width: 100,
                        height: 150,
                        resizeMode: 'contain'
                      }}
                    // source={{uri: 'assets:/robotCards/MQ_Samos_card.png'}}
                    source={require(`${robot_image}`)} 
                    />
                </View>
            ))}
            
        </View>
    );
}