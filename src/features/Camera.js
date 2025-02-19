import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker'; // Importa ImagePicker

export const Picture = ({ previous, setPage, setPrevious, page, setPrediction, endpoints, t }) => {
  
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [data, setData] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [ilLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await requestCameraPermission();
      setPermissionGranted(status === 'granted');
    };
    checkPermissions();
  }, [requestCameraPermission]);

  useEffect(() => {
    if (data) {
      console.log(data);
      switch (page) {
        case 'oliveDet':
          setPrevious(page);
          setPrediction(data['olives']);
          setPage('olivePredict');
          break;
        case 'diseaseDet':
          setPrevious(page);
          setPrediction(data['diseases']);
          setPage('diseasePredict');
          break;
        default:
          break;
      }
    }
  }, [data, page, setPage, setPrediction, setPrevious]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log(uri);
        setImage(uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pickImage = async () => {
    // Richiedi permessi per accedere alla galleria
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert(t('cameraPermissionRequired'));
      return;
    }

    // Apri la galleria per selezionare un'immagine
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const savePicture = useCallback(async () => {
    if (image) {
      console.log('Predicting...');
      setIsLoading(true);
      var url;
      if (page === 'diseaseDet') {
        url = endpoints.predictDisease;
      } else if (page === 'oliveDet') {
        url = endpoints.predictOlive;
      }

      try {
        const manipResult = await manipulateAsync(
          image,
          [{ resize: { width: 800 } }],
          { compress: 0.8, format: SaveFormat.JPEG }
        );

        const formData = new FormData();
        formData.append('image', {
          uri: manipResult.uri,
          name: 'photo.jpg',
          type: 'image/jpg',
        });

        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const d = await response.json();
        setData(d);
      } catch (error) {
        console.error('Error saving picture:', error);
      }
      setIsLoading(false);
    }
  }, [image, setData, setIsLoading, endpoints, page]);

  if (!permissionGranted) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.icon}>
          <Image source={require('../../assets/LOGO.png')} style={styles.img} />
          <View style={styles.arrow}>
            <TouchableOpacity
                onPress={() => {
                setPage(previous);
                setPrevious('menu');
                }}
                >
                <Image source={require('../../assets/ArrowWhite.png')} />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                {page==='oliveDet' ? t('oliveDetection') : t('diseaseDetection')}
            </Text>
        </View>
        </View>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: "10%", textAlign: 'center', margin: "20%" }}>{t('cameraPermissionRequired')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image source={require('../../assets/LOGO.png')} style={styles.img} />
        <View style={styles.arrow}>
            <TouchableOpacity
                onPress={() => {
                setPage(previous);
                setPrevious('menu');
                }}
                >
                <Image source={require('../../assets/ArrowWhite.png')} />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                {page==='oliveDet' ? t('oliveDetection') : t('diseaseDetection')}
            </Text>
        </View>
      </View>
      {!image ? (
        <CameraView ref={cameraRef} style={styles.camera} type={CameraType} />
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {!image ? (
          <>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.textButton}>{t('takePicture')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.textButton}>{t('selectGallery')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={{...styles.button, backgroundColor: ilLoading ? 'gray' : '#A27B04'}}
            onPress={ () => {
              if (!ilLoading) {
                savePicture();
              }
            }}
          >
            <Text style={styles.textButton}>{ilLoading ? t('detecting')+'...' : t('detect')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  camera: {
    flex: 0.70,
    flexDirection: 'column',
    width: '90%',
    borderRadius: 20,
  },
  arrow: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '5%',
    left: '2%',

  },
  controls: {
    flex: 0.15,
    flexDirection: 'column',
    margin: "10%",
    width: '90%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#A27B04',
    borderRadius: 20,
    marginBottom: 10, // Aggiungi un margine tra i pulsanti
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  icon: {
    flex: 0.3,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  img: {
    marginTop: '10%',
    resizeMode: 'contain',
    width: '30%',
  },
});
