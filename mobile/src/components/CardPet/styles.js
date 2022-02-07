import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const ViewPet = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80px;
    padding-left: 10px;
    width: 100%;
    margin-bottom: 20px;
    background-color: ${colors.primarylighten};
    border-radius: 20px;
    padding-right: 20px;
`;

export const ImagePet = styled.Image`
    width: 80px;
    border-radius: 50px;
    height: 80px;
`;

export const NamePet = styled.Text`
    font-weight: bold;
`;