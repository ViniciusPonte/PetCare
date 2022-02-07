import React from 'react';
import { View, Text, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import colors from '../../../styles/colors'
import { useState } from 'react';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import {useNavigation} from '@react-navigation/native';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useAuth();
    const { navigate } = useNavigation();
    const [loader, setLoader] = useState(false);

    async function handleLogin(){
        await api.post('login', {
            username,
            password 
        })
        .then(setLoader(true))
        .then((response) => signIn(response.data))
        .catch((err) => {
            setLoader(false);
            setPassword('')
            Alert.alert('Usuário ou senha incorretos!')
        })
    }

    return(
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, padding: 20}}>
            <Image style={{width: 250, height: 250}} source={require('../../../../assets/logo-escrita.png')}/>
            <Input ph="Nome de Usuário" width="90%" value={username} onChange={(text) => setUsername(text)} style={{fontFamily: 'Poppins_400Regular'}}/>
            <Input ph="Senha" isPassword width="90%" value={password} onChange={(text) => setPassword(text)} style={{fontFamily: 'Poppins_400Regular'}}/>
            <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                <Text style={{color: colors.primary, fontSize: 14, marginVertical: 10, fontFamily: 'Poppins_400Regular'}}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
            <Button bgColor={colors.primary} onPress={handleLogin}>{loader ? <ActivityIndicator size={20} color="white"/> : 'Entrar'}</Button>
            <Button bgColor={colors.primary} onPress={() => navigate('Register')}>Cadastrar-se</Button>
            <Text style={{marginTop: 30, color: 'gray', fontSize: 14, fontFamily: 'Poppins_300Light'}}>© PetCare -  2021</Text>
        </View>
    )
}