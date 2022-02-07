import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import { useModal } from '../../contexts/modal';
import { ServiceOptions } from '../../modals/ServiceOptions';

export const CardService = ({service}) => {
    const {setIsVisible, setContent} = useModal();
    
    return (
        <TouchableOpacity style={styles.sched} onPress={() => {
            setIsVisible(true);
            setContent(<ServiceOptions service={service}/>);
        }}>
            <View>
                <Text style={{fontFamily: 'Poppins_600SemiBold'}}>{service.name} - {service.type}</Text>
                <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 12}}>{service.category}</Text>
            </View>
            <View>
                <Text style={{fontFamily: 'Poppins_600SemiBold'}}>{service.price}</Text>
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