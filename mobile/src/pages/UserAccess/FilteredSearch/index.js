import React, { useEffect, useState } from 'react';
import {View, Text, Alert, ActivityIndicator, SafeAreaView, FlatList} from 'react-native';
import { CardPetshop } from '../../../components/CardPetshop';
import { useAuth } from '../../../contexts/auth';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';

export const FilteredSearch = ({route}) => {
    const {token} = useAuth();
    const {key} = route.params;
    const [filteredPetshops, setFilteredPetshops] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        async function getData(){
            await api.get(`search?key=${key}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then(setLoader(true))
            .then(response => {
                setLoader(false);
                setFilteredPetshops(response.data);
            })
            .catch(err => {
                setLoader(false);
                Alert.alert(err.response.data.error);
            })
        }

        getData();
    }, []);

    const renderFilteredPetshops = ({item}) => (<CardPetshop petshop={item}/> )

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20}}>
            <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18}}>Busca por "{key}"</Text>
                {filteredPetshops && (
                    loader ? <ActivityIndicator color={colors.primary} size={25} style={{alignSelf: 'center'}}/>
                    : filteredPetshops.length !== 0 ? (
                    <FlatList
                        data={filteredPetshops} 
                        renderItem={renderFilteredPetshops} 
                        keyExtractor={(item) => item.id} 
                        contentContainerStyle={{paddingBottom: 20, paddingRight: 10}}
                       />
                    ) : (
                        <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                            <Text style={{fontFamily: 'Poppins_300Light'}}>Não encontramos resultado para "{key}".</Text>
                        </View>
                    )
                )}
            </View>
        </SafeAreaView>
    )
}