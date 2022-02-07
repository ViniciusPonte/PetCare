import React from 'react';
import { ButtonUI, ButtonText } from './styles';

export const Button = (props) => {
    return (
        <ButtonUI style={props.style} bgColor={props.bgColor} onPress={props.onPress}>
            {props.icon}
            <ButtonText cancel={props.cancel}>{props.children}</ButtonText>
        </ButtonUI>
    )
}