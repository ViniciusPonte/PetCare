import styled from 'styled-components/native';

export const ButtonUI = styled.TouchableOpacity`
    background-color: ${props => props.bgColor};
    height: 50px;
    justify-content: center;
    margin-top: 10px;
    border-radius: 8px;
    align-items: center;
    flex-direction: row;
    align-self: stretch;
    border: ${props => `1px solid ${props.bgColor}`};
`;

export const ButtonText = styled.Text`
    text-align: center;
    align-items: center;
    color: ${props => props.cancel ? '#000' : '#fff'};
    font-family: Poppins_600SemiBold;
    text-transform: uppercase;
`;