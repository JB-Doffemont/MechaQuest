import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '../../style/StaminaStyle';
import ipConfig from '../../../IpConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StaminaRefill(robots) {
  const [stamina, setStamina] = useState("");

  useEffect(() => {
    const getStamina = async () => {
        try {
            const response = await fetch(
                `${ipConfig}/api/robots`, {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                        Accept: 'application/json',
                        'Content-Type': 'application/json',  
                    },
                });
            
                const json = await response.json();
                console.log(json[0]);
                test6 = robots.map(({current_stam}) => {
                    return {
                      current_stam: current_stam,                      
                    };
                    
                  });
                console.log(test6);
                setStamina(json);
                

        } catch (error) {
          console.error(error);
        }
      };
    
    getStamina();

}, []);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStamina((prevStamina) => prevStamina + 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

  return (

    <View> 
        <Text style={styles.stamina}>Stamina: {stamina}</Text>
    </View>
   
  );
}