import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import colors from '../../../styles/colors';
import { RNS3 } from 'react-native-aws3';
import { Input } from '../../../components/Input'
import { Picker } from '@react-native-picker/picker'
import { Button } from '../../../components/Button';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import { useAuth } from '../../../contexts/auth';
import { useChange } from '../../../contexts/change';
import { api } from '../../../services/api';

export const CreatePet = () => {
    const {token, user} = useAuth();
    const { navigate } = useNavigation();
    const { setChange }  = useChange();
    const types = ['Cachorro', 'Gato', 'Ave', 'Roedor', 'Coelho', 'Réptil', 'Peixe'];
    const petColors = ['Marrom', 'Branco', 'Preto', 'Cinza', 'Dourado', 'Creme']
    const genders = ['Macho', 'Fêmea'];
    const ports = ['Pequeno', 'Médio', 'Grande'];

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [gender, setGender] = useState(genders[0]);
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('');
    const [color, setColor] = useState(petColors[0]);
    const [port, setPort] = useState(ports[0]);
    const [rga, setRga] = useState('');
    const [image, setImage] = useState(null);
    const [microchip, setMicrochip] = useState('');
    
    async function pickImage(){
        let data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16,9],
            quality: 1,
        });
        setImage(data.uri);
    }

    let aux = age.split('/');
    const formatedDate = aux[2] + '-' + aux[1] + '-' + aux[0]; 

    async function save(){
        const data = {
            userId: user._id,
            name,
            type,
            gender,
            breed,
            age: formatedDate,
            color,
            port,
            rga,
            microchip
        }

        await uploadToS3Post(image, data, token);
    }

    async function uploadToS3Post(file, data, token){
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
              await api.post('pets', {...data, photoUri: response.body.postResponse.location}, {
                headers: {
                  Authorization: "Bearer " + token,
                }
              })
              .then(() => {
                  setChange(true);
                  setChange(false);
                  navigate('Pets');
              })
              .catch(err => Alert.alert(err.response.data.error))
            };
            
          });
      }

    return(
        <SafeAreaView style={{flex: 1, padding: 20, paddingBottom: 0}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {!image ? (
                    <TouchableOpacity onPress={() => {pickImage()}} style={{backgroundColor: colors.gray, borderRadius: 100, padding: 30, width: 120, height: 120, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name="camera" size={50} color={colors.primary}/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => {pickImage()}}>
                        <Image source={{uri: image}} resizeMode="contain" style={{width: 150, height: 150, borderRadius: 50, alignSelf: 'center', marginBottom: 20}}/>
                    </TouchableOpacity>
                )}
                <View>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Nome</Text>
                        <Input  style={{fontFamily: 'Poppins_400Regular'}} value={name} onChange={(e) => {setName(e)}} ph="Nome do Pet *"/>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Data de Nascimento</Text>
                        <TextInputMask
                            placeholder="Data de nascimento *"
                            style={{backgroundColor: 'white', alignSelf: 'stretch', height: 50, borderRadius: 8, paddingLeft: 10, marginVertical: 8, fontFamily: 'Poppins_400Regular'}}
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            value={age}
                            onChangeText={e => setAge(e)}
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Raça</Text>
                        <Input  style={{fontFamily: 'Poppins_400Regular'}} value={breed} onChange={(e) => {setBreed(e)}} ph="Raça *"/>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Tipo</Text>
                        <View style={{backgroundColor: 'white', borderRadius: 8, marginVertical: 8}}>
                            <Picker 
                                selectedValue={type}
                                style={{ height: 50, color: 'black'}}
                                itemStyle={{fontFamily: 'Poppins_400Regular'}}
                                onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                            >
                                {types.map((item, index) => (
                                    <Picker.Item key={index} label={item} value={item}/>
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Sexo</Text>
                        <View style={{backgroundColor: 'white', borderRadius: 8, marginVertical: 8}}>
                            <Picker 
                                selectedValue={gender}
                                style={{ height: 50, color: 'black'}}
                                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                            >
                                {genders.map((item, index) => (
                                    <Picker.Item key={index} label={item} value={item}/>
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Porte</Text>
                        <View style={{backgroundColor: 'white', borderRadius: 8, marginVertical: 8}}>
                            <Picker 
                                selectedValue={port}
                                style={{ height: 50, color: 'black'}}
                                onValueChange={(itemValue, itemIndex) => setPort(itemValue)}
                            >
                                {ports.map((item, index) => (
                                    <Picker.Item key={index} label={item} value={item}/>
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Cor</Text>
                        <View style={{backgroundColor: 'white', borderRadius: 8, marginVertical: 8}}>
                            <Picker 
                                selectedValue={color}
                                style={{ height: 50, color: 'black'}}
                                onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
                            >
                                {petColors.map((item, index) => (
                                    <Picker.Item key={index} label={item} value={item}/>
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>RGA (Opcional)</Text>
                        <Input value={rga} onChange={(e) => setRga(e)} style={{fontFamily: 'Poppins_400Regular'}} ph="RGA"/>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Microchip (Opcional)</Text>
                        <Input value={microchip} onChange={(e) => setMicrochip(e)} style={{marginTop: 10, fontFamily: 'Poppins_400Regular'}} ph="Microchip"/>
                    </View>
                    <Button onPress={() => save()} bgColor={colors.primary} style={{marginBottom: 20, marginTop: 20}}>Salvar</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}