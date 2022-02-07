import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export const CardVaccine = ({vaccine}) => {

    function formatDate(date){
        const aux = date.toString();
        const aux2 = aux.split('T');
        const aux3 = aux2[0].split('-');
        return aux3[2] + '/' + aux3[1] + '/' + aux3[0]
    }

    return (
        <View style={styles.vaccine}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text></Text>
                <Text style={{fontFamily: 'Poppins_600SemiBold'}} numberOfLines={1}>{vaccine.name}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Data</Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}>{formatDate(vaccine.date)}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Revacinação</Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}>{formatDate(vaccine.revaccination)}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    vaccine: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: colors.gray, 
      padding: 14, 
      borderRadius: 15, 
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