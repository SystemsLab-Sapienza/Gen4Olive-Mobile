import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

export const Sections = ({ page, setInfo, info, usability, t }) => {
  const iconsData = [
    { caption: t('pestAndDisease'), img: require('../../assets/BioticsColored.png'), info: 'pest_and_disease' },
    { caption: t('oliveYield'), img: require('../../assets/OilColored.png'), info: 'olive_yield' },
    { caption: t('agronomicTraits'), img: require('../../assets/TreeColored.png'), info: 'agronomic_traits' },
    { caption: t('phenologicalProcess'), img: require('../../assets/ProductivityColored.png'), info: 'phenological_process' },
    { caption: t('climateAdaptability'), img: require('../../assets/AbioticsColored.png'), info: 'climate_adaptability' },
    { caption: t('oliveFruitAptitude'), img: require('../../assets/FruitColored.png'), info: 'olive_fruit_aptitude' },
  ];

  // Split icons into two arrays, each representing a row
  const iconsRows = [iconsData.slice(0, 3), iconsData.slice(3)];
  
  const hedgeCase = (usability, key) => {
    if (usability === 'Oil Cultivar' && key === 'olive_fruit_aptitude') {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      {iconsRows.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((item, idx) => (
            <View key={idx} style={styles.iconContainer}>
              <TouchableOpacity onPress={() => setInfo(item.info)} disabled={hedgeCase(usability, item.info)} style={{opacity: hedgeCase(usability, item.info) ? 0.5 : 1}}>
                <Image source={item.img} style={info === item.info ? { borderWidth: 1, borderColor: 'darkgreen', borderRadius: 10 } : {borderRadius: 10}} />
              </TouchableOpacity>
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '1%',
  },
  iconContainer: {
    alignItems: 'center',
    width:'25%',
  },
  text: {
    textAlign: 'center',
  },
});
