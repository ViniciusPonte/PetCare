import React, { useState } from 'react';
import {Alert, Text, View} from 'react-native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { MaskedInputPhone } from '../../../components/MaskedInputPhone';
import { useAuth } from '../../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';

export const EditAccount = ({route}) => {
    const {user, token, setUser} = useAuth();
    const { navigate } = useNavigation();
    const {type} = route.params;
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);

    async function saveUser(){
        await api.put(`petshop/${user._id}`, {
            ...user,
            name,
            phone,
            email
        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(response => {
            AsyncStorage.removeItem('@petcare:user');
            const data = {...user, name, phone, email};
            AsyncStorage.setItem('@petcare:user', JSON.stringify(data));
            if (response.status === 200){
                setUser(data);
                navigate('Account');
            }
        })
        .catch(err => Alert.alert(err.response.data.error))
    }

    return (
        <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingVertical: 20}}>
            <Text style={{alignSelf: 'flex-start', fontFamily: 'Poppins_600SemiBold', fontSize: 20}}>Preencha o novo {type}</Text>
            {type === 'nome' ? (
                <Input value={name} onChange={(e) => setName(e)} style={{marginTop: 10, fontFamily: 'Poppins_400Regular'}} ph="Nome do Petshop"/>
            ) : type === 'telefone' ? (
                <MaskedInputPhone onChange={(e) => setPhone(e)} value={phone} ph="(00) 00000-0000" style={{fontFamily: 'Poppins_400Regular'}}/>
            ) : (
                <Input value={email} onChange={(e) => setEmail(e)} style={{marginTop: 10, fontFamily: 'Poppins_400Regular'}} ph="petshop@email.com"/>
            )} 
            <Button bgColor={colors.primary} onPress={() => saveUser()}>Salvar</Button>
        </View>
    )
}