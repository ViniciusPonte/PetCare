import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View, FlatList, Alert, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native'
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import { CardAdoption } from '../../../components/CardAdoption';
import { useChange } from '../../../contexts/change';
import { useModal } from '../../../contexts/modal';
import { ModalComponent } from '../../../components/ModalComponent';
import { AdoptionFilters }  from '../../../modals/AdoptionFilters';
import { useAdoption } from '../../../contexts/adoption';

export const Adoption = () => {
    const { token, user, userLocation } = useAuth();
    const { navigate } = useNavigation();
    const [adverts, setAdverts]  = useState([]);
    const {change} = useChange();
    const {setIsVisible, setContent, isVisible} = useModal();
    const {genderFilter, typeFilter} = useAdoption();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        async function getData(){
            api.get(`adoptions/?genderFilter=${genderFilter}&typeFilter=${typeFilter}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(response => {
                setLoader(false);
                setAdverts(response.data);
            })
            .catch(err => {
                setLoader(false);
                Alert.alert(err.response.data.error)
            })
        }

        getData();
    }, [change, genderFilter, typeFilter]);

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20}}>

                <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18}}>Adoção</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 20, alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigate('MyAdverts')} style={{backgroundColor: colors.primary, flexDirection: 'row', borderRadius: 20, alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5}}>
                        <Text style={{color: colors.background, fontFamily: 'Poppins_600SemiBold', marginLeft: 5}}>Meus Anúncios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setIsVisible(true);
                        setContent(<AdoptionFilters />);
                    }} style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <Icon name="filter" size={30} color="#a8a8a8"></Icon>
                    </TouchableOpacity>
                </View>
                
                {loader ? <ActivityIndicator style={{alignSelf: 'center'}} size={30} color={colors.primary}/> : (
                    adverts.length !== 0 ? (
                        <FlatList
                            contentContainerStyle={{paddingBottom: 100}}
                            showsVerticalScrollIndicator={false}
                            data={adverts}
                            numColumns={2}
                            keyExtractor={() => Math.random()}
                            renderItem={({ item }) => <CardAdoption advert={item}/>}
                        />
                    ) : (
                        <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                            <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe nenhum anúncio de adoção para os filtros especificados.</Text>
                        </View>
                    )
                )}
            </View>
            <TouchableOpacity onPress={() => navigate('CreateAdvert')} style={{position: 'absolute', right: 20, bottom: 20}}>
                <Icon name="plus-circle" size={50} color={colors.primary}></Icon>
            </TouchableOpacity>
            {isVisible && <ModalComponent />}
        </SafeAreaView>
    )
}
