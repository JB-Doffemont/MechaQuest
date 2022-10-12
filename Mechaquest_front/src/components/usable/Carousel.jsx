import React, { useCallback, memo, useRef, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import ButtonRequest from "../usable/ButtonRequest";
import styles from "../../style/CarouselStyle";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const robotChoice = async(robot_name) => {
  try {
      const response = await fetch(`http://127.0.0.1:8000/api/duplicate/${robot_name}`, {
          // portable 4G http://172.20.10.7:8000/api/register
          // Local host ordi: http://127.0.0.1:8000/api/duplicate
          // http://192.168.43.192:8000
          
          method: 'POST',
          headers: {
              "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
              Accept: 'application/json',
              'Content-Type': 'application/json',  
          },
          
        });

      const json = await response.json();
      console.log(json);
      
      if (json.status_code == 200) {
          console.log(json);
      } 
  } catch (error) {
      console.error(error);
  } 
}


const Slide = memo(function Slide({ data }) {
  return (
    
    <View style={styles.slide}>
      <Image source={{ uri: data.image }} style={styles.slideImage}></Image>
      <View style={styles.container}>
        <Text style={styles.slideTitle}>{data.title}</Text>
        <Text style={styles.slideDescription}>{data.description}</Text>
        <ButtonRequest style={styles.slideButton} buttonLabel="Selectionner robot" method={() => robotChoice(data.title)}/>
      </View>
    </View>
  );
});

export default function Carousel({robots}) {

  const [index, setIndex] = useState(0);
  
  const indexRef = useRef(index);
  indexRef.current = index;
  
    const slideList = robots.map(({id, robot_name, robot_image, description}, i) => {
    return {
      id: id,
      image: `http://127.0.0.1:8000/${robot_image}`,
        // http://192.168.43.192:8000
      // http://127.0.0.1:8000
      title: robot_name,
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
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={robots}></Pagination>
      
    </>
  );
}

