import React, { useState } from 'react'
import { Text, SafeAreaView, ScrollView, Alert, Image } from 'react-native'
import { Button } from '../../../components/Button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../styles/colors';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as yup from 'yup'
import { FormItems, LegendForm } from './styles';
import { Input } from '../../../components/Input'
import { MaskedInputPhone } from '../../../components/MaskedInputPhone'
import { MaskedInputCnpj } from '../../../components/MaskedInputCnpj'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

Icon.loadFont();

export const PetshopRegister = () => {
    const { navigate } = useNavigation();
    const [image, setImage] = useState('');

    async function pickImage(){
        let data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16,9],
            quality: 1,
        });
        setImage(data.uri);
    }

    function handleRegisterPetshop(values){
        const data = {
            companyName: values.companyName,
            name: values.name,
            cnpj: values.cnpj,
            email: values.email,
            phone: values.phone,
            username: values.username,
            password: values.password,
            photoUri: image,
        }
        
        navigate('PetshopRegisterStepTwo', {data: data});

    }

    const registerValidation = yup.object().shape({
        companyName: yup
            .string()
            .min(8, ({ min }) => `Sua razão social deve possuir no minímo ${min} caracteres!`),
        name: yup
            .string()
            .min(8, ({ min }) => `O nome de sua empresa deve possuir ${min} caracteres!`),
        cnpj: yup
            .string()
            .min(18, ({ min }) => `Seu CNPJ deve possuir ${min} caracteres!`),
        email: yup
            .string()
            .email(),
        phone: yup
            .string()
            .min(14, ({ min }) => `Seu telefone deve possuir ${min} caracteres!`),
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

            {image !== '' ? (
                <TouchableOpacity onPress={() => pickImage()} style={{flex: 1, height: 140, backgroundColor: 'white', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginVertical: 20, }}>
                    <Image source={{uri: image}} style={{width: '100%', height: 140, borderRadius: 12}}/>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => pickImage()} style={{flex: 1, height: 140, backgroundColor: 'white', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginVertical: 20, }}>
                    <Icon size={40} name="camera" color={colors.primary}/>
                    <Text style={{fontFamily: 'Poppins_400Regular', color: "#a0a0a0", marginTop: 10}}>Escolha uma foto do local</Text>
                </TouchableOpacity>
            )}

            <Formik
                    initialValues={{companyName: '', name: '', cnpj: '', email: '', phone: '', username: '', password: '', verifyPassword: ''}} 
                    onSubmit={values => handleRegisterPetshop(values)}
                    validationSchema={registerValidation}
                    validateOnBlur
                    
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <>
                    <FormItems>
                        <LegendForm>Dados</LegendForm>
                        <Input onChange={handleChange("companyName")} value={values.companyName} ph="Razão Social *" style={{fontFamily: 'Poppins_400Regular',borderWidth: errors.companyName && 1, borderColor: errors.companyName && colors.red}}/>
                        {errors.companyName && <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 10, color: 'red' }}>{errors.companyName}</Text>}

                        <Input onChange={handleChange("name")} value={values.name} ph="Nome *" style={{fontFamily: 'Poppins_400Regular',borderWidth: errors.name && 1, borderColor: errors.name && colors.red}}/>
                        {errors.name && <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 10, color: 'red' }}>{errors.name}</Text>}
                    
                        <MaskedInputCnpj onChange={handleChange("cnpj")} value={values.cnpj} ph="CNPJ *" style={{fontFamily: 'Poppins_400Regular',borderWidth: errors.cnpj && 1, borderColor: errors.cnpj && colors.red}}/>
                        {errors.cnpj && <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 10, color: 'red' }}>{errors.cnpj}</Text>}
                    
                        <Input onChange={handleChange("email")} value={values.email} ph="E-mail *" style={{fontFamily: 'Poppins_400Regular',borderWidth: errors.email && 1, borderColor: errors.email && colors.red}}/>
                        {errors.email && <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 10, color: 'red' }}>{errors.email}</Text>}

                        <MaskedInputPhone onChange={handleChange("phone")} value={values.phone} ph="Telefone *" style={{fontFamily: 'Poppins_400Regular',borderWidth: errors.phone && 1, borderColor: errors.phone && colors.red}}/>
                        {errors.phone && <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 10, color: 'red' }}>{errors.phone}</Text>}
                    </FormItems>

                    <FormItems>
                        <LegendForm>Dados de Login</LegendForm>
                        <Input onChange={handleChange("username")} value={values.username} ph="Nome de Usuário *" style={{fontFamily: 'Poppins_400Regular',borderWidth: errors.username && 1, borderColor: errors.username && colors.red}}/>
                        {errors.username && <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 10, color: 'red' }}>{errors.username}</Text>}

                        <Input isPassword onChange={handleChange("password")} value={values.password} ph="Senha *" style={{fontFamily: 'Poppins_400Regular',borderWidth: errors.password && 1, borderColor: errors.password && colors.red}}/>
                        {errors.password && <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 10, color: 'red' }}>{errors.password}</Text>}

                        <Input isPassword onChange={handleChange("verifyPassword")} value={values.verifyPassword} ph="Confirme sua senha *" style={{fontFamily: 'Poppins_400Regular',borderWidth: errors.verifyPassword && 1, borderColor: errors.verifyPassword && colors.red}}/>
                        {errors.verifyPassword && <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 10, color: 'red' }}>{errors.verifyPassword}</Text>}
                    </FormItems>
                    <Button style={{marginBottom: 20}} onPress={handleSubmit} icon={<Icon size={30} name="chevron-double-right" color={colors.background} style={{marginRight: 8}}/>} bgColor={colors.primary}></Button>
                    </>
                )}
            </Formik>
            </ScrollView>
        </SafeAreaView>
    )
}