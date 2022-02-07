import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import { Routes } from './src/routes'
import { NavigationContainer } from '@react-navigation/native'
import AuthProvider from './src/contexts/auth';
import colors from './src/styles/colors';
import { useFonts, Poppins_400Regular, Poppins_300Light, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import ModalProvider from './src/contexts/modal';
import PetProvider from './src/contexts/pet';
import ChangeProvider from './src/contexts/change';
import AdoptionProvider from './src/contexts/adoption';
import MapProvider from './src/contexts/map';

export default function App() {

  console.disableYellowBox = true;

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_300Light,
    Poppins_600SemiBold
  });

  if(!fontsLoaded){
      return <View></View>;
  }

  return (
      <>
        <StatusBar style="dark" backgroundColor={colors.background} translucent/>
        <NavigationContainer>
          <AuthProvider>
            <ChangeProvider>
              <ModalProvider>
                <PetProvider>
                  <MapProvider>
                    <AdoptionProvider>
                      <Routes />
                    </AdoptionProvider>
                  </MapProvider>
                </PetProvider>
              </ModalProvider>
            </ChangeProvider>
          </AuthProvider>
        </NavigationContainer>
      </>
  );
}
