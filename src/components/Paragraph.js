import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

export const Paragraph = ({ info, api }) => {
  let sectionTitle = '';
  let sectionData = [];
  const descriptions = {
    "xylella_fastidiosa": '1 - highly tolerant; 5 - highly susceptible; N.D - no data.',
    "verticillium": '1 - highly tolerant; 5 - highly susceptible; N.D - no data.',
    "olive_scab": '1 - highly tolerant; 5 - highly susceptible; N.D - no data.',
    "olive_cercosporiose": '1 - highly tolerant; 5 - highly susceptible; N.D - no data.',
    "olive_anthracnose": '1 - highly tolerant; 5 - highly susceptible; N.D - no data.',
    "olive_fly": '1 - highly tolerant; 5 - highly susceptible; N.D - no data.',
    "fatty_acid_profile": '1 - highly tolerant; 5 - highly susceptible; N.D - no data.',
    "phenolic_profile": '1 - highly tolerant; 5 - highly susceptible; N.D - no data.',
    "volatile_profile_green_notes": '1 - Light green hints (e.g., almond, apple); 5 - Strong and dominant green sensations (e.g., artichoke, olive leaf)',
    "volatile_profile_fruit_intensity": '1 - soft and subtle fruitiness; 5 - very aromatic, robust fruitiness',
    "oil_yield": '1 - low oil content; 5 - high oil content; N.D. - no data.',
    "tree_vigour": 'Weak, Medium, Strong',
    "tree_growth_habit": 'Upright, Spreading, Drooping',
    "tree_density": 'Dense, Medium, Sparse',
    "flowering_load": '1 - low flowering load; 5 - high flowering load; N.D - no data.',
    "fruit_load": '1 - low fruit load; 5 - high fruit load; N.D - no data.',
    "fruit_detachment_resistance": '1 - low fruit detachment resistance ; 5 - high fruit detachment resistance; N.D - no data.',
    "fruit_average_weight": '1 - low fruit weight ; 5 - high fruit weight; N.D - no data.',
    "budburst_time": '1 - early budburst; 5 - late budburst; N.D. - no data.',
    "flowering_time": '1 - early flowering; 5 - late flowering; N.D. - no data.',
    "ripening_time": '1 - early ripening; 5 - late ripening; N.D. - no data.',
    "cold_tolerance": '1 -  highly tolerant; 5 - highly susceptible; N.D - no data.',
    "drought_tolerance": '1 -  highly tolerant; 5 - highly susceptible; N.D - no data.',
    "fruit_volume": '1 - low fruit volume; 5 - high fruit volume; N.D. - no data.',
    "fruit_width": '1 - low fruit width; 5 - high fruit width; N.D. - no data.',
    "fruit_length": '1 - low fruit length; 5 - high fruit length; N.D. - no data.',
    "fruit_bruising_index": '1 - low fruit bruising index; 5 - high fruit bruising index; N.D. - no data.',
    "fruit_shape_index": '1 - low fruit shape index; 5 - high fruit shape index; N.D. - no data. The shape index is calculated as the ratio between the length and width (mm).',
    "fruit_symmetry": 'Symmetric, Slightly Asymmetrical, Asymmetrical',
  };

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
                setCurrentDescription(descriptions[key]);
                setModalVisible(true);
              }}
            >
              <Icon name='info' color='darkgreen' size={25} style={{ marginTop: 5 }} />
            </TouchableHighlight>

            <Text style={styles.key}>{key}</Text>
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