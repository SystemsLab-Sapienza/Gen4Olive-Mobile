import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from '../components/Icon';

export const Sections = ({ page, setInfo }) => {
  const iconsData = [
    { caption: 'Tolerance to Pests and Diseases', img: require('../../assets/BioticsColored.png'), info: 'pest_and_disease' },
    { caption: 'Olive Oil Yield and Quality', img: require('../../assets/OilColored.png'), info: 'olive_yield' },
    { caption: 'Agronomic Traits', img: require('../../assets/TreeColored.png'), info: 'agronomic_traits' },
    { caption: 'Phenological Process Evaluation', img: require('../../assets/ProductivityColored.png'), info: 'phenological_process' },
    { caption: 'Adaptability to Climate', img: require('../../assets/AbioticsColored.png'), info: 'climate_adaptability' },
    { caption: 'Table Olive Aptitude', img: require('../../assets/FruitColored.png'), info: 'olive_fruit_aptitude' },
  ];

  // Split icons into two arrays, each representing a row
  const iconsRows = [iconsData.slice(0, 3), iconsData.slice(3)];

  return (
    <View style={styles.container}>
      {iconsRows.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((item, idx) => (
            <View key={idx} style={styles.iconContainer}>
              <Icon
                img={item.img}
                onPress={() => setInfo(item.info)}
              />
              <Text style={styles.text}>{item.caption}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:'10%',
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    width:'25%'
  },
  text: {
    marginTop: 5,
  },
});
