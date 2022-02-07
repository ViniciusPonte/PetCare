import React from 'react';
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../../../styles/colors';
import { useAuth } from '../../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../../components/Button';

export const Account = () => {
    const { signOut, user } = useAuth();
    const { navigate } = useNavigation();

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <Image source={{uri: user.photoUri}} style={{width: '100%', height: 200}}/>  
                <View style={{padding: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18}}>{user.name}</Text> 
                        <TouchableOpacity onPress={signOut}>
                            <Icon name="logout" size={24} color={colors.red}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                            <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Nome</Text>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigate('EditAccount', {type: 'nome'})}>
                                <Text style={{fontFamily: 'Poppins_400Regular'}}>{user.name}</Text>
                                <Icon name="chevron-right" style={{marginLeft: 8}} size={20} color={colors.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                            <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Telefone</Text>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigate('EditAccount', {type: 'telefone'})}>
                                <Text style={{fontFamily: 'Poppins_400Regular'}}>{user.phone}</Text>
                                <Icon name="chevron-right" style={{marginLeft: 8}} size={20} color={colors.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                            <Text style={{fontFamily: 'Poppins_600SemiBold'}}>E-mail</Text>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigate('EditAccount', {type: 'e-mail'})}>
                                <Text style={{fontFamily: 'Poppins_400Regular'}}>{user.email}</Text>
                                <Icon name="chevron-right" style={{marginLeft: 8}} size={20} color={colors.primary}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
            <Button bgColor={colors.primary} onPress={() => navigate('MyAdverts')} style={{margin: 20, marginBottom: 0}}>Anúncios de Adoção</Button>
            <Button bgColor={colors.primary} onPress={() => navigate('Services')} style={{margin: 20}}>Meus Serviços</Button>
        </SafeAreaView>
    )
}