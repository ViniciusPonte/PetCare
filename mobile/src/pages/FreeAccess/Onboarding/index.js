import React, { useEffect, useState } from 'react';
import {View, SafeAreaView, Image, Text } from 'react-native';
import OnboardingComp from 'react-native-onboarding-swiper';
import colors from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { Onboarding1 } from '../../../../assets/svg/Onboarding1';
import { Onboarding2 } from '../../../../assets/svg/Onboarding2';
import { Onboarding3 } from '../../../../assets/svg/Onboarding3';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export const Onboarding = () => {

    const {navigate} = useNavigation();

    const Dot = ({isLight, selected}) => {
        let backgroundColor;
        if (isLight) {
          backgroundColor = selected ? colors.primary : colors.primarylighten;
        } else {
          backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
        }
        return (
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 360,
              marginHorizontal: 3,
              backgroundColor,
            }}
          />
        );
      };

      const Button = () => {
        return (
            <Icon name="check" size={25} style={{marginRight: 15}} color={colors.primary} onPress={() => navigate('Login')}/>
        )
      }

    return (
        <SafeAreaView style={{flex: 1}}>
                <Image source={require('../../../../assets/logo.png')} style={{width: 80, height: 80, alignSelf: 'center', marginTop: 60}}/>
                <OnboardingComp
                    DotComponent={Dot}
                    bottomBarHeight={40}
                    onDone={() => navigate('Login')}
                    onSkip={() => navigate('Login')}
                    nextLabel={<Text style={{color: colors.primary, fontFamily: 'Poppins_600SemiBold'}}>Continuar</Text>}
                    skipLabel={<Text style={{color: colors.primary, fontFamily: 'Poppins_600SemiBold'}}>Pular</Text>}
                    DoneButtonComponent={Button}
                    bottomBarColor={colors.background}
                    pages={[
                        {
                            image: <Onboarding1/>,
                            backgroundColor: colors.background,
                            title: <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 25, width: '80%', textAlign: 'center'}} numberOfLines={3}>GERENCIE SEUS PETS NUM LUGAR SÓ</Text>,
                            subtitle: ''
                        },
                        {
                            image: <Onboarding2/>,
                            backgroundColor: colors.background,
                            title: <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 25, width: '80%', textAlign: 'center'}} numberOfLines={3}>BUSQUE PETSHOPS PRÓXIMOS A SUA LOCALIZAÇÃO</Text>,
                            subtitle: ''
                        },
                        {
                            image: <Onboarding3/>,
                            backgroundColor: colors.background,
                            title: <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 25, width: '80%', textAlign: 'center'}} numberOfLines={3}>AGENDE CONSULTAS, BANHOS E MUITO MAIS EM POUCOS PASSOS!</Text>,
                            subtitle: ''
                        },
                    ]}
                />
        </SafeAreaView>
    )
}