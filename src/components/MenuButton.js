import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export const MenuButton = ({ text, img, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image source={img} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({ 
  button: { 
    borderColor: '#F6F2E6',
    backgroundColor: '#F6F2E6', 
    borderRadius: 35,
    width: '85%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  text: {
    fontSize: 20,
    color: '#A27B04',
    fontWeight: 'bold',
  },
  image: {
    position: 'absolute',
    left: 10,
  },
});



export default MenuButton;
