import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';

export const Item = ({ imgUrl, title, caption, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.container}>
        <Image source={{uri: imgUrl}} style={[{width: 50, height: 50}, styles.img]} />
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
    alignItems: 'center',},
  img: {
    borderRadius: 10,
    margin: '2%',
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