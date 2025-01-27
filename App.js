import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu } from './src/features/Menu';
import { List } from './src/features/List';
import { Picture } from './src/features/Camera';
import { Info } from './src/features/Info';
import * as ScreenOrientation from 'expo-screen-orientation';
import ExitConfirmation from './src/components/ExitConfirmation';

export default function App() {
  const [page, setPage] = useState('menu');
  const [previous, setPrevious] = useState('menu');
  const [url, setUrl] = useState([]);
  const [orientation, setOrientation] = useState(1);

  // Lock orientation on component mount
  useEffect(() => {
    lockOrientation();
  }, []);

  // Lock orientation to PORTRAIT
  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
    const o = await ScreenOrientation.getOrientationAsync();
    setOrientation(o);
  };
  

  // Map page state to corresponding component
  const pageComponents = {
    menu: <Menu setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} url={url} setUrl={setUrl} />,
    oliveList: <List setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} url={url} setUrl={setUrl} />,
    diseaseList: <List setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} url={url} setUrl={setUrl} />,
    oliveDet: <Picture setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} />,
    diseaseDet: <Picture setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} />,
    infoOlive: <Info setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} />,
    infoDisease: <Info setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} />,
  };

  return (
    <View style={styles.container}>
      {pageComponents[page]}
      <ExitConfirmation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5F5F2E',
    margin: 0,
  },
});
