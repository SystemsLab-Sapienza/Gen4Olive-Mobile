import React, { useState, useEffect } from 'react';
import { BackHandler, Modal, Text, View, Button, StyleSheet } from 'react-native';

const ExitConfirmation = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setShowPopup(true);
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleConfirmLeave = () => {
    setShowPopup(false);
    BackHandler.exitApp(); // Exit the app
  };

  const handleCancelLeave = () => {
    setShowPopup(false);
  };

  return (
    <Modal
      visible={showPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowPopup(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>Are you sure you want to leave?</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={handleConfirmLeave} title="Yes" color="#5F5F2E" />
            <View style={styles.buttonSpacer} />
            <Button onPress={handleCancelLeave} title="No" color="#5F5F2E" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  message: {
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonSpacer: {
    width: 10,
  },
});

export default ExitConfirmation;
