// Composant du dé permettant de jouer à MechaQuest

import React from 'react';
import ReactDice from 'react-dice-complete';
import { View, Text, Button } from 'react-native';
import styles from "../../style/MechaQuestDiceStyle";


class MechaQuestDice extends React.Component{
    
    // Constructor pour initialiser le state du diceNumber
    constructor(props){
        super(props);
        this.state = { diceNumber: null, elementVisible: true};
    }

    // Cette fonction change le state du dé en prenant le résultat du lancer de dé
    rollDoneCallback = async (num) => {
        this.setState ({ diceNumber: num });        
      }

    // Fonction pour lancer un dé, utilisé ici au click
    rollAll = () => {
        this.reactDice.rollAll()
        // Fonction pour déclencher le dé à nouveau après un certain temps
        setTimeout(() =>{
            this.reactDice.rollAll();
          }, 5000);
      }
      
    render(){
        
        // On récupère la valeur du state que l'on fait passer via la propriété au composant BattleScreen
        this.props.setDiceResult(this.state.diceNumber);

        const elementVisible = this.state.elementVisible;
        return (
            <View style={styles.diceContainer}>
                <View>
                    {/* Opérateur ternaire pour gerer dynamiquement l'affichage */ }
                    {elementVisible == true ? 
                    <View>
                        <Text style={styles.diceNumberText}> Voici votre premier adversaire !</Text>
                        <Text style={styles.diceNumberText}> Cliquez pour déterminer qui commence en premier</Text>
                        {/* Bouton pour lancer le dé */}
                        <Button
                            title="Initiative"
                            color="#3273a8"
                            onPress={() => [this.setState({ elementVisible: false }),  this.rollAll()]}
                        /></View> : null 
                    }
                    </View>
                <View>
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
                    {/* Opérateur ternaire pour gerer dynamiquement l'affichage */ }
                    {elementVisible == false ? 
                    <View>
                    <Text style={styles.diceNumberText}> Le résultat du dé est :</Text>
                    <Text style={styles.diceNumberText}>{this.state.diceNumber}</Text>
                    </View> : null }
                </View>
            </View>
        )
    }
}
export default MechaQuestDice