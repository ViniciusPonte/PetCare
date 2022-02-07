import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../../contexts/auth'
import { Button } from '../../../components/Button'
import colors from '../../../styles/colors'
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RNS3 } from 'react-native-aws3';
import { api } from '../../../services/api'

export const Account = () => {
    const { user, signOut, token, setUser } = useAuth();
    const { navigate } = useNavigation();
    const [loader, setLoader] = useState(false);
    const [image, setImage] = useState(user.photoUri);
    const [editableImage, setEditableImage] = useState(false);

    async function pickImage(){
        let data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16,9],
            quality: 1,
        });

        if (data.cancelled) {
            setImage(user.photoUri);
        } else {
            setImage(data.uri);
            setEditableImage(true);
        }
    }

    async function uploadToS3Put(file, data, token){
        setLoader(true);

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
                
              await api.put(`user/${user._id}`, {...data, photoUri: response.body.postResponse.location}, {
                headers: {
                  Authorization: "Bearer " + token,
                }
              })
              .then((response) => {
                setEditableImage(false);
                setLoader(false);
                AsyncStorage.removeItem('@petcare:user');
                const data2 = {...user, photoUri: response.data.user.photoUri};
                AsyncStorage.setItem('@petcare:user', JSON.stringify(data2));
                if (response.status === 200) setUser(data2)
              })
              .catch(err => {
                  setLoader(false);
                setEditableImage(false);
                Alert.alert(err.response.data.error)
              })
            };
            
          });
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20, flex: 1}}>

                <TouchableOpacity onPress={signOut}  style={{position: 'absolute', top: 20, right: 20}}><Icon name="logout" color={colors.red} size={25}/></TouchableOpacity>

                {image ? (
                    <TouchableOpacity style={{width: 150, height: 150, marginVertical: 20, alignSelf:'center'}} onPress={() => pickImage()}>
                        <Image source={{uri: image}} resizeMode="contain" style={{width: 150, height: 150, borderRadius: 300, alignSelf: 'center'}}/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity  style={{width: 150, height: 150, marginVertical: 20, alignSelf:'center'}} onPress={() => pickImage()} style={{backgroundColor: colors.gray, borderRadius: 200, padding: 30, width: 150, height: 150, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name="account" size={50} color={colors.primary}/>
                    </TouchableOpacity>
                )}

                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Nome</Text>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigate('EditAccount', {type: 'nome'})}>
                            <Text style={{fontFamily: 'Poppins_400Regular'}}>{user.name}</Text>
                            <Icon name="chevron-right" style={{marginLeft: 8}} size={20} color={colors.primary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Telefone</Text>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigate('EditAccount', {type: 'telefone'})}>
                            <Text style={{fontFamily: 'Poppins_400Regular'}}>{user.phone}</Text>
                            <Icon name="chevron-right" style={{marginLeft: 8}} size={20} color={colors.primary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>E-mail</Text>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigate('EditAccount', {type: 'e-mail'})}>
                            <Text style={{fontFamily: 'Poppins_400Regular'}}>{user.email}</Text>
                            <Icon name="chevron-right" style={{marginLeft: 8}} size={20} color={colors.primary}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {editableImage && <Button onPress={() => uploadToS3Put(image, user, token)} bgColor={colors.primary} style={{bottom: 20, marginHorizontal: 20}}>{loader ? <ActivityIndicator size={20} color="white"/> : 'Salvar Imagem'}</Button>}
            <Button onPress={() => navigate('Pets')} bgColor={colors.primary} style={{bottom: 20, marginHorizontal: 20}} icon={<Icon size={30} name="paw" color={colors.background} style={{marginRight: 8}}/>}>Meus Pets</Button>
        </SafeAreaView>
    )
}
