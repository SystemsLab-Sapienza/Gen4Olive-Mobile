import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { Sections } from '../components/Sections';
import { Paragraph } from '../components/Paragraph';

export const Info = ({ setPage, page, previous, setPrevious }) => {
  const [info, setInfo] = useState('description');
  const [api, setApi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://649020861e6aa71680caa7bf.mockapi.io/gen4olive/olive');
        const data = await response.json();
        setApi(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerImg}>
        <Image source={require('../../assets/OliveImgBig.png')} style={styles.img} />
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            setPage(previous);
            setPrevious('menu');
          }}>
          <Image source={require('../../assets/Arrow.png')} />
        </TouchableOpacity>
      </View>
      {api && (
        <View style={styles.header}>
          <View style={styles.nameImg}>
            <Text style={styles.name}>{api.name}</Text>
            <View style={styles.location}>
              <Image source={require('../../assets/Location.png')} />
              <Text>{api.country_of_origin}</Text>
            </View>
          </View>
          <Image source={require('../../assets/LOGO2.png')} />
        </View>
      )}
      <Sections page={page} setInfo={setInfo} />
      {api && <Paragraph info={info} api={api} />}
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
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    resizeMode: 'cover',
  },
  arrow: {
    position: 'absolute',
    left: '5%',
    top: '15%',
  },
  header: {
    flex: 0.075,
    alignItems: 'center',
    margin: '5%',
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
