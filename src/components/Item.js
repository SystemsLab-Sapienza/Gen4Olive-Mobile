import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';

export const Item = ({ imgUrl, title, caption, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemContent}>
        <Image source={{ uri: imgUrl }} style={styles.img} />
        <View style={styles.cardText}>
          <Text style={styles.title}>{title}</Text>
          {caption && <Text style={styles.caption}>{caption}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 75,
    marginBottom: 10,
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  cardText: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333', // Darker text for better readability
  },
  caption: {
    fontSize: 14,
    color: '#666', // Lighter text for less emphasis
  },
});

export default Item;
