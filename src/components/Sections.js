import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from '../components/Icon';

export const Sections = ({ page, setInfo }) => {
  const iconsData = [
    { caption: 'Description', img: require('../../assets/DescriptionColored.png'), info: 'description' },
    { caption: 'Productivity', img: require('../../assets/ProductivityColored.png'), info: 'productivity' },
    { caption: 'Biotics', img: require('../../assets/BioticsColored.png'), info: 'biotics' },
    { caption: 'Abiotics', img: require('../../assets/AbioticsColored.png'), info: 'abiotics' },
    { caption: 'Fruit', img: require('../../assets/FruitColored.png'), info: 'fruit' },
    { caption: 'Tree', img: require('../../assets/TreeColored.png'), info: 'tree' },
    { caption: 'Blooming', img: require('../../assets/BloomingColored.png'), info: 'blooming' },
    { caption: 'Oil', img: require('../../assets/OilColored.png'), info: 'oil' },
  ];

  // Split icons into two arrays, each representing a row
  const iconsRows = [iconsData.slice(0, 4), iconsData.slice(4)];

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
