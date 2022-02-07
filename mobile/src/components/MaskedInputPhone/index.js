import React from 'react';
import {MaskedInput} from './styles';

export const MaskedInputPhone = ({ph, isPassword, value, onChange, style}) => {
    return (
        <MaskedInput style={style} placeholder={ph} secureTextEntry={isPassword} value={value} onChangeText={onChange} type={'cel-phone'} options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
        }}/>
    )
}