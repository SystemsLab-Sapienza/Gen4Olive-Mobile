import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { use } from 'react';

export const Picture = ({ previous, setPage, setPrevious, page, setPrediction, endpoints }) => {
  
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [data, setData] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [ilLoading, setIsLoading] = useState(false);

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

  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

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

  const savePicture = useCallback(async () => {
    if (image) {
      // call post request to server passing image
      console.log('Predicting...');
      setIsLoading(true);
      var url;
      if (page==='diseaseDet'){
        url = endpoints.predictDisease;
      }
      else if (page==='oliveDet'){
        url = endpoints.predictOlive;
      }
      try {
        // Create a FormData object
        const formData = new FormData();
        // Append the image file to the FormData object
        formData.append('image', {
            uri: image,
            name: 'photo.jpg', // You can change the name as needed
            type: 'image/jpg', // You can change the type as needed
        });

        // Make the POST request
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        console.log('Response:', response);
        // Handle the response
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
                {page==='oliveDet' ? 'Olive Detection' : 'Disease Detection'}
            </Text>
        </View>
        </View>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: "10%", textAlign: 'center', margin: "20%" }}> Camera permissions are required to use this feature </Text>
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
                {page==='oliveDet' ? 'Olive Detection' : 'Disease Detection'}
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
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.textButton}>Snap a photo</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{...styles.button, backgroundColor: ilLoading ? 'gray' : '#A27B04'}}
            onPress={ () => {
              if (!ilLoading) {
                savePicture();
              }
            }}
          >
            <Text style={styles.textButton}>{ilLoading ? 'Predicting...' : 'Predict'}</Text>
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
    marginTop: '10%',
    flex: 0.7,
    width: '95%',
    borderRadius: 20,
  },
  arrow: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    left: '0%',
    bottom: '20%',
  },
  controls: {
    flex: 0.25,
    marginTop: '10%',
    width: '95%',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#A27B04',
    borderRadius: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  icon: {
    flex: 0.35,
    width: '100%',
    alignItems: 'center',
  },
  img: {
    marginTop: '10%',
    resizeMode: 'contain',
    width: '30%',
  },
});