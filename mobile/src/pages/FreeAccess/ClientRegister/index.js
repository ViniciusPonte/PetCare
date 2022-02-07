import React from 'react'
import { Text, SafeAreaView, ScrollView, Alert } from 'react-native'
import { Button } from '../../../components/Button'
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors'
import { Formik } from 'formik';
import * as yup from 'yup'
import { FormItems, LegendForm } from './styles';
import { Input } from '../../../components/Input'
import { MaskedInputCpf } from '../../../components/MaskedInputCpf'
import { MaskedInputPhone } from '../../../components/MaskedInputPhone'
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../services/api';

Icon.loadFont();

export const ClientRegister = () => {
    const { navigate } = useNavigation();

    async function handleRegisterUser(values){
        await api.post("user", {
            name: values.name,
            cpf: values.cpf,
            phone: values.phone,
            email: values.email,
            username: values.username,
            password: values.password,
            photoUri: ''
        })
        .then(response => navigate('Login'))
        .catch(err => Alert.alert(err.response.data.error));
    }

    const registerValidation = yup.object().shape({
        name: yup
            .string()
            .max(50, ({ max }) => `Seu nome deve possuir no máximo ${max} caracteres!`),
        cpf: yup
            .string()
            .min(14, ({ min }) => `Seu cpf deve possuir ${min} caracteres!`),
        phone: yup
            .string()
            .min(14, ({ min }) => `Seu telefone deve possuir ${min} caracteres!`),
        email: yup
            .string()
            .email('Deve ser um e-mail')
            .max(50, ({ max }) => `Seu email deve possuir no máximo ${max} caracteres!`),
        username: yup
          .string()
          .min(5, ({ min }) => `Seu usuário deve possuir no minímo ${min} caracteres!`),
        password: yup
          .string()
          .min(8, ({ min }) => `Sua senha deve possui no minímo ${min} caracteres!`),
        verifyPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'As senhas precisam coincidir')
      })

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{paddingHorizontal: 20, marginTop: 10}}>
            <Formik
                    initialValues={{name: '', cpf: '', phone: '', email: '', username: '', password: '', verifyPassword: ''}} 
                    onSubmit={values => handleRegisterUser(values)}
                    validationSchema={registerValidation}
                    validateOnBlur
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <>
                        <FormItems>
                            <LegendForm>Dados</LegendForm>
                            <Input onChange={handleChange("name")} value={values.name} ph="Nome Completo *" style={{fontFamily: 'Poppins_400Regular', borderWidth: errors.name && 1, borderColor: errors.name && colors.red}}/>
                            {errors.name && <Text style={{fontFamily: 'Poppins_400Regular',  fontSize: 10, color: 'red' }}>{errors.name}</Text>}
                        
                            <MaskedInputCpf onChange={handleChange("cpf")} value={values.cpf} ph="CPF *" style={{fontFamily: 'Poppins_400Regular', borderWidth: errors.cpf && 1, borderColor: errors.cpf && colors.red}}/>
                            {errors.cpf && <Text style={{fontFamily: 'Poppins_400Regular',  fontSize: 10, color: 'red' }}>{errors.cpf}</Text>}
                        
                            <MaskedInputPhone onChange={handleChange("phone")} value={values.phone} ph="Telefone *" style={{fontFamily: 'Poppins_400Regular', borderWidth: errors.phone && 1, borderColor: errors.phone && colors.red}}/>
                            {errors.phone && <Text style={{fontFamily: 'Poppins_400Regular',  fontSize: 10, color: 'red' }}>{errors.phone}</Text>}

                            <Input onChange={handleChange("email")} value={values.email} ph="E-mail *" style={{fontFamily: 'Poppins_400Regular', borderWidth: errors.email && 1, borderColor: errors.email && colors.red}}/>
                            {errors.email && <Text style={{fontFamily: 'Poppins_400Regular',  fontSize: 10, color: 'red' }}>{errors.email}</Text>}
                        </FormItems>

                        <FormItems>
                            <LegendForm>Dados de Login</LegendForm>
                            <Input onChange={handleChange("username")} value={values.username} ph="Nome de Usuário *" style={{fontFamily: 'Poppins_400Regular', borderWidth: errors.username && 1, borderColor: errors.username && colors.red}}/>
                            {errors.username && <Text style={{fontFamily: 'Poppins_400Regular',  fontSize: 10, color: 'red' }}>{errors.username}</Text>}
                        
                            <Input isPassword onChange={handleChange("password")} value={values.password} ph="Senha *" style={{fontFamily: 'Poppins_400Regular', borderWidth: errors.password && 1, borderColor: errors.password && colors.red}}/>
                            {errors.password && <Text style={{fontFamily: 'Poppins_400Regular',  fontSize: 10, color: 'red' }}>{errors.password}</Text>}
                        
                            <Input isPassword onChange={handleChange("verifyPassword")} value={values.verifyPassword} ph="Confirme sua senha *" style={{fontFamily: 'Poppins_400Regular', borderWidth: errors.verifyPassword && 1, borderColor: errors.verifyPassword && colors.red}}/>
                            {errors.verifyPassword && <Text style={{fontFamily: 'Poppins_400Regular',  fontSize: 10, color: 'red' }}>{errors.verifyPassword}</Text>}
                        </FormItems>

                        <Button onPress={handleSubmit} bgColor={colors.primary} style={{marginBottom: 20}}>Finalizar</Button>
                    </>
                )}
            </Formik>

            </ScrollView>
        </SafeAreaView>
    )
}