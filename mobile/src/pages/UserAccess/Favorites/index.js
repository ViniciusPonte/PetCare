import React, { useEffect, useState } from 'react';
import {View, Text, Alert, ActivityIndicator, SafeAreaView, FlatList} from 'react-native';
import { CardPetshop } from '../../../components/CardPetshop';
import { useAuth } from '../../../contexts/auth';
import { useChange } from '../../../contexts/change';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';

export const Favorites = () => {
    const {user, token} = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loader, setLoader] = useState(false);
    const {change} = useChange();

    useEffect(() => {
        async function getData(){
            await api.get(`favorites/${user._id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then(setLoader(true))
            .then(response => {
                setLoader(false);
                console.log(response.data);
                setFavorites(response.data);
            })
            .catch(err => {
                setLoader(false);
                Alert.alert(err.response.data.error);
            })
        }

        getData();
    }, [change]);

    const renderFavorites = ({item}) => (<CardPetshop petshop={item.petshop} favoritePage/> )

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20}}>
            <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18}}>Favoritos</Text>
                {favorites && (
                    loader ? <ActivityIndicator color={colors.primary} size={25} style={{alignSelf: 'center'}}/>
                    : favorites.length !== 0 ? (
                        <FlatList
                            data={favorites} 
                            renderItem={renderFavorites} 
                            keyExtractor={(item) => item.id} 
                            contentContainerStyle={{paddingBottom: 20, paddingRight: 10}}
                        />
                    ) : (
                        <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                            <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe nenhum petshop favoritado.</Text>
                        </View>
                    ) 
                )}
            </View>
        </SafeAreaView>
    )
}