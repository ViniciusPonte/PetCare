import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, Image, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native';
import {ViewPet, ImagePet} from '../../../components/CardPet/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native'
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import { useChange } from '../../../contexts/change';
import { CardPet } from '../../../components/CardPet';
import { useModal } from '../../../contexts/modal';
import { PetsOptions } from '../../../modals/PetsOptions';
import { ModalComponent } from '../../../components/ModalComponent';

export const Pets = () => {
    const {change} = useChange();
    const {user, token} = useAuth();
    const { navigate } = useNavigation();
    const [pets, setPets] = useState([]);
    const [loader, setLoader] = useState(false);
    const {setIsVisible, setContent, isVisible} = useModal();

    useEffect(() => {
        async function getData(){
            await api.get(`pets/${user._id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then(setLoader(true))
            .then(response => {
                setPets(response.data);
                setLoader(false);
            })
            .catch(err => {
                Alert.alert(err.response.data.error);
                setLoader(false);   
            })
        }

        getData();
    }, [change]);
    
    const renderPet = ({item}) => <CardPet pet={item} onPress={() => {
        setIsVisible(true);
        setContent(<PetsOptions pet={item}/>);
    }}/>;

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18}}>Meus Pets</Text>
                    <TouchableOpacity onPress={() => navigate('CreatePet')}>
                        <Icon name="plus-circle-outline" color={colors.primary} size={35}/>
                    </TouchableOpacity>
                </View>
                {loader ? <ActivityIndicator color={colors.primary} size={25} style={{alignSelf: 'center'}}/>
                : (
                    pets.length !== 0 ? (
                        <FlatList
                            contentContainerStyle={{paddingBottom: 50}}
                            data={pets}
                            renderItem={renderPet}
                            keyExtractor={(item) => item.id}
                        />
                    ) : (
                        <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                            <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe nenhum pet cadastrado.</Text>
                        </View>
                    )
                )}
            </View>
            {isVisible && <ModalComponent />}
        </SafeAreaView>
        
    )
}