import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator } from 'react-native' 
import colors from '../../../styles/colors';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../contexts/auth';
import { api } from '../../../services/api';
import { CardAdoption } from '../../../components/CardAdoption';
import { useChange } from '../../../contexts/change';

export const MyAdverts = () => {
    const {user, token} = useAuth();
    const { navigate } = useNavigation();
    const [adverts, setAdverts]  = useState([]);
    const {change} = useChange();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        async function getData(){
            api.get(`adoptions/${user._id}`, {
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
    }, [change]);

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18}}>Meus anúncios</Text>

                {loader ? <ActivityIndicator style={{alignSelf: 'center'}} size={30} color={colors.primary}/> : (
                    adverts.length !== 0 ? (
                        <FlatList
                             contentContainerStyle={{paddingBottom: 60}}
                             showsVerticalScrollIndicator={false}
                             data={adverts}
                             numColumns={2}
                             keyExtractor={() => Math.random()}
                             renderItem={({ item }) => <CardAdoption isMine advert={item}/>}
                        />
                    ) : (
                        <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                            <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe nenhum anúncio registrado.</Text>
                        </View>
                    )
                )}

            </View>
            <TouchableOpacity onPress={() => navigate('CreateAdvert')} style={{position: 'absolute', right: 20, bottom: 20}}>
                <Icon name="plus-circle" size={50} color={colors.primary}></Icon>
            </TouchableOpacity>
        </SafeAreaView>
    )
}