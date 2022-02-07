import React from 'react';
import { View, SafeAreaView, Alert} from 'react-native';
import { Button } from '../../../components/Button'
import {useNavigation} from '@react-navigation/native';
import colors from '../../../styles/colors';
import { LegendForm } from './styles';
import { useState } from 'react';
import { api } from '../../../services/api';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import config from '../../../config';
import { RNS3 } from 'react-native-aws3';

export const PetshopRegisterStepThree = ({route}) => {
    const {data} = route.params;
    const {navigate} = useNavigation();
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    async function uploadToS3Post(file, data){
        const fileModificated = {
            uri: file,
            name: new Date().toString(),
            type: "image/jpg"
          }
    
          const options = {
            keyPrefix: '', 
            bucket: 'uploads-petcare', 
            region: 'us-east-1', 
            accessKey: 'AKIAS5GYDWEJAK6V3KPK',
            secretKey: '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',
            successActionStatus: 201,
          }
    
        RNS3.put(fileModificated, options).then(async response => {
            if (response.status !== 201) throw new Error("Failed to upload image to S3");
            else {
              await api.post('petshop', {...data, photoUri: response.body.postResponse.location})
              .then(() => navigate('Login'))
              .catch(err => Alert.alert(err.response.data.error))
            };
            
          });
      }

    async function handleRegisterPetshop(){
        if(address === ""){
            Alert.alert("Não esqueça de informar seu endereço!")
        } else {

        const dados = {
            ...data,
            address,
            latitude,
            longitude
        }

        await uploadToS3Post(dados.photoUri, dados);
    }
}

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>

                    <LegendForm style={{marginTop: 20}}>Insira seu endereço</LegendForm>

                    <View style={{width: '100%', alignSelf: 'center', flex: 1, marginTop: 10}}>

                        <GooglePlacesAutocomplete
                            placeholder="Pesquise seu endereço aqui." 
                            onPress={(data, details)  => {
                                setAddress(details.formatted_address);
                                setLatitude(details.geometry.location.lat);
                                setLongitude(details.geometry.location.lng);
                            }}
                            query={{
                                key: config.googleApi,
                                language: 'pt-BR'
                            }}
                            fetchDetails={true}
                        />
                    </View>

                    <Button bgColor={colors.primary} style={{marginBottom: 20}} onPress={() => handleRegisterPetshop()}>Cadastrar</Button>
                     


        </SafeAreaView>
    )
}