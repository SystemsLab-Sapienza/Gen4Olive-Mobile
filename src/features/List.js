import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import { Item } from '../components/Item';
import { Searchbar } from 'react-native-paper';
import { Icon } from 'react-native-elements';

export const List = ({ setPage, page, previous, setPrevious, url, setInfoId, t, bankAcronym }) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(10); // Number of items to display

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
          case 'oliveListInBank':
            setData(jsonData.olives);
            break
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
        for (const synonym of item.synonyms) {
          if (synonym.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
        }
        return false;
      case 'diseaseList':
        return item.acronym.toLowerCase().includes(searchQuery.toLowerCase());
      case 'oliveListInBank':
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true;
        }
        for (const synonym of item.synonyms) {
          if (synonym.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
        }
        return false;
      default:
        return false;
    }
  }), [data, searchQuery, page]);

  const renderItem = ({ item }) => {
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
      case 'oliveListInBank':
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
      default:
        return null;
    }
  };

  const loadMoreItems = () => {
    setDisplayCount(prevCount => prevCount + 10); // Load 10 more items
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.containerImg}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => {
              setPage(previous);
              setPrevious('menu');
            }}>
            <Icon name="arrow-back" color={'white'} style={{ borderWidth: 1, borderColor: 'white', borderRadius: 20 , padding: 5}} />
          </TouchableOpacity>
          <Image source={require('../../assets/LOGO.png')} />
        </View>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: '2%', marginBottom: '2%' }}>
          {t(page === 'oliveList' || page === 'oliveListInBank' ? 'oliveVarieties' : 'germplasmBanks')}{page === 'oliveListInBank' ? ` (${bankAcronym})` : ''}
        </Text>
        <Searchbar
          placeholder={t('search')}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          data={filteredData.slice(0, displayCount)} // Display only the items to show
          renderItem={renderItem}
          keyExtractor={(item) => item.pk.toString()} // Assuming each item has a unique id
          onEndReached={loadMoreItems} // Load more items when the end is reached
          onEndReachedThreshold={0.5} // Trigger when the user is within 50% of the end
          ListFooterComponent={filteredData.length > displayCount ? (
            <ActivityIndicator size="small" color="white" />
          ) : null} // Show loading indicator at the bottom if there are more items to load
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, margin: '3%' },
  header: {
    height: 220,
    marginBottom: '5%',
    justifyContent: 'space-around',
  },
  containerImg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '5%',
  },
});

export default List;

