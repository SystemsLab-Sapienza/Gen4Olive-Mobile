import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu } from './src/features/Menu';
import { List } from './src/features/List';
import { Picture } from './src/features/Camera';
import { Info } from './src/features/Info';
import * as ScreenOrientation from 'expo-screen-orientation';
import ExitConfirmation from './src/components/ExitConfirmation';
import { useTranslation } from 'react-i18next';
import { useLocales } from 'expo-localization';
import i18n from './src/i18n';

export default function App() {

  // i18n
  const { t } = useTranslation();
  const locales = useLocales();
  useEffect(() => {
    i18n.changeLanguage(locales[0].languageCode);
  }, [locales, i18n]);

  // State variables
  const [page, setPage] = useState('menu');
  const [previous, setPrevious] = useState('menu');
  const [url, setUrl] = useState('');
  const [orientation, setOrientation] = useState(1);
  const [infoId, setInfoId] = useState(null);

  // Lock orientation to PORTRAIT
  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
    const o = await ScreenOrientation.getOrientationAsync();
    setOrientation(o);
  };

  // Lock orientation on component mount
  useEffect(() => {
    lockOrientation();
  }, [lockOrientation]);

  // Map page state to corresponding component
  const pageComponents = {
    menu: <Menu setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} url={url} setUrl={setUrl} />,
    oliveList: <List setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} url={url} setUrl={setUrl} setInfoId={setInfoId} />,
    diseaseList: <List setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} url={url} setUrl={setUrl} setInfoId={setInfoId} />,
    oliveDet: <Picture setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} />,
    diseaseDet: <Picture setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} />,
    infoOlive: <Info setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} infoId={infoId} />,
    infoDisease: <Info setPage={setPage} page={page} previous={previous} setPrevious={setPrevious} infoId={infoId} />,
  };

  return (
    <View style={styles.container}>
      {pageComponents[page]}
      <ExitConfirmation t={t} />
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
