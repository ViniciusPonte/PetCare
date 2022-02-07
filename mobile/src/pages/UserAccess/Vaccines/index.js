import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CardVaccine } from '../../../components/CardVaccine';
import { ModalComponent } from '../../../components/ModalComponent';
import { useAuth } from '../../../contexts/auth';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';

export const Vaccines = ({route}) => {
    const {token} = useAuth();
    const {pet} = route.params;

    const [loader, setLoader] = useState(true);
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        async function getData(){
            await api.get(`vaccines/${pet._id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then(response => {
                setLoader(false);
                setVaccines(response.data);
            })
            .catch(err => {
                setLoader(false);
                Alert.alert(err.response.data.error);
            })
        }

        getData();
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18, marginBottom: 20}}>Vacinação - {pet.name}</Text>
                {loader ? <ActivityIndicator color={colors.primary} size={25} style={{alignSelf: 'center'}}/>
                : (
                    <FlatList
                        contentContainerStyle={{paddingBottom: 20}}
                        data={vaccines}
                        renderItem={({item}) => <CardVaccine vaccine={item}/>}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

