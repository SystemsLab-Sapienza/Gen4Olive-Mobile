import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const Paragraph = ({ info, api }) => {
  let sectionTitle = '';
  let sectionData = [];

  // Determine the section title and data based on the info prop
  switch (info) {
    case 'description':
      sectionTitle = 'Description';
      sectionData = Object.entries(api).filter(([key, value]) => typeof value !== 'object');
      break;
    case 'productivity':
      sectionTitle = 'Productivity';
      sectionData = Object.entries(api.productivity);
      break;
    case 'biotics':
      sectionTitle = 'Biotics';
      sectionData = Object.entries(api.biotics);
      break;
    case 'abiotics':
      sectionTitle = 'Abiotics';
      sectionData = Object.entries(api.abiotics);
      break;
    case 'fruit':
      sectionTitle = 'Fruit';
      sectionData = Object.entries(api.fruit);
      break;
    case 'tree':
      sectionTitle = 'Tree';
      sectionData = Object.entries(api.tree);
      break;
    case 'blooming':
      sectionTitle = 'Blooming';
      sectionData = Object.entries(api.blooming);
      break;
    case 'oil':
      sectionTitle = 'Oil';
      sectionData = Object.entries(api.oil);
      break;
    default:
      sectionTitle = '';
      sectionData = [];
  }

  const getColor = (index, selectedFraction) => {
    if (index <= selectedFraction) {
      // Calcola il colore in base all'indice
      const red = Math.round(255 * (1 - index / 5)); // Rosso diminuisce
      const green = Math.round(200 * (index / 5)); // Verde aumenta
      const blue = 0; // Blu rimane 0
      return `rgb(${red}, ${green}, ${blue})`; // Colore dal rosso al giallo al verde
    }
    return 'gray'; // Colore grigio per i pulsanti non selezionati
  };

  const renderButtons = (selectedFraction) => {
    const buttons = [];
    for (let i = 1; i <= 5; i++) {
      buttons.push(
        <View
          key={i}
          style={[
            styles.button,
            { backgroundColor: getColor(i, selectedFraction) },
          ]}
        >
        </View>
      );
    }
    return buttons;
  };

  return (
    <View>
      <Text style={styles.paragraphTitle}>{sectionTitle}</Text>
      <View>
        {sectionData.map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.key}>{key}:</Text>
            {key !== 'country_of_origin' && key !== 'fruit_size' ? 
              <Text style={styles.value}>{value}</Text> 
            : 
            <View style={[styles.value, { flexDirection: 'row'}]}>
              {renderButtons(value)}
            </View>
            }
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paragraphTitle: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    fontWeight: 'bold',
    color: '#a87c04',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  key: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft:10
  },
  value: {
    flex: 1,
  },
  button: {
    width: 10,
    height: 10,
    margin: 1,
    borderRadius: 0,
  },
});