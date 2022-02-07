import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import colors from '../styles/colors';

export function formatType(type){
    if(type === 'Cachorro'){
        return <Icon name="dog"  size={35} color="#000"/>
    } else if (type === 'Gato') {
        return <Icon name="cat"  size={35} color="#000"/>
    } else if (type === 'Peixe'){
        return <Icon name="fish"  size={35} color="#000"/>
    } else if (type === 'Ave'){
        return <Icon2 name="kiwi-bird"  size={35} color="#000"/>
    } else if (type === 'Coelho'){
        return <Icon name="rabbit"  size={35} color="#000"/>
    } else if (type === 'Roedor'){
        return <Icon name="rodent"  size={35} color="#000"/>
    } else if (type === 'Réptil'){
        return <Icon name="turtle"  size={35} color="#000"/>
    }
}