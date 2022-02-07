import React from 'react';
import { View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import colors from '../../styles/colors';
import { useModal } from '../../contexts/modal';
import { api } from '../../services/api';
import { useChange } from '../../contexts/change';
import { useAuth } from '../../contexts/auth';

export const PatientOptions = ({patient}) => {
    console.log(patient);
    const {token} = useAuth();
    const { navigate } = useNavigation();
    const {setChange} = useChange();
    const {setContent, setIsVisible} = useModal();

    async function removePatient(){
        await api.delete(`patient/${patient._id}`, {
            headers: {
                Authorization:  'Bearer ' +  token,
            }
        })
        .then(() => {
            setContent(null);
            setIsVisible(false);
            setChange(true);
            setChange(false);
        })
        .catch((err) => {
            console.log(err);
            Alert.alert(err.response.data.error)
        })
    }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 15, maxHeight: '80%', width: '100%'}}>
            <Button onPress={() => {
                navigate('NewVaccine', {pet: patient.pet});
                setContent(null);
                setIsVisible(false);
            }} bgColor={colors.primary} icon={<Icon name="needle" size={20} color="white" style={{marginRight: 8}}/>}>Nova Vacina</Button>

            <Button onPress={() => removePatient()} bgColor={colors.red} icon={<Icon name="trash-can" size={20} color="white" style={{marginRight: 8}}/>}>Remover Paciente</Button>
        </View>
    );

}