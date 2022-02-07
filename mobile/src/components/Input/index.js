import React from 'react';
import {InputUI} from './styles';

export const Input = ({ph, isPassword, value, onChange, style, max}) => {
    return (
        <InputUI style={style} placeholder={ph} secureTextEntry={isPassword} value={value} onChangeText={onChange} maxLength={max}/>
    )
}