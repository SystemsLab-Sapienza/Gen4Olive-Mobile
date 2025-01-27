import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MenuButton } from '../components/MenuButton';

const menuItems = [
  { text: 'Olive', img: require('../../assets/Olive.png'), page: 'oliveList', url: 'https://649020861e6aa71680caa7bf.mockapi.io/gen4olive/listolives' },
  { text: 'Disease', img: require('../../assets/Medicine.png'), page: 'diseaseList', url: 'https://649020861e6aa71680caa7bf.mockapi.io/gen4olive/listolives' },
  { text: 'Olive Detection', img: require('../../assets/Camera.png'), page: 'oliveDet' },
  { text: 'Disease Detection', img: require('../../assets/Camera.png'), page: 'diseaseDet' }
];

export const Menu = ({ setPage, page, setPrevious, setUrl }) => {
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
      </View>
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
});