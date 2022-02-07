import React, { useState } from 'react'
import { Text, SafeAreaView, ScrollView, Alert, View } from 'react-native'
import { Button } from '../../../components/Button'
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors'
import { DayButton, FormItems, LegendForm } from './styles';
import { useNavigation } from '@react-navigation/native';
import SelectMultiple from 'react-native-select-multiple'
import { Picker } from '@react-native-picker/picker'

Icon.loadFont();

export const PetshopRegisterStepTwo = ({route}) => {
    const [sunday, setSunday] = useState(false);
    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [saturday, setSaturday] = useState(false);

    const [initialTime, setInitialTime] = useState("08:00");
    const [finalTime, setFinalTime] = useState("18:00");

    const {data} = route.params;
    const categoriasPets = ['Cachorro', 'Gato', 'Peixe', 'Ave', 'Coelho', 'Roedor', 'Réptil'];
    const [selectedCategoriesPets, setSelectedCategoriesPets] = useState([]);

    const onSelectionsChangePets = (selectedCategoriesPets) => {
        setSelectedCategoriesPets(selectedCategoriesPets);
    }
    
    function returnListPets(){
        let categories = [];
        selectedCategoriesPets.map(cat => {
            categories.push(cat.value);
        });
        return categories;
    }
    
    const categoriasServices = ['Banho e Tosa', 'Vacinação', 'Castração', 'Cliníca'];
    const [selectedCategoriesServices, setSelectedCategoriesServices] = useState([]);

    const onSelectionsChangeServices = (selectedCategoriesServices) => {
        setSelectedCategoriesServices(selectedCategoriesServices);
    }
    
    function returnListServices(){
        let categories = [];
        selectedCategoriesServices.map(cat => {
            categories.push(cat.value);
        });
        return categories;
    }

    const { navigate } = useNavigation();

    const diasSemana = [
        {dia: sunday, num: 0}, 
        {dia: monday, num: 1}, 
        {dia: tuesday, num: 2}, 
        {dia: wednesday, num: 3}, 
        {dia: thursday, num: 4}, 
        {dia: friday, num: 5}, 
        {dia: saturday, num: 6}];

    function handleRegisterPetshop(){
        let days = []

        diasSemana.map(dia => {
            if(dia.dia){
                days.push(dia.num);
            }
        })

        if(days.length === 0){
            Alert.alert('Selecione pelo menos 1 dia na semana!');
        } else {

            const dados = {
                ...data,
                days,
                initialTime,
                pet_categories: returnListPets(),
                services_categories: returnListServices(),
                finalTime
            }
                
            if(dados.pet_categories.length === 0){
                return Alert.alert('Selecione pelo menos um tipo de pet!');
            } else {
                if(dados.services_categories.length === 0){
                    return Alert.alert('Selecione pelo menos um serviço!');
                } else {
                    navigate('PetshopRegisterStepThree', {data: dados});
                }
            }
    
        }
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{paddingHorizontal: 20, marginTop: 10}}>
                    <>
                    <FormItems>
                        <LegendForm>Selecione os dias de funcionamento</LegendForm>
                        <View horizontal style={{maxWidth: '100%', justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10}}>
                            <DayButton isActive={sunday} onPress={() => setSunday(!sunday)}><Text style={{fontFamily: 'Poppins_400Regular', color: sunday ? 'white' : 'black'}}>DOM</Text></DayButton>
                            <DayButton isActive={monday} onPress={() => setMonday(!monday)}><Text style={{fontFamily: 'Poppins_400Regular', color: monday ? 'white' : 'black'}}>SEG</Text></DayButton>
                            <DayButton isActive={tuesday} onPress={() => setTuesday(!tuesday)}><Text style={{fontFamily: 'Poppins_400Regular', color: tuesday ? 'white' : 'black'}}>TER</Text></DayButton>
                            <DayButton isActive={wednesday} onPress={() => setWednesday(!wednesday)}><Text style={{fontFamily: 'Poppins_400Regular', color: wednesday ? 'white' : 'black'}}>QUA</Text></DayButton>
                            <DayButton isActive={thursday} onPress={() => setThursday(!thursday)}><Text style={{fontFamily: 'Poppins_400Regular', color: thursday ? 'white' : 'black'}}>QUI</Text></DayButton>
                            <DayButton isActive={friday} onPress={() => setFriday(!friday)}><Text style={{fontFamily: 'Poppins_400Regular', color: friday ? 'white' : 'black'}}>SEX</Text></DayButton>
                            <DayButton isActive={saturday} onPress={() => setSaturday(!saturday)}><Text style={{fontFamily: 'Poppins_400Regular', color: saturday ? 'white' : 'black'}}>SAB</Text></DayButton>
                        </View>
                    </FormItems>

                    <FormItems style={{marginTop: 20}}>
                        <LegendForm>Selecione o horário de funcionamento</LegendForm>
                        <View style={{flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginVertical: 10}}>
                            <View>
                                <Text style={{fontFamily: 'Poppins_400Regular'}}>Horário Inicial</Text>
                                <Picker 
                                    selectedValue={initialTime}
                                    style={{ height: 50, width: '150%', color: 'black'}}
                                    onValueChange={(itemValue, itemIndex) => setInitialTime(itemValue)}
                                >
                                    <Picker.Item label="06:00" value="06:00"/>
                                    <Picker.Item label="07:00" value="07:00"/>
                                    <Picker.Item label="08:00" value="08:00"/>
                                    <Picker.Item label="09:00" value="09:00"/>
                                    <Picker.Item label="10:00" value="10:00"/>
                                    <Picker.Item label="11:00" value="11:00"/>
                                    <Picker.Item label="12:00" value="12:00"/>
                                </Picker>
                            </View>
                            <View>
                                <Text  style={{fontFamily: 'Poppins_400Regular'}}>Horário Final</Text>
                                <Picker 
                                    selectedValue={finalTime}
                                    style={{ height: 50, width: '150%', color: 'black'}}
                                    onValueChange={(itemValue, itemIndex) => setFinalTime(itemValue)}
                                >
                                    <Picker.Item label="16:00" value="16:00"/>
                                    <Picker.Item label="17:00" value="17:00"/>
                                    <Picker.Item label="18:00" value="18:00"/>
                                    <Picker.Item label="19:00" value="19:00"/>
                                    <Picker.Item label="20:00" value="20:00"/>
                                    <Picker.Item label="21:00" value="21:00"/>
                                    <Picker.Item label="22:00" value="22:00"/>
                                    <Picker.Item label="23:00" value="23:00"/>
                                </Picker>
                            </View>
                        </View>
                        
                    </FormItems>

                    <FormItems>
                        <LegendForm>Com quais pets você trabalha?</LegendForm>
                        <SelectMultiple
                            items={categoriasPets}
                            selectedItems={selectedCategoriesPets}
                            onSelectionsChange={onSelectionsChangePets} 
                            style={{marginVertical: 5, color: colors.primary}}
                            rowStyle={{backgroundColor: colors.background, borderBottomWidth: 0, padding: 10}}
                        />
                    </FormItems>

                    <FormItems>
                        <LegendForm>Com quais serviços você trabalha?</LegendForm>
                        <SelectMultiple
                            items={categoriasServices}
                            selectedItems={selectedCategoriesServices}
                            onSelectionsChange={onSelectionsChangeServices} 
                            style={{marginVertical: 5, color: colors.primary}}
                            rowStyle={{backgroundColor: colors.background, borderBottomWidth: 0, padding: 10}}
                        />
                    </FormItems>
                    </>
            <Button style={{marginBottom: 20}} onPress={() => handleRegisterPetshop()} icon={<Icon size={30} name="double-arrow" color={colors.background} style={{marginRight: 8}}/>} bgColor={colors.primary}></Button>
            </ScrollView>
        </SafeAreaView>
    )
}