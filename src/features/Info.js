import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { Sections } from '../components/Sections';
import { Paragraph } from '../components/Paragraph';

export const Info = ({ setPage, page, previous, setPrevious, infoId }) => {
  const [info, setInfo] = useState('pest_and_disease');
  const [api, setApi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var url;
        switch (page) {
          case 'infoOlive':
            url = `https://gen4olive-backend.vercel.app/api/mobile/olive?pk=${infoId}`;
            break;
          case 'infoDisease':
            url = `https://gen4olive-backend.vercel.app/api/mobile/germplasmbank?pk=${infoId}`;
            break;
          default:
            break;
        }
        const response = await fetch(url);
        const data = await response.json();
        setApi(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page, infoId]);

  const oliveInfo = useMemo(() => {
    if (api === null) {
      return null;
    }
    return (
      <>
        <View style={styles.header}>
          <View style={styles.nameImg}>
            <Text style={styles.name}>{api.name}</Text>
            <View style={styles.location}>
              <Image source={require('../../assets/Location.png')} />
              <Text>{' '}</Text>
              <Text>{api.origin_country}</Text>
            </View>
            <Text>{'Synonyms: ' + api.synonyms.join(', ')}</Text>
            <Text>{'Homonyms: ' + api.homonyms.join(', ')}</Text>
          </View>
        </View>
        <Sections page={page} setInfo={setInfo} info={info} />
        <Paragraph info={info} api={api} /> 
      </>
    );
  }, [api, info, page, setInfo]);


  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerImg}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            setPage(previous);
            setPrevious('menu');
          }}>
          <Image source={require('../../assets/Arrow.png')} />
        </TouchableOpacity>
        <Image source={require('../../assets/LOGO2.png')} />
      </View>
      { page === 'infoOlive' ? oliveInfo : null }
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: 'white',
  },
  containerImg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginTop: '5%',
  },
  img: {
    resizeMode: 'cover',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginLeft: '5%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nameImg: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  location: {
    flexDirection: 'row',
    marginTop:'5%'
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'grey',
  },
  
});

export default Info;
