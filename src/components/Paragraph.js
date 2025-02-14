import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

export const Paragraph = ({ info, api, t }) => {
  let sectionTitle = '';
  let sectionData = [];

  function getTranslation(key) {
    const keys = key.split('_');
    let translation = keys[0];
    for (let i = 1; i < keys.length; i++) {
      translation += keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
    }
    return t(translation);
  }

  // Determine the section title and data based on the info prop
  switch (info) {
    case 'pest_and_disease':
      sectionTitle = getTranslation('pest_and_disease');
      sectionData = Object.entries(api.pest_and_disease);
      break;
    case 'olive_yield':
      sectionTitle = getTranslation('olive_yield');
      sectionData = Object.entries(api.olive_yield);
      break;
    case 'agronomic_traits':
      sectionTitle = getTranslation('agronomic_traits');
      sectionData = Object.entries(api.agronomic_traits);
      break;
    case 'phenological_process':
      sectionTitle = getTranslation('phenological_process');
      sectionData = Object.entries(api.phenological_process);
      break;
    case 'climate_adaptability':
      sectionTitle = getTranslation('climate_adaptability');
      sectionData = Object.entries(api.climate_adaptability);
      break;
    case 'olive_fruit_aptitude':
      sectionTitle = getTranslation('olive_fruit_aptitude');
      sectionData = Object.entries(api.olive_fruit_aptitude);
      break;
    default:
      break;
  }

  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentDescription, setCurrentDescription] = React.useState('');

  const renderButtons = (selectedFraction) => {
    const buttons = [];
    for (let i = 1; i <= 5; i++) {
      buttons.push(
        <View
          key={i}
          style={[
            styles.button,
            { backgroundColor: i <= selectedFraction ? 'darkgreen' : '#e0e0e0' },
          ]}
        />
      );
    }
    return buttons;
  };

  return (
    <View style={{ marginBottom: '5%' }}>
      <Text style={styles.paragraphTitle}>{sectionTitle}</Text>
      <View style={styles.container}>
        {sectionData.map(([key, value]) => (
          <View key={key} style={{ flexDirection: 'row', marginBottom: 3, marginTop: 3, alignItems: 'center' }}>
            <TouchableHighlight
              style={styles.touchable}
              onPress={() => {
                setCurrentDescription(t(getTranslation(key+'_description')));
                setModalVisible(true);
              }}
            >
              <Icon name='info' color='darkgreen' size={25} style={{ marginTop: 5 }} />
            </TouchableHighlight>

            <Text style={styles.key}>{getTranslation(key)}</Text>
            {value.constructor !== Number || value <= 0 || value > 5 ?
              <Text style={styles.value}>{value === 0 ? 'N.D.' : value}</Text>
              : 
              <View style={[styles.value, { flexDirection: 'row' }]}>
                {renderButtons(value)}
              </View>
            }
          </View>
        ))}
      </View>

      {/* Modal for displaying the tooltip */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{currentDescription}</Text>
                {/* <Pressable
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>  x  </Text>
                </Pressable> */}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  paragraphTitle: {
    fontSize: 25,
    textAlign: 'center',
    margin: '5%',
    fontWeight: 'bold',
    color: '#a87c04',
  },
  key: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 10,
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
  container: {
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: '#f6f6f6',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'darkgreen',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Set a width for the modal
  },
  modalText: {
    textAlign: 'center',
  },
  // buttonClose: {
  //   backgroundColor: 'darkgreen',
  //   padding: 5, // Increase padding for a larger button
  //   borderRadius: 5, // Add border radius for rounded corners
  // },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});