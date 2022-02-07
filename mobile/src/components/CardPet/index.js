import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import { formatAge } from '../../utils/formatAge';
import {ImagePet} from './styles';

export const CardPet = ({pet, onPress}) => {
    return (
        <TouchableOpacity  onPress={onPress} style={styles.petview}>
            {pet.photoUri && <ImagePet source={{uri: pet.photoUri}}/>}
            
            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1}}>
                <View style={{marginLeft: 8}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 16}}>{pet.name}</Text>
                    <Text style={{fontSize: 16, fontFamily: 'Poppins_400Regular'}}>{formatAge(pet.age)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    petview: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 15, 
      alignSelf: 'center',
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      backgroundColor: colors.gray, 
      marginBottom: 15, 
      borderRadius: 15,
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