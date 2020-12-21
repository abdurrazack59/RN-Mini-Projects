import React, { useState } from 'react';
import AppNavigator from "./src/navigation/AppNavigator";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';

// increase performance by enabling
enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'Questrial': require('./assets/fonts/Questrial/Questrial.ttf'),
    'Poppins': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf')
  });
};


export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }

  return (
    <AppNavigator />
  );
};

