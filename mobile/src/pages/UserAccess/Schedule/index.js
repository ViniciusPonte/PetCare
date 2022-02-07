import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, Text, ActivityIndicator, FlatList } from 'react-native';
import colors from '../../../styles/colors';
import {api} from '../../../services/api';
import {useAuth} from '../../../contexts/auth';
import { useModal } from '../../../contexts/modal';
import { ModalComponent } from '../../../components/ModalComponent';
import { CardSchedule } from '../../../components/CardSchedule';
import { useChange } from '../../../contexts/change';

export const Schedule = () => {
    const {change} = useChange();
    const {user, token} = useAuth();
    const {isVisible} = useModal();
    const [schedules, setSchedules] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        async function getData(){
            await api.get(`schedule/users/${user._id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then(setLoader(true))
            .then(response => {
                setSchedules(response.data);
                setLoader(false);
            })
            .catch(err => {
                console.log(err);
                setLoader(false);
            })
        }

        getData();
    }, [change]);

    const renderSchedule = ({item}) => <CardSchedule schedule={item}/>;

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18}}>Agendamentos</Text>
                </View>
                {loader ? <ActivityIndicator color={colors.primary} size={25} style={{alignSelf: 'center'}}/>
                : (
                    schedules.length !== 0 ? (
                        <FlatList
                            contentContainerStyle={{paddingBottom: 20}}
                            data={schedules}
                            renderItem={renderSchedule}
                            keyExtractor={(item) => item.id}
                        />  
                    ) : (
                        <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                            <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe agendamento marcado.</Text>
                        </View>
                    )
                )}
            </View>
            {isVisible && <ModalComponent />}
        </SafeAreaView>
    )
}