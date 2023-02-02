// Ecran qui présente le jeu à un nouveau joueur: lore général suivi du tutoriel 

import { View, ScrollView, Text, Image } from "react-native";
import styles from "../../style/IntroScreenStyle";
import Button from "../usable/ButtonRedirect";
import heroeschoice from "../../assets/MechaQuest_heroes.png";

export default function IntroScreen() {
    return (
        <View style={styles.container}>
            <Text style={{color:"white"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. 
            </Text>
            <Image source={heroeschoice} style={styles.heroeschoice}/>
            <Button
            buttonLabel="Choisir!"
            route="RobotChoiceScreen"
            />
        </View>
    );
}