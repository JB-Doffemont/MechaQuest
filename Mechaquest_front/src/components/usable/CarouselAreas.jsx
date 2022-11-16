// Ce carousel permet de selectionner la planete sur laquelle on veut lancer une partie

import React, { useCallback, memo, useRef, useState, useEffect, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  Image,
} from "react-native";
import ButtonRequest from "../usable/ButtonRequest";
import styles from "../../style/CarouselAreasStyle";
import ipConfig from "../../../IpConfig";
import { MainRobotContext } from "../../lib/MainRobotContext";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window"); // Obtention de la taille de l'écran pour un CSS responsive

export default function CarouselAreas({areas}) {
const [index, setIndex] = useState(0);



// const [idRobot, setIdRobot] = useState(mainRobot);

//   useEffect(() => {
//     if (mainRobot) {
//       setIdRobot(mainRobot);
//     }
//   }, [mainRobot]);
//   console.log(mainRobot);
//   console.log(idRobot);


const areaChoice = async () => {
 
  try {
    
      const response = await fetch(
          `${ipConfig}/api/robots/${idRobot}`, {
              method: 'PUT',
              headers: {
                  "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                  Accept: 'application/json',
                  'Content-Type': 'application/json',  
              },
              body: JSON.stringify({
                current_stam: 5
              })
          });
          
          const json = await response.json();
          console.log(json);
  } catch (error) {
    console.error(error);
  }
};


// Affichage du slide avec les datas voulues (image, nom de la route...)
const Slide = memo(function Slide({ data }) {
  const {mainRobot} = useContext(MainRobotContext);
  console.log(mainRobot);
  return (
    <View style={styles.slide}>
        <View style={styles.containerTop}>
            <Image style={styles.slideImage} source={{ uri: data.image }} ></Image>
            <Text style={styles.title}>{data.title}</Text>
        </View>
      <View style={styles.containerBottom}>
        <View style={styles.bottomLeft}>
          <Text style={styles.slideDescription}>{data.description}</Text>
        </View>
        <View style={styles.bottomRight}>
          <Text style={styles.slideText}>Nombre de combats : {data.number_of_battle}</Text>
          <Text style={styles.slideText}>Récompense en or : {data.reward}</Text>
          <Text style={styles.slideText}>Stamina requise : {data.required_stam}</Text>
          <Text style={styles.slideText}>Main robot : {mainRobot.id}</Text>

          <ButtonRequest style={styles.slideButton} buttonLabel="Commencer aventure"  method={() => areaChoice()}/>
        </View>
        {/* <ButtonRequest style={styles.slideButton} buttonLabel="Selectionner robot" 
 method={() => robotChoice(data.title)}/> */}
      </View>
    </View>
  );
});
  
  // Index servant à la pagination 
  const indexRef = useRef(index);
  indexRef.current = index;
  
    // On stock les datas voulues pour le choix du niveau (id, image, stamina nécessaire pour lancer une partie...)
    const slideList = areas.map(({menu_background, number_of_battle, required_stam, reward, name, description}) => {
    return {
      id: name,
      image: `${ipConfig}/${menu_background}`,
      number_of_battle: number_of_battle,
      required_stam: required_stam,
      reward: reward,
      title: name,
      description: description,
    };
  });

  // Pagination pour savoir sur quel slide on se situe via un Dot (petit rond en bas de l'écran de téléphone)
  function Pagination({ index }) {
    return (
      <View style={styles.pagination} pointerEvents="none">
        {slideList.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                index === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
      </View>
    );
  }

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  // Différentes valeurs à toucher pour modifier le rendu
  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  // Permet l'affichage de notre slide
  const renderItem = useCallback(function renderItem({ item }) {
    return <Slide data={item} />;
  }, []);

  return (
    <>
    
      <FlatList
        data={slideList}
        
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={areas}></Pagination>
    </>
  );
}

