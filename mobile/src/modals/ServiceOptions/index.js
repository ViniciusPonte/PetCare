import React from 'react';
import { View, Alert, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../components/Button';
import colors from '../../styles/colors';
import { useModal } from '../../contexts/modal';
import { api } from '../../services/api';
import { useChange } from '../../contexts/change';
import { useAuth } from '../../contexts/auth';

export const ServiceOptions = ({service}) => {
    const {token} = useAuth();
    const {setChange} = useChange();
    const {setContent, setIsVisible} = useModal();

    async function removeService(){
        await api.delete(`service/${service._id}`, {
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
            <Text style={{fontFamily: 'Poppins_600SemiBold', alignSelf: 'center', marginBottom: 20}}>{service.name} - {service.type}</Text>
            <Button onPress={() => removeService()} bgColor={colors.red} icon={<Icon name="trash-can" size={20} color="white" style={{marginRight: 8}}/>}>Excluir Serviço</Button>
        </View>
    );

}