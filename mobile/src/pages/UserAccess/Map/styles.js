import styled from 'styled-components/native';
import Map from 'react-native-maps';

export const MapView = styled(Map)`
    width: 100%;
    align-self: center;
    height: 100%;
`;

export const ViewModal = styled.View`
    background-color: white; 
    padding: 20px; 
    padding-top: 5px;
    border-top-left-radius: 15px; 
    border-top-right-radius: 15px;  
    width: 100%;
`;