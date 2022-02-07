import React from 'react';
import {MaskedInput} from './styles';

export const MaskedInputCpf = ({ph, isPassword, value, onChange, style}) => {
    return (
        <MaskedInput style={style} placeholder={ph} secureTextEntry={isPassword} value={value} onChangeText={onChange} type={'cpf'}/>
    )
}