import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatAge } from '../../utils/formatAge';
import colors from '../../styles/colors';
import { ScheduleOptions } from '../../modals/ScheduleOptions';
import { useModal } from '../../contexts/modal';
import { useAuth } from '../../contexts/auth';
import { formatGender } from '../../utils/formatGender';
import { formatType } from '../../utils/formatType';
import { PatientOptions } from '../../modals/PatientOptions';

export const CardPatient = ({patient}) => {
    const {setIsVisible, setContent} = useModal();
    
    return (
        <TouchableOpacity style={styles.sched} onPress={() => {
            setIsVisible(true);
            setContent(<PatientOptions patient={patient}/>);
        }}>
            {formatType(patient.pet.type)}
            <View style={{flex: 1, marginLeft: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: '60%'}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold'}}>{patient.pet.name}</Text>
                    <Text numberOfLines={1} style={{fontFamily: 'Poppins_400Regular'}}>Dono: {patient.user.name}</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {formatGender(patient.pet.gender)}
                    <Text style={{fontFamily: 'Poppins_400Regular'}}>{formatAge(patient.pet.age)}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    sched: {
      padding: 12, 
      width:  "95%",
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