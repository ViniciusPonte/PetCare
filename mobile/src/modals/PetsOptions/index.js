import React from 'react';
import { View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import colors from '../../styles/colors';
import { useModal } from '../../contexts/modal';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/auth';
import { useChange } from '../../contexts/change';

export const PetsOptions = ({pet}) => {
    const {token} = useAuth();
    const { navigate } = useNavigation();
    const {setContent, setIsVisible} = useModal();
    const {setChange} = useChange();

    async function deletePet(){
        await api.delete(`pets/${pet._id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(() => {
            setChange(true);
            setChange(false);
            setContent(null);
            setIsVisible(false);
        })
        .catch(err => {
            Alert.alert(err.response.data.error)
        })
    }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 15, maxHeight: '80%', width: '100%'}}>
            <Text style={{fontSize: 18, fontFamily: 'Poppins_600SemiBold', marginBottom: 20}}>{pet.name}</Text>

            <Button onPress={() => {
                navigate('EditPet', {pet});
                setContent(null);
                setIsVisible(false);
            }} bgColor={colors.primary} icon={<Icon name="pencil-outline" size={20} color="white" style={{marginRight: 8}}/>}>Editar</Button>
            <Button onPress={() => {
                setContent(null);
                setIsVisible(false);
                navigate('Vaccines', {pet});
            }} bgColor={colors.green} icon={<Icon name="needle" size={20} color="white" style={{marginRight: 8}}/>}>Vacinas</Button>
            <Button onPress={() => deletePet()} bgColor={colors.red} icon={<Icon name="trash-can-outline" size={20} color="white" style={{marginRight: 8}}/>}>Excluir</Button>
        </View>
    );

}