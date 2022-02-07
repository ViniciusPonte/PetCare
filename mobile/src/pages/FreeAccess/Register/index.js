import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Image, SafeAreaView, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../../../components/Button'
import colors from '../../../styles/colors'

Icon.loadFont();

export const Register = () => {
    const { navigate } = useNavigation()

    return(
        <SafeAreaView style={{flex: 1}}>
            <Image style={{width: '150%', height: '65%', alignSelf: 'center'}} source={require('../../../../assets/ilustracao.png')}/>
            <View style={{bottom: 20, position: 'absolute', alignSelf: 'center', width: '100%', paddingHorizontal: 20}}>
                <Button onPress={() => navigate('ClientRegister')} icon={<Icon size={25} name="person" color={colors.background} style={{marginRight: 8}}/>} bgColor={colors.primary}>Sou Cliente</Button>
                <Button onPress={() => navigate('PetshopRegister')} icon={<Icon size={25} name="pets" color={colors.background} style={{marginRight: 8}}/>} bgColor={colors.primary}>Sou Petshop</Button>
            </View>
        </SafeAreaView>
    )
}