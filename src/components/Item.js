import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';

export const Item = ({ img, title, caption, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.cardImg}>
          <Image source={img} style={styles.img} />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.caption}>{caption}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    height: 75,
    marginBottom: '2%',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '2%',
  },
  cardImg: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  img: {
    borderRadius: 10,
  },
  cardText: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
  },
});



export default Item;
