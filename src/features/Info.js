import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { Sections } from '../components/Sections';
import { Paragraph } from '../components/Paragraph';
import { SocialIcon, Icon } from 'react-native-elements'
import { Linking } from 'react-native';
import { Carousel } from '../components/Carousel';
import { endpoints } from '../api';

export const Info = ({ setPage, page, previous, setPrevious, infoId, setInfoId }) => {
  const [info, setInfo] = useState('pest_and_disease');
  const [api, setApi] = useState(null);
  const [varieties, setVarieties] = useState(null);

  const fetchData = async () => {
    if (api) {
      return;
    }
    try {
      var url;
      switch (page) {
        case 'infoOlive':
          url = endpoints.olive + infoId;
          break;
        case 'infoDisease':
          url = endpoints.bank + infoId;
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

  const fetchVarieties = async () => {
    if (page !== 'infoDisease' || varieties) {
      return;
    }
    try {
      const response = await fetch(endpoints.olives);
      const data = await response.json();
      setVarieties(data.olives);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVarieties();
  }, [page, infoId, setApi, setVarieties]);

  const oliveInfo = useMemo(() => {
    if (api === null || page !== 'infoOlive') {
      return null;
    }
    return (
      <>
        <View style={styles.header}>
          <View style={styles.nameImg}>
            <Text style={styles.name}>{api.name}</Text>
            <View style={{marginTop : '5%', marginBottom: "5%"}}>
              <Text>{'Synonyms: ' + api.synonyms.join(', ')}</Text>
              <Text>{'Homonyms: ' + api.homonyms.join(', ')}</Text>
            </View>
            <View style={styles.location}>
              <Icon name='place' color='darkgreen' />
              <Text>{' '}</Text>
              <Text>{api.origin_country}</Text>
            </View>
          </View>
        </View>
        <Carousel api={api} />
        <Sections page={page} setInfo={setInfo} info={info} usability={api.usability} />
        <Paragraph info={info} api={api} /> 
      </>
    );
  }, [api, info, page, setInfo]);

  const diseaseInfo = useMemo(() => {
    if (api === null || page !== 'infoDisease' || varieties === null) {
      return null;
    }
    return (
      <>
        <View style={styles.header}>
          <View style={styles.nameImg}>
            <Text style={styles.name}>{api.name} ({api.acronym})</Text>
            <Text style={{marginTop : '5%', marginBottom: "5%"}}>{api.description}</Text>
            <View style={styles.location}>
              <Icon name='place' color='darkgreen' />
              <Text>{' '}</Text>
              <Text>{api.address}, {api.city} ({api.country})</Text>
            </View>
            <View style={styles.location}>
              <Icon name='person' color='darkgreen' />
              <Text>{' '}</Text>
              <Text>{api.contact_point}</Text>
            </View>
            <View style={styles.location}>
              <Image source={{uri: api.representative_photo_path}} style={{width: '100%', height: 200, marginTop: '5%'}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '5%'}} >
              <SocialIcon type='phone' light onPress={() => {Linking.openURL(`tel:${api.contact_point_contact}`)}} />
              <SocialIcon type='globe' light onPress={() => {Linking.openURL(api.official_website_link)}} />
              <SocialIcon type='facebook' light onPress={() => {Linking.openURL(api.facebook_link)}} />
              <SocialIcon type='twitter' light onPress={() => {Linking.openURL(api.twitter_link)}} />
              <SocialIcon type='linkedin' light onPress={() => {Linking.openURL(api.linkedin_link)}} />
            </View>
          </View>
        </View>
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'grey', marginLeft: '5%'}}>Varieties</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '5%', marginBottom: '5%'}}>
            {varieties.map((variety, index) => (
              <TouchableOpacity 
                key={index} 
                style={{width: '30%', margin: '2%', backgroundColor: '#f6f6f6', borderRadius: 5, padding: "2%", alignItems: 'center', borderWidth: 1, borderColor: 'darkgreen'}} 
                onPress={() => {
                  setPrevious('menu');
                  setPage('infoOlive');
                  setInfoId(variety.pk);
                  setApi(null);
                  fetchData();
                }}
              >
                <Image source={{uri: variety.thumbnail}} style={{width: '100%', height: 100, borderRadius: 5}} />
                <Text style={{textAlign: 'center'}}>{variety.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </>
  )}, [api, info, page, setInfo, varieties, setPrevious, setInfoId, setPage]);

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
      { page === 'infoDisease' ? diseaseInfo : null }
      
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
    marginTop: '10%',
    marginRight: '5%',
    marginLeft: '5%',
  },
  img: {
    resizeMode: 'cover',
  },
  header: {
    flex: 1,
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
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'grey',
  }
});

export default Info;
