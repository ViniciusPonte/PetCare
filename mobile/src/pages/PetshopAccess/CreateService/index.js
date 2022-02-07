import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Input } from '../../../components/Input';
import { MaskedInputMoney } from '../../../components/MaskedInputMoney';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/auth';
import colors from '../../../styles/colors';
import { Button } from '../../../components/Button';
import { api } from '../../../services/api';
import { useChange } from '../../../contexts/change';

export const CreateService = () => {
    const {user, token} = useAuth();
    const {setChange} = useChange();
    const { navigate } = useNavigation();
    const services_categories = user.services_categories;
    const pet_categories = user.pet_categories;

    const [name, setName] = useState('');
    const [type, setType] = useState(pet_categories[0]);
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(services_categories[0]);

    async function createService(){
        await api.post(`service`, {
            petshopId: user._id,
            name,
            type,
            price,
            category
        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(() => {
            setChange(true);
            setChange(false);
            navigate('Services');
        })
        .catch(err => {
            Alert.alert(err.response.data.error)
        })
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{padding: 20}}>
                <View style={{justifyContent: 'space-between', marginBottom: 20}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18, marginBottom: 10}}>Novo serviço</Text>

                    <Text style={{fontFamily: 'Poppins_600SemiBold', padding: 5}}>Nome do Serviço</Text>
                    <Input value={name} onChange={(e) => setName(e)} style={{fontFamily: 'Poppins_400Regular'}} ph="Ex: Banho, Consulta etc."/>

                    <Text style={{fontFamily: 'Poppins_600SemiBold', padding: 5, marginTop: 10}}>Para qual tipo de pet?</Text>
                    <View style={{backgroundColor: 'white', borderRadius: 8}}>
                        <Picker 
                            selectedValue={type}
                            style={{ height: 50, color: 'black'}}
                            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                        >
                            {pet_categories.map((item, index) => (
                                <Picker.Item key={index} label={item} value={item}/>
                            ))}
                        </Picker>
                    </View>

                    <Text style={{fontFamily: 'Poppins_600SemiBold', padding: 5, marginTop: 10}}>Qual a categoria do serviço?</Text>
                    <View style={{backgroundColor: 'white', borderRadius: 8}}>
                        <Picker 
                            selectedValue={category}
                            style={{ height: 50, color: 'black'}}
                            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                        >
                            {services_categories.map((item, index) => (
                                <Picker.Item key={index} label={item} value={item}/>
                            ))}
                        </Picker>
                    </View>

                    <Text style={{fontFamily: 'Poppins_600SemiBold', padding: 5, marginTop: 10}}>Qual o valor?</Text>
                    <MaskedInputMoney ph="R$00,00" value={price} onChange={(e) => setPrice(e)}/>

                    <Button bgColor={colors.primary} onPress={() => createService()}>Criar</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}