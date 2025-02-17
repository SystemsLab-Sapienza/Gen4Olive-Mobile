import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { MenuButton } from '../components/MenuButton';
import { Linking } from 'react-native';

export const Menu = ({ setPage, page, setPrevious, setUrl, endpoints, t }) => {
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const menuItems = [
    { text: t('oliveVarieties'), img: require('../../assets/Olive.png'), page: 'oliveList', url: endpoints.olives },
    { text: t('germplasmBanks'), img: require('../../assets/Bank.png'), page: 'diseaseList', url: endpoints.banks },
    { text: t('oliveDetection'), img: require('../../assets/Camera.png'), page: 'oliveDet' },
    { text: t('diseaseDetection'), img: require('../../assets/Camera.png'), page: 'diseaseDet' }
  ];

  const handleMenuItemPress = (menuItem) => {
    setPage(menuItem.page);
    setPrevious(page);
    if (menuItem.url) {
      setUrl(menuItem.url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image source={require('../../assets/LOGO.png')} />
      </View>
      <View style={styles.menuButtons}>
        {menuItems.map((menuItem, index) => (
          <MenuButton
            key={index}
            text={menuItem.text}
            img={menuItem.img}
            onPress={() => handleMenuItemPress(menuItem)}
          />
        ))}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.footnote}>
          <Text style={styles.footnoteText}>{t('footnoteTitle')}</Text>
        </TouchableOpacity>
      </View>
      

      {/* Modal for Credits and Licenses */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{t('footnoteTitle')}</Text>
            <Image source={require('../../assets/europe_flag.jpg')} style={{ resizeMode: 'contain', width: '100%', height: 40, marginBottom: "2%" }} />
            <TouchableOpacity onPress={() => Linking.openURL('https://cordis.europa.eu/project/id/101000427/results')}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.text}>{t('footnoteMessage')}</Text>
              </View>
            </TouchableOpacity>

              <TouchableOpacity onPress={() => Linking.openURL('https://creativecommons.org/licenses/by-nc-nd/4.0')}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image 
                    source={require('../../assets/cc_license.jpg')} 
                    style={{ resizeMode: 'contain', width: '100%', height: 40, marginBottom: "10%" }} 
                  />
                </View>
              </TouchableOpacity>
            <Button title={t('close')} onPress={() => setModalVisible(false)} color={'#5F5F2E'} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtons: {
    flex: 0.35,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footnote: {
    marginTop: 20,
    alignItems: 'center',
  },
  footnoteText: {
    marginTop: "10%",
    color: 'white',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: "10%",
  },
  text: {
    marginBottom: "3%",
    textDecorationLine: 'underline',
    textDecorationColor: 'blue',
    color: 'blue',
    textAlign: 'center'
  },
});

export default Menu;
