import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CardService } from '../../../components/CardService';
import { useAuth } from '../../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { useChange } from '../../../contexts/change';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';

export const Services = () => {
    const { user, token } = useAuth();
    const { navigate } = useNavigation();
    const [loader, setLoader] = useState(true);
    const [services, setServices] = useState([]);
    const {change} = useChange();

    useEffect(() => {
        async function getData(){
            await api.get(`services/${user._id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then(response => {
                setServices(response.data)
                setLoader(false);
            })
            .catch(err => {
                setLoader(false);
                Alert.alert(err.response.data.error)
            })
        }

        getData();
    },  [change])

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18}}>Serviços</Text>
                    <TouchableOpacity onPress={() => navigate('CreateService')}>
                        <Icon name="plus-circle-outline" color={colors.primary} size={30}/>
                    </TouchableOpacity>
                </View>
                {loader ? <ActivityIndicator color={colors.primary} size={25} style={{alignSelf: 'center'}}/>
                : (
                    services.length !== 0 ? (
                        <FlatList
                            contentContainerStyle={{paddingBottom: 30}}
                            data={services}
                            renderItem={({item}) => <CardService service={item}/>}
                            keyExtractor={(item) => item.id}
                        />
                    ) : (
                        <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                            <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe nenhum agendamento marcado.</Text>
                        </View>
                    )
                )}
            </View>
        </SafeAreaView>
    )
}

