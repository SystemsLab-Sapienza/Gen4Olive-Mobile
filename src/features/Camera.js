import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export const Picture = ({ previous, setPage, setPrevious }) => {
  const [permission, requestCameraPermission] = useCameraPermissions();
  useEffect(() => {
    requestCameraPermission();
  }, []);

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

  const savePicture = () => {
    if (image) {
      console.log("Photo captured");
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <Text>No access to camera</Text>;
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
