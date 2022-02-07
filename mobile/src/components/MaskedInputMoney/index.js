import React from 'react';
import {MaskedInput} from './styles';

export const MaskedInputMoney = ({ph, value, onChange, style}) => {
    return (
        <MaskedInput style={style} placeholder={ph} value={value} onChangeText={onChange} type={'cpf'} type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$',
          suffixUnit: ''
        }}/>
    )
}