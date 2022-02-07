import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { formatDate } from '../../utils/formatDate';
import colors from '../../styles/colors';
import { ScheduleOptions } from '../../modals/ScheduleOptions';
import { useModal } from '../../contexts/modal';
import { useAuth } from '../../contexts/auth';

export const CardSchedule = ({schedule}) => {
    const {type} = useAuth();
    const {setIsVisible, setContent} = useModal();
    
    return (
        <TouchableOpacity onPress={() => {
            setIsVisible(true);
            setContent(<ScheduleOptions schedule={schedule}/>);
        }}>
            <View style={styles.sched}>
                <View style={{width: '70%'}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 18}}>{schedule.service.name}</Text>
                    {type === 'user'  ? (
                        <>
                        <Text></Text>
                        <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 16}}>{schedule.petshop.name}</Text>
                        </>
                    ) : (
                        <>
                        <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 16}}>Pet: {schedule.pet.name}</Text>
                        <Text numberOfLines={1} style={{fontFamily: 'Poppins_400Regular', fontSize: 16}}>Cliente: {schedule.user.name}</Text>
                        </>
                    )}
                </View>

                <View>
                    <Text style={{alignSelf: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 18}}>{formatDate(schedule.date)[0]}</Text>
                    <Text style={{alignSelf: 'center', fontFamily: 'Poppins_400Regular', fontSize: 16}}>{formatDate(schedule.date)[1]}</Text>
                    <Text style={{alignSelf: 'center', fontFamily: 'Poppins_400Regular', fontSize: 18}}>{schedule.time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    sched: {
      paddingHorizontal: 10,
      paddingVertical: 15, 
      width: "100%",
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