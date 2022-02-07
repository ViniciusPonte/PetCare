import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';

export function formatGender(gender){
    if(gender === 'Macho'){
        return <Icon name="gender-male"  size={20} color={colors.primary}/>
    } else {
        return <Icon name="gender-female"  size={20} color="#FC6FFF"/>
    }
}