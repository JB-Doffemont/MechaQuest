import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '../../style/StaminaStyle';

export default function StaminaRefill() {
  const [stamina, setStamina] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStamina((prevStamina) => prevStamina + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (

    <View> 
        <Text style={styles.stamina}>Stamina: {stamina}</Text>
    </View>
   
  );
}