import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Input } from '../../../components/Input';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../styles/colors';
import { Button } from '../../../components/Button';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/auth';

export const NewVaccine = ({route}) => {
    const { navigate } = useNavigation();
    const {token} = useAuth();
    const {pet} = route.params;
    const [name, setName] = useState('');
    const [revaccination, setRevaccination] = useState('');
    const activeDate = new Date();

    async function createVaccine(){
        const aux = revaccination.split('/');

        await api.post('vaccine', {
            petId: pet._id,
            name,
            date: activeDate.getFullYear() + '-' + (activeDate.getMonth() + 1).toString().padStart(2, '0') + '-' + activeDate.getDate().toString().padStart(2, '0'),
            revaccination: aux[2] + '-' + aux[1] + '-' + aux[0]
        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(() => {
            navigate('PetshopTabs');
        }).catch((err) => Alert.alert(err.response.data.error))
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{padding: 20}}>
                <View style={{justifyContent: 'space-between', marginBottom: 20}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18, marginBottom: 10}}>Nova vacina - {pet.name}</Text>
                    <Input value={name} onChange={(e) => setName(e)} style={{marginTop: 10, fontFamily: 'Poppins_400Regular'}} ph="Nome da Vacina"/>
                    <TextInputMask
                        placeholder="Data da Revacinação"
                        style={{backgroundColor: 'white', alignSelf: 'stretch', height: 50, borderRadius: 8, paddingLeft: 10, marginVertical: 10, fontFamily: 'Poppins_400Regular'}}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={revaccination}
                        onChangeText={e => setRevaccination(e)}
                    />
                    <Button bgColor={colors.primary} onPress={() => createVaccine()}>Criar Vacina</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}