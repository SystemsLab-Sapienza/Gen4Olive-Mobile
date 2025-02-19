import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView  } from 'react-native';
import { Sections } from '../components/Sections';
import { Paragraph } from '../components/Paragraph';
import { SocialIcon, Icon } from 'react-native-elements';
import { Linking } from 'react-native';
import { Carousel } from '../components/Carousel';

export const Info = ({ setPage, page, previous, setPrevious, infoId, setInfoId, endpoints, infoIdPrev, setInfoIdPrev, t, setUrl, setBankAcronym }) => {
  const [info, setInfo] = useState('pest_and_disease');
  const [api, setApi] = useState(null);

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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [infoId, page]);

  const oliveInfo = useMemo(() => {
    if (api === null || page !== 'infoOlive') {
      return null;
    }
    return (
      <>
        <View style={styles.header}>
          <View style={styles.nameImg}>
            <Text style={styles.name}>{api.name}</Text>
            <View style={{ marginTop: '5%', marginBottom: "5%" }}>
              { api.synonyms.length > 0 && <Text style={{ marginRight: '5%' }}>{t('synonyms') + ': ' + api.synonyms.join(', ')}</Text> }
              { api.homonyms.length > 0 && <Text style={{ marginRight: '5%' }}>{t('homonyms') + ': ' + api.homonyms.join(', ')}</Text> }
            </View>
            <View style={styles.location}>
              <View>
                <Icon name='place' color='darkgreen' />
              </View>
              <View>
                <Text style={{ marginRight: '5%' }}>{api.origin_country}</Text>
              </View>
            </View>
          </View>
        </View>
        <Sections page={page} setInfo={setInfo} info={info} usability={api.usability} t={t} />
        <Paragraph info={info} api={api} t={t} />
        <Carousel api={api} t={t} />
      </>
    );
  }, [api, info, page, setInfo]);

  const diseaseInfo = useMemo(() => {
    if (api === null || page !== 'infoDisease') {
      return null;
    }
    return (
      <View>

      <View style={styles.header}>
        <View style={styles.nameImg}>
          <Text style={styles.name}>{api.name} ({api.acronym})</Text>
          <Text style={{ marginTop: '5%', marginBottom: "5%" }}>{api.description}</Text>
          <View style={styles.location}>
            <View>
              <Icon name='place' color='darkgreen' />
            </View>
            <View>
              <Text style={{ marginRight: '5%' }}>{api.address}, {api.city} ({api.country})</Text>
            </View>
          </View>
          <View style={styles.location}>
            <View>
              <Icon name='person' color='darkgreen' />
            </View>
            <View>
              <Text style={{ marginRight: '5%' }}>{api.contact_point}</Text>
            </View>
          </View>
          <View style={styles.location}>
            <Image source={{ uri: api.representative_photo_path }} style={{ width: '100%', height: 200, marginTop: '5%' }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }} >
            { api.contact_point_contact.includes('@') ? 
              api.contact_point_contact !== "NA" && <SocialIcon type='envelope' light onPress={() => { Linking.openURL(`mailto:${api.contact_point_contact}`) }} /> :
              api.contact_point_contact !== "NA" && <SocialIcon type='phone' light onPress={() => { Linking.openURL(`tel:${api.contact_point_contact}`) }} />
            }
            {api.official_website_link !== "NA" && <SocialIcon type='globe' light onPress={() => { Linking.openURL(api.official_website_link) }} />}
            {api.facebook_link !== "NA" && <SocialIcon type='facebook' light onPress={() => { Linking.openURL(api.facebook_link) }} />}
            {api.twitter_link !== "NA" && <SocialIcon type='twitter' light onPress={() => { Linking.openURL(api.twitter_link) }} />}
            {api.linkedin_link !== "NA" && <SocialIcon type='linkedin' light onPress={() => { Linking.openURL(api.linkedin_link) }} />}
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPrevious(page);
            setUrl(endpoints.olivesBank + api.pk + '/varieties');
            setBankAcronym(api.acronym);
            setPage('oliveListInBank');
            setInfoId(api.pk);
          }}>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold'}}>{t('oliveVarieties')} ({api.acronym})</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }, [api, info, page, setInfo, setPrevious, setInfoId, setPage, t, endpoints, setUrl, setBankAcronym]);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerImg}>
        <TouchableOpacity
          onPress={() => {
            if (infoIdPrev) {
              setInfoId(infoIdPrev);
              setInfoIdPrev(null);
              setApi(null);
              setPrevious('diseaseList');
              setPage('infoDisease');
            } else {
              setPage(previous);
              setPrevious('menu');
            }
          }}>
          <Image source={require('../../assets/Arrow.png')} />
        </TouchableOpacity>
        <Image source={require('../../assets/LOGO2.png')} />
      </View>
      {page === 'infoOlive' ? oliveInfo : null}
      {page === 'infoDisease' ? diseaseInfo : null}
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
  header: {
    flex: 1,
    alignItems: 'center',
    margin: '5%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nameImg: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'grey',
  },
  button: {
    padding: '3%',
    borderRadius: 10,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '10%',
    backgroundColor: '#A27B04',
    alignItems: 'center',
  }
});

export default Info;