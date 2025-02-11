import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const Paragraph = ({ info, api }) => {
  let sectionTitle = '';
  let sectionData = [];

  // Determine the section title and data based on the info prop
  switch (info) {
    case 'pest_and_disease':
      sectionTitle = 'Tolerance to Pests and Diseases';
      sectionData = Object.entries(api.pest_and_disease);
      break;
    case 'olive_yield':
      sectionTitle = 'Olive Oil Yield and Quality';
      sectionData = Object.entries(api.olive_yield);
      break;
    case 'agronomic_traits':
      sectionTitle = 'Agronomic Traits';
      sectionData = Object.entries(api.agronomic_traits);
      break;
    case 'phenological_process':
      sectionTitle = 'Phenological Process Evaluation';
      sectionData = Object.entries(api.phenological_process);
      break;
    case 'climate_adaptability':
      sectionTitle = 'Adaptability to Climate';
      sectionData = Object.entries(api.climate_adaptability);
      break;
    case 'olive_fruit_aptitude':
      sectionTitle = 'Table Olive Aptitude';
      sectionData = Object.entries(api.olive_fruit_aptitude);
      break;
    default:
      break;
  }

  const renderButtons = (selectedFraction) => {
    const buttons = [];
    for (let i = 1; i <= 5; i++) {
      buttons.push(
        <View
          key={i}
          style={[
            styles.button,
            { backgroundColor: i <= selectedFraction ? 'green' : '#e0e0e0' },
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
      <View style={{ marginLeft: '5%', marginRight: '5%', backgroundColor: '#f6f6f6', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'green' }}>
        {sectionData.map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.key}>{key}:</Text>
            {value.constructor !== Number || value <= 0 || value > 5 ?
              <Text style={styles.value}>{value === 0 ? 'N.D.' : value}</Text>
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