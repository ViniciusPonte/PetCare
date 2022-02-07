import React from 'react';
import { View, Text, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/auth';
import { useChange } from '../../contexts/change';
import { useModal } from '../../contexts/modal';
import { useNavigation } from '@react-navigation/native';
import { NewVaccine } from '../../pages/PetshopAccess/NewVaccine';
import { api } from '../../services/api';

import colors from '../../styles/colors';
import { formatDate } from '../../utils/formatDate';
import { Reschedule } from '../Reschedule';

export const ScheduleOptions = ({schedule}) => {
    const { navigate } = useNavigation();
    const {setChange} = useChange();
    const {type, token} = useAuth();
    const {setContent, setIsVisible} = useModal();

    const messageUser = `Olá%20${schedule.petshop.name}!%20Estou%20entrando%20em%20contato%20a%20respeito%20do%20meu%20agendamento%20as%20${schedule.time}%20do%20dia%20${formatDate(schedule.date)[0]}%20de%20${formatDate(schedule.date)[1]}.`;
    const messagePetshop = `Olá%20${schedule.user.name}!%20Estou%20entrando%20em%20contato%20a%20respeito%20do%20seu%20agendamento%20as%20${schedule.time}%20do%20dia%20${formatDate(schedule.date)[0]}%20de%20${formatDate(schedule.date)[1]}.`;

    async function cancelSchedule(){
        await api.delete(`schedule/${schedule._id}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(response => {
            Alert.alert("Agendamento desmarcado com sucesso!");
            setIsVisible(false);
            setContent(null);
            setChange(true);
            setChange(false);
        }).catch(err => {
            Alert.alert(err.response.data.error);
            setIsVisible(false);
            setContent(null);
        })
    }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 15, maxHeight: '80%', width: '100%'}}>
            <Text style={{fontSize: 18, fontFamily: 'Poppins_600SemiBold', marginBottom: 20}}>{schedule.service.name} - {formatDate(schedule.date)[0]} de {formatDate(schedule.date)[1]} - {schedule.time}</Text>
            {type === "user" && (
                <Button onPress={() => {
                    setContent(<Reschedule date={schedule.date} hour={schedule.time}  petshopId={schedule.petshop._id} scheduleId={schedule._id}/>);
                }} bgColor={colors.primary} icon={<Icon name="calendar-edit" size={20} color="white" style={{marginRight: 8}}/>}>Remarcar</Button>
            )}
            <Button onPress={() => {
                type === "user" 
                ? Linking.openURL(`https://api.whatsapp.com/send?phone=55${schedule.petshop.phone.replace(/[^0-9]/g, '')}&text=${messageUser}`) 
                : Linking.openURL(`https://api.whatsapp.com/send?phone=55${schedule.user.phone.replace(/[^0-9]/g, '')}}&text=${messagePetshop}`)
            }} bgColor={colors.green} icon={<Icon name="whatsapp" size={20} color="white" style={{marginRight: 8}}/>}>Entrar em contato</Button>
            <Button onPress={() => {
                cancelSchedule();
            }} bgColor={colors.red} icon={<Icon name="trash-can" size={20} color="white" style={{marginRight: 8}}/>}>Desmarcar</Button>
        </View>
    );

}