import styled from 'styled-components/native'
import colors from '../../../styles/colors'

export const LegendForm = styled.Text`
    text-transform: uppercase;
    font-family: 'Poppins_600SemiBold';
`
;

export const FormItems = styled.View`
    margin-top: 5px;
`
;

export const DayButton = styled.TouchableOpacity`
    padding: 6px;
    border-radius: 5px;
    background-color: ${props => props.isActive ?  colors.primary : colors.gray};
`
;