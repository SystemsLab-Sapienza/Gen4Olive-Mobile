import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Item } from '../components/Item';
import { Searchbar } from 'react-native-paper';

export const List = ({ setPage, page, previous, setPrevious, url, setInfoId }) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        switch (page) {
          case 'oliveList':
            setData(jsonData.olives);
            break;
          case 'diseaseList':
            setData(jsonData.gbanks);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  const filteredData = useMemo(() => data.filter((item) => {
    switch (page) {
      case 'oliveList':
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true;
        }
        for (synonym of item.synonyms){
          if (synonym.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
        }
        return false;
      case 'diseaseList':
        return item.acronym.toLowerCase().includes(searchQuery.toLowerCase());
      default:
        return false;
    }
  }), [data, searchQuery, page]);

  const renderItem = useMemo(() => (item) => {
    switch (page) {
      case 'oliveList':
        return (
          <Item
            key={item.pk} // Assuming each olive has a unique id
            imgUrl={item.thumbnail}
            title={item.name}
            caption={item.synonyms.join(', ')}
            onPress={() => {
              setPrevious(page);
              setInfoId(item.pk);
              setPage('infoOlive');
            }}
          />
        );
      case 'diseaseList':
        return (
          <Item
            key={item.pk} 
            imgUrl={item.thumbnail}
            title={item.acronym}
            onPress={() => {
              setPrevious(page);
              setInfoId(item.pk);
              setPage('infoDisease');
            }}
          />
        );
      default:
        return null;
    }
  }, [page, setPrevious, setPage]);

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
