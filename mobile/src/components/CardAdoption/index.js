import React from 'react';
import {View, Text, Image, StyleSheet, Linking, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../contexts/auth';
import { useChange } from '../../contexts/change';
import { api } from '../../services/api';
import colors from '../../styles/colors';
import { formatAge } from '../../utils/formatAge';
import {Button} from '../Button';

export const CardAdoption = ({advert, isMine}) => {
    const {token} = useAuth();
    const {setChange} = useChange();

    function callWhatsapp(phone, title){
        Linking.openURL(`https://api.whatsapp.com/send?phone=55${phone.replace(/[^0-9]/g, '')}&text=Olá%20!%20Estou%20entrando%20em%20contato%20a%20respeito%20do%20anúncio%20sobre%20${title}`) 
    }

    async function deleteAdvert(id){
        await api.delete(`adoption/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(() => {
            setChange(true);
            setChange(false);
        }).catch(err => {
            Alert.alert(err.response.data.error)
        })
    }

    return (
        <View style={styles.card}>
            <View style={{borderRadius: 20}}>
                <Image resizeMode='cover' source={{uri: advert.photo}} style={{width: 120, height: 100, borderRadius: 20}}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <Text style={{marginRight: 5, fontFamily: 'Poppins_600SemiBold', width: '50%', fontSize: 14}} numberOfLines={2}>{advert.title}</Text>
                {advert.gender === 'Macho' ? <Icon name='gender-male' color='#0066FF' size={20}/> : <Icon name='gender-female' color='#FC6FFF' size={20}/>}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start'}}>
                <Icon name='balloon' color='#FF0000' size={20} style={{marginRight: 5}}/>
                <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 12}}>{formatAge(advert.age)}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start'}}>
                <Icon name='map-marker-radius-outline' color='#000' size={20}  style={{marginRight: 5}}/>
                <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 12, width: '80%'}}  numberOfLines={4}>{advert.city + ' - ' + advert.state}</Text>
            </View>
            {isMine ? <Button onPress={() => deleteAdvert(advert._id)} bgColor={colors.red} style={{height: 30}} icon={<Icon name="delete" color="white" size={16} style={{marginRight: 8}}/>}>Deletar</Button>
            : <Button onPress={() => callWhatsapp(advert.phone, advert.title)} bgColor="#00BB2D" style={{height: 30}} icon={<Icon name="whatsapp" color="white" size={16} style={{marginRight: 8}}/>}>Contato</Button>}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 0.5,
      justifyContent: 'center', 
      backgroundColor: 'white',
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 15,
      width: '90%',
      alignSelf: 'center',
      alignItems: 'center',
      marginVertical: 5,
      shadowColor: "#c41a7a",
      shadowOffset: {
        width: 2,
        height: 10
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
});