import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { CardPatient } from '../../../components/CardPatient';
import { useAuth } from '../../../contexts/auth';
import { useChange } from '../../../contexts/change';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';

export const Patients = () => {
    const {user, token} = useAuth();
    const {change} = useChange();
    const [patients, setPatients] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        async function getData(){
            await api.get(`patient/${user._id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then((response) => {
                setLoader(false);
                setPatients(response.data);
            })
            .catch(err => {
                setLoader(false);
                Alert.alert(err.response.data.error);
            })
        }

        getData();
    }, [change]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20}}>

                    <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18, marginBottom: 10}}>Pacientes</Text>
                    {loader ? <ActivityIndicator color={colors.primary} size={25} style={{alignSelf: 'center'}}/>
                    : (
                        patients.length !== 0 ? (
                            <FlatList
                                contentContainerStyle={{paddingBottom: 20}}
                                data={patients}
                                renderItem={({item}) => <CardPatient patient={item}/>}
                                keyExtractor={(item) => item.id}
                            />
                        ) : (
                            <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                                <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe nenhum paciente cadastrado.</Text>
                            </View>
                        )
                    )}

            </View>
        </SafeAreaView>
    );
}