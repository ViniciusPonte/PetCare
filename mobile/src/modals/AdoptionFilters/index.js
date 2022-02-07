import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { useAdoption } from '../../contexts/adoption';
import { useModal } from '../../contexts/modal';

export const AdoptionFilters = () => {
    const {setGenderFilter, setTypeFilter, genderFilter, typeFilter} = useAdoption();
    const {setIsVisible, setContent} = useModal();

    return (
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 15, maxHeight: '80%', width: '100%'}}>
            <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginBottom: 5}}>Gênero</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => setGenderFilter('Macho')} style={{flex: 0.47, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: genderFilter === 'Macho' ? colors.primarylighten : "#fff", padding: 12, borderRadius: 15, borderWidth: 2, borderColor: colors.primary}}>
                        <Icon name="gender-male" size={16} style={{marginRight: 8}} color={colors.primary}/>
                        <Text style={{fontFamily: 'Poppins_400Regular', color: colors.primary}}>Macho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGenderFilter('Fêmea')} style={{flex: 0.47, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: genderFilter === 'Fêmea' ? '#fee0ff' : '#fff', padding: 12, borderRadius: 15, borderWidth: 2, borderColor: '#fa66ff'}}>
                        <Icon name="gender-female" size={16} style={{marginRight: 8}} color="#fa66ff"/>
                        <Text style={{fontFamily: 'Poppins_400Regular', color: '#fa66ff'}}>Fêmea</Text>
                    </TouchableOpacity>
                </View>

            <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 18, marginVertical: 5}}>Tipo</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                    <TouchableOpacity onPress={() => setTypeFilter('Cachorro')} style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarylighten, marginRight: 5, marginBottom: 10, backgroundColor: typeFilter === 'Cachorro' ? colors.primarylighten : '#fff', padding: 10, borderRadius: 15, borderWidth: 2, borderColor: colors.primary}}>
                        <Icon name="dog" size={20} color={colors.primary} style={{marginRight: 5}}/>
                        <Text style={{fontFamily: 'Poppins_400Regular', color: colors.primary}}>Cachorro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTypeFilter('Gato')} style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarylighten, marginRight: 5, marginBottom: 10, backgroundColor: typeFilter === 'Gato' ? colors.primarylighten : '#fff', padding: 10, borderRadius: 15, borderWidth: 2, borderColor: colors.primary}}>
                        <Icon name="cat" size={20} color={colors.primary} style={{marginRight: 5}}/>
                        <Text style={{fontFamily: 'Poppins_400Regular', color: colors.primary}}>Gato</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTypeFilter('Ave')} style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarylighten, marginRight: 5, marginBottom: 10, backgroundColor: typeFilter === 'Ave' ? colors.primarylighten : '#fff', padding: 10, borderRadius: 15, borderWidth: 2, borderColor: colors.primary}}>
                        <Icon2 name="kiwi-bird" size={14} color={colors.primary} style={{marginRight: 5}}/>
                        <Text style={{fontFamily: 'Poppins_400Regular', color: colors.primary}}>Ave</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTypeFilter('Roedor')} style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarylighten, marginRight: 5, marginBottom: 10, backgroundColor: typeFilter === 'Roedor' ? colors.primarylighten : '#fff', padding: 10, borderRadius: 15, borderWidth: 2, borderColor: colors.primary}}>
                        <Icon name="rodent" size={20} color={colors.primary} style={{marginRight: 5}}/>
                        <Text style={{fontFamily: 'Poppins_400Regular', color: colors.primary}}>Roedor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTypeFilter('Coelho')} style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarylighten, marginRight: 5, marginBottom: 10, backgroundColor: typeFilter === 'Coelho' ? colors.primarylighten : '#fff', padding: 10, borderRadius: 15, borderWidth: 2, borderColor: colors.primary}}>
                        <Icon name="rabbit" size={20} color={colors.primary} style={{marginRight: 5}}/>
                        <Text style={{fontFamily: 'Poppins_400Regular', color: colors.primary}}>Coelho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTypeFilter('Réptil')} style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarylighten, marginRight: 5, marginBottom: 10, backgroundColor: typeFilter === 'Réptil' ? colors.primarylighten : '#fff', padding: 10, borderRadius: 15, borderWidth: 2, borderColor: colors.primary}}>
                        <Icon name="turtle" size={20} color={colors.primary} style={{marginRight: 5}}/>
                        <Text style={{fontFamily: 'Poppins_400Regular', color: colors.primary}}>Réptil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTypeFilter('Peixe')} style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarylighten, marginRight: 5, marginBottom: 10, backgroundColor: typeFilter === 'Peixe' ? colors.primarylighten : '#fff', padding: 10, borderRadius: 15, borderWidth: 2, borderColor: colors.primary}}>
                        <Icon name="fish" size={20} color={colors.primary} style={{marginRight: 5}}/>
                        <Text style={{fontFamily: 'Poppins_400Regular', color: colors.primary}}>Peixe</Text>
                    </TouchableOpacity>
                </View>

            <Button bgColor={colors.primary} onPress={() => {
                setIsVisible(false);
                setContent(null);
            }}>Aplicar</Button>
            <Button bgColor={colors.gray} cancel onPress={() => {
                setGenderFilter('');
                setTypeFilter('');
                setIsVisible(false);
                setContent(null);
            }}>Limpar</Button>
        </View>
    );

}