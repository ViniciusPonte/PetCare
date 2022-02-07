import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, Image, View, Alert } from 'react-native'
import colors from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Input } from '../../../components/Input';
import { RNS3 } from 'react-native-aws3';
import { TextInputMask } from 'react-native-masked-text'
import { Button } from '../../../components/Button';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import { useChange } from '../../../contexts/change';

export const CreateAdvert = () =>{
    const {user, token, userLocation} = useAuth();
    const { navigate } = useNavigation();
    const { setChange } = useChange();

    const types = ['Cachorro', 'Gato', 'Ave', 'Roedor', 'Coelho', 'Réptil', 'Peixe'];
    const genders = ['Macho', 'Fêmea'];

    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState(types[0]);
    const [gender, setGender] = useState(genders[0]);
    const [age, setAge] = useState("");
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    async function pickImage(){
        let data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16,9],
            quality: 1,
        });
        setPhoto(data);
    }   

    let aux = age.split('/');
    const formatedDate = aux[2] + '-' + aux[1] + '-' + aux[0]; 

    async function createAdvert(){
        const data = {
            title,
            phone: user.phone,
            type,
            age: formatedDate,
            gender,
            photo,
            userId: user._id,
            latitude: userLocation ? userLocation.latitude : " ",
            longitude: userLocation ? userLocation.longitude : " ",
            city,
	        state: state.toUpperCase()
        }

        await uploadToS3Post(photo, data, token);
    }

    async function uploadToS3Post(file, data, token){
        console.log(data);
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
              await api.post('adoption', {...data, photo: response.body.postResponse.location}, {
                headers: {
                  Authorization: "Bearer " + token,
                }
              })
              .then(() => {
                setChange(true);
                setChange(false);
                navigate('MyAdverts')
              })
              .catch(err => Alert.alert(err.response.data.error))
            };
            
          });
    }

    async function pickImage(){
        let data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16,9],
            quality: 1,
        });
        setPhoto(data.uri);
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView contentContainerStyle={{padding: 20}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: colors.primary}}>Novo Anúncio</Text>
                {!photo ? (
                    <TouchableOpacity onPress={() => {pickImage()}} style={{backgroundColor: colors.gray, borderRadius: 100, padding: 30, width: 120, height: 120, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name="camera" size={50} color={colors.primary}/>
                    </TouchableOpacity>
                ) : (
                    <Image onPress={() => {pickImage()}} source={{uri: photo}} resizeMode="contain" style={{width: 150, height: 150, borderRadius: 50, alignSelf: 'center'}}/>
                )}
                <Text style={{fontFamily: 'Poppins_600SemiBold', alignSelf: 'center', padding: 5, fontSize: 16}}>Escolha uma foto para o anúncio</Text>
                <Input value={title} onChange={(e) => setTitle(e)} style={{marginTop: 10, fontFamily: 'Poppins_400Regular'}} ph="Título para o anúncio."/>
                
                <Text style={{fontFamily: 'Poppins_600SemiBold', padding: 5}}>Tipo</Text>
                    <View style={{backgroundColor: 'white', borderRadius: 8}}>
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
                
                <Text style={{fontFamily: 'Poppins_600SemiBold', padding: 5, marginTop: 10}}>Gênero</Text>
                    <View style={{backgroundColor: 'white', borderRadius: 8}}>
                        <Picker 
                            selectedValue={gender}
                            style={{ height: 50, color: 'black'}}
                            itemStyle={{fontFamily: 'Poppins_400Regular'}}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                        >
                            {genders.map((item, index) => (
                                <Picker.Item key={index} label={item} value={item}/>
                            ))}
                        </Picker>
                    </View>
                
                <Text style={{fontFamily: 'Poppins_600SemiBold', padding: 5, marginTop: 10}}>Data de nascimento</Text>
                    <TextInputMask
                        placeholder="DD/MM/AAAA"
                        style={{backgroundColor: 'white', alignSelf: 'stretch', height: 50, borderRadius: 8, paddingLeft: 10, fontFamily: 'Poppins_400Regular'}}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={age}
                        onChangeText={e => setAge(e)}
                    />
                    <Text style={{fontStyle: 'italic', fontFamily: 'Poppins_400Regular', marginTop: 5, fontSize: 12}}>Obs: Informe uma data aproximada de nascimento do(s) pet(s).</Text>


                    <Text style={{fontFamily: 'Poppins_600SemiBold', marginTop: 10}}>Cidade</Text>
                        <Input value={city} onChange={(e) => setCity(e)} style={{fontFamily: 'Poppins_400Regular'}} ph="Ex. Guarulhos"/>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', marginTop: 10}}>Estado</Text>
                        <Input value={state} onChange={(e) => setState(e)} style={{fontFamily: 'Poppins_400Regular'}} ph="Ex. SP/MG" max={2}/>
                    
                <Button bgColor={colors.primary} onPress={() => createAdvert()}>Criar anúncio</Button>
                
            </ScrollView>
        </SafeAreaView>
    )
}