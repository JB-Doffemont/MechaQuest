/* La logique de cette view:
- Si présence du token mais pas de robot selectionné, doit renvoyer sur le tuto puis selection du robot (if getItem !== null && 1st_co == 0)
- Si présence du token et d'un robot selectionné, doit renvoyer sur la home page du joueur (if getItem !== null && 1st_co == 1)
- Si pas de présence du token, doit renvoyer sur le "Starter Screen Unco" pour permettre de s'enregistrer ou de se connecter (if getItem == null)
 */

import React from "react";
import logo from "../assets/logo.png";
import styles from "../style/StarterScreenStyle"
import { Image, View } from "react-native";

export default function StarterScreen() {
    return(
       <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
      
   
       </View>
    );
}