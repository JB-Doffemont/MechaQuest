// Composant qui affiche la stamina d'un robot et qui définit le temps prévu pour qu'elle se régénère

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
            // Récupération du robot de l'utilisateur 
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
                // setStamina ne marche pas encore                

        } catch (error) {
          console.error(error);
        }
      };
    
    getStamina(); 

}, []);

// Exemple: Au chargement de la page, on ajoute +1 de stamina toutes les secondes en front

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