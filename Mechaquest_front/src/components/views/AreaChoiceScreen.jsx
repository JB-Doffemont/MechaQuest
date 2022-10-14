import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../../style/StarterScreenStyle";
import ipConfig from "../../../IpConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StaminaRefill from "../usable/StaminaRefill";

export default function AreaChoiceScreen() {
    console.log(ipConfig);
    const [areas, setAreas] = useState([]);

    
    useEffect(() => {
        const getAreas = async () => {
            try {
                const response = await fetch(
                    `${ipConfig}/api/areas`, {
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
                    setAreas(json);
   
            } catch (error) {
              console.error(error);
            }
          };
        
        getAreas();

    }, []);

    return (
        <View style={styles.container}>
            <View>
                <StaminaRefill />
            </View>
            <View>
                
            </View>
        </View>
    );
}