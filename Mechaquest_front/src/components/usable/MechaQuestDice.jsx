// Composant du dé permettant de jouer à MechaQuest

import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from "../../style/BattleScreenStyle";
import ReactDice from 'react-dice-complete';

class MechaQuestDice extends React.Component{

    // Constructor pour initialiser le state du diceNumber
    constructor(props){
        super(props);
        this.state = { diceNumber: null};
    }

    // Cette fonction change le state du dé en prenant le résultat du lancer de dé
    rollDoneCallback = async (num) => {
        this.setState ({ diceNumber: num });        
      }

    // Fonction pour lancer un dé, utilisé ici au click
    rollAll = () => {
        this.reactDice.rollAll()
        setTimeout(() =>{
            this.reactDice.rollAll();
          }, 5000);
      }
      
    render(){
        MechaQuestDice.diceResult = this.state.diceNumber;
        return (
            <View style={styles.diceContainer}>
            <ReactDice 
                numDice={1} 
                faceColor={'#E61E1E'}
                dotColor={'#fffff'}
                // Lorsque le lancer est terminé, on appelle le callback pour renvoyer le résultat
                rollDone={this.rollDoneCallback}
                // Désactive le lancer de dé en touchant le dé, pour ne le laisser qu'au click du bouton 
                disableIndividual={true}
                ref={dice => this.reactDice = dice}
                />
                <Text style={styles.diceNumberP}> Le résultat du dé est <br />
                <Text style={styles.diceNumber}>{this.state.diceNumber}</Text> </Text>

                {/* Bouton pour lancer le dé */}
                <Button wrapper
                    title="LANCER UNE ATTAQUE"
                    color="#3273a8"
                    onPress={() => this.rollAll()}
                />
             </View>
        )
    }
}
export default MechaQuestDice