import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export const Icon = ({ img, caption, onPress }) => {
  return (
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <Image source={img} style={styles.img} />
      <Text style={styles.caption}>{caption}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  caption: {
    marginTop: '15%',
  },
  img: {
    marginTop: '15%',
  },
});
