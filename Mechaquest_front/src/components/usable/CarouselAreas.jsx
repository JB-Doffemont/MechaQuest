import React, { useCallback, memo, useRef, useState} from "react";
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


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


export default function Carousel({areas}) {
const [index, setIndex] = useState(0);


// const robotChoice = async(robot_name) => {
  
//   try {
//       const response = await fetch(`${ipConfig}/api/duplicate/${robot_name}`, {
//           // portable 4G http://172.20.10.7:8000/api/register
//           // Local host ordi: http://127.0.0.1:8000/api/duplicate
//           // http://192.168.43.192:8000
          
//           method: 'POST',
//           headers: {
//               "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
//               Accept: 'application/json',
//               'Content-Type': 'application/json',  
//           },
          
//         });

//       const json = await response.json();
//       console.log(json);
      
//       if (json.status_code == 200) {
//         console.log('Test');
//         navigation.navigate('HomeScreen');
//       } 
//   } catch (error) {
//       console.error(error);
//   } 
// }

const Slide = memo(function Slide({ data}) {
  
  return (
    
    <View style={styles.slide}>
        <View style={styles.containerTop}>
            <Image source={{ uri: data.image }} ></Image>
            <Text style={styles.title}>{data.title}</Text>
        </View>
      
      <View style={styles.containerBottom}>
        
        <Text style={styles.slideDescription}>{data.description}</Text>
        <Text style={styles.slideDescription}>{data.number_of_battle}</Text>
        <Text style={styles.slideDescription}>{data.reward}</Text>
        <Text style={styles.slideDescription}>{data.required_stam}</Text>
        {/* <ButtonRequest style={styles.slideButton} buttonLabel="Selectionner robot" 
 method={() => robotChoice(data.title)}/> */}
      </View>

    </View>
    
  );
});
  
  const indexRef = useRef(index);
  indexRef.current = index;
  
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

