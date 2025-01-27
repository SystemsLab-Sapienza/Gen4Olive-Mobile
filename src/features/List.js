import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Item } from '../components/Item';
import { Searchbar } from 'react-native-paper';

export const List = ({ setPage, page, previous, setPrevious, url }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  const filteredData = data.filter((olive) =>
    olive.olive.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = (olive) => (
    <Item
      key={olive.id} // Assuming each olive has a unique id
      img={require('../../assets/OliveImg.png')}
      title={olive.olive}
      caption={olive.text}
      onPress={() => {
        setPrevious(page);
        setPage(page === 'oliveList' ? 'infoOlive' : 'infoDisease');
      }}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/LOGO.png')} />
        <TouchableOpacity
          onPress={() => {
            setPage(previous);
            setPrevious('menu');
          }}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => {
              setPage(previous);
              setPrevious('menu');
            }}>
            <Image source={require('../../assets/Arrow.png')} />
          </TouchableOpacity>
        </TouchableOpacity>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      {filteredData.map(renderItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, margin: '2%' },
  header: {
    marginTop: '6%',
    height: 200,
    marginBottom: '6%',
    justifyContent: 'space-around',
  },
});
