import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { endpoints } from '../api';

export const Picture = ({ previous, setPage, setPrevious, page, setPrediction }) => {
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [data, setData] = useState(null);
  useEffect(() => {
    requestCameraPermission();
    if (data){
      console.log(data)
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
  }, [data]);

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

  const savePicture = async () => {
    if (image) {
      // call post request to server passing image
      console.log('Predicting...');
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
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestCameraPermission}>
          <Text>Request permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image source={require('../../assets/LOGO.png')} style={styles.img} />
        <TouchableOpacity
          onPress={() => {
            setPage(previous);
            setPrevious('menu');
          }}
          style={styles.arrow}>
          <Image source={require('../../assets/ArrowWhite.png')} />
        </TouchableOpacity>
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
          <TouchableOpacity style={styles.button} onPress={savePicture}>
            <Text style={styles.textButton}>Predict</Text>
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
    position: 'absolute',
    left: '0%',
    bottom: '25%',
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
