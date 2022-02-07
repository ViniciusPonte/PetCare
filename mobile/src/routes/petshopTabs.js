import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import colors from '../styles/colors';

Icon.loadFont();

import { Schedule } from '../pages/PetshopAccess/Schedule';
import { Account } from '../pages/PetshopAccess/Account'
import { Patients } from '../pages/PetshopAccess/Patients';
import { Services } from '../pages/PetshopAccess/Services';
import { Avaliations } from '../pages/PetshopAccess/Avaliations';

const Tab = createMaterialBottomTabNavigator();

export const PetshopTabs = () => {
  return (
    <Tab.Navigator
        initialRouteName="Schedule"
        activeColor={colors.primary}
        inactiveColor="#8c8c8c"
        barStyle={{
            backgroundColor: colors.background,
        }}
    >
        <Tab.Screen
            name="Schedule"
            component={Schedule}
            style={{marginBottom: 16}}
            options={{
                tabBarLabel: 'Agenda',
                tabBarIcon: ({color}) => <Icon name="calendar-month" size={20} color={color}/>,
            }}
        />

        <Tab.Screen
            name="Patients"
            component={Patients}
            style={{marginBottom: 16}}
            options={{
                tabBarLabel: 'Pacientes',
                tabBarIcon: ({color}) => <Icon name="paw" size={20} color={color}/>,
            }}
        />

        <Tab.Screen
            name="Services"
            component={Services}
            style={{marginBottom: 16}}
            options={{
                tabBarLabel: 'Serviços',
                tabBarIcon: ({color}) => <Icon name="dog-service" size={20} color={color}/>,
            }}
        />

        <Tab.Screen
            name="Avaliation"
            component={Avaliations}
            style={{marginBottom: 16}}
            options={{
                tabBarLabel: 'Avaliações',
                tabBarIcon: ({color}) => <Icon name="star-half-full" size={20} color={color}/>,
            }}
        />

        <Tab.Screen
            name="Account"
            component={Account}
            style={{marginBottom: 16}}
            options={{
                tabBarLabel: 'Conta',
                tabBarIcon: ({color}) => <Icon name="office-building" size={20} color={color} />,
            }}
        />
        
  </Tab.Navigator>
  );
};
