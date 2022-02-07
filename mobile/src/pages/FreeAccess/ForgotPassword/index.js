import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import { Input } from '../../../components/Input';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { navigate } = useNavigation();
    const [verifyPassword, setVerifyPassword] = useState('');
    const [token, setToken] = useState('');
    const [success, setSuccess] = useState(false);

    async function sendRequest(){
        await api.post('forgot', {email})
        .then(response => {
            setSuccess(true);
        })
        .catch(err => {
            Alert.alert(err.response.data.error)
        })
    }

    async function reset(){
        console.log(password.length)
        if((password === verifyPassword) && password.length >= 8){
            await api.post('reset', {
                email,
                token,
                password
            })
            .then(() => navigate('Login'))
            .catch(err => Alert.alert(err.response.data.error))
        } else {
            Alert.alert('Sua nova senha deve possuir no minímo 8 caracteres e devem coincidir!')
        }
    }

    return (
        <View style={{alignItems: 'center', justifyContent: 'space-between', flex: 1, padding: 30, paddingTop: 60}}>
            <View style={{alignItems: 'center'}}>
                <Image style={{width: 100, height: 100}} source={require('../../../../assets/logo.png')}/>
                {!success && <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 20, marginTop: 40}}>Preencha o e-mail que está associado à sua conta.</Text>}
            </View>
            {success ? (
                <>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 20}}>Enviamos um token para seu e-mail. Utilize este token para alterar a sua senha.</Text>
                    <View style={{width: '100%'}}>
                        <Input ph="Nova senha" isPassword value={password} onChange={(e) => setPassword(e)} style={{fontFamily: 'Poppins_400Regular'}}/>
                        <Input ph="Confirme a nova senha" isPassword value={verifyPassword} onChange={(e) => setVerifyPassword(e)} style={{fontFamily: 'Poppins_400Regular'}}/>
                        <Input ph="Token (000000)" value={token} onChange={(e) => setToken(e)} style={{fontFamily: 'Poppins_400Regular'}}/>
                    </View>
                    <Button bgColor={colors.primary} onPress={() => reset()}>Alterar a senha</Button>
                </>
            ) : (
                <>
                    <Input ph="mariadasilva@email.com" value={email} onChange={(e) => setEmail(e)} style={{fontFamily: 'Poppins_400Regular'}}/>
                    <Button bgColor={colors.primary} onPress={() => sendRequest()}>Enviar</Button>
                </>
            )}
        </View>
    )
}