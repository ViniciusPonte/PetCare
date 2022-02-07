import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import colors from '../styles/colors';

Icon.loadFont();

import { Home } from '../pages/UserAccess/Home';
import { Map } from '../pages/UserAccess/Map';
import { Account } from '../pages/UserAccess/Account';
import { Schedule } from '../pages/UserAccess/Schedule';
import { Favorites } from '../pages/UserAccess/Favorites';

const Tab = createMaterialBottomTabNavigator();

export const UserTabs = () => {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor={colors.primary}
        inactiveColor="#8c8c8c"
        barStyle={{
        backgroundColor: colors.background,
    }}>
        <Tab.Screen
            name="Schedule"
            component={Schedule}
            style={{marginBottom: 16}}
            options={{
                tabBarLabel: 'Agenda',
                tabBarIcon: ({color}) => <Icon name="event-note" size={20} color={color}/>,
            }}
        />
        <Tab.Screen
            name="Map"
            component={Map}
            style={{marginBottom: 16}}
            options={{
                tabBarLabel: 'Mapa',
                tabBarIcon: ({color}) => <Icon name="map" size={20} color={color}/>,

            }}
        />
        <Tab.Screen
            name="Home"
            component={Home}
            style={{marginBottom: 16}}
            options={{
                tabBarLabel: 'Início',
                tabBarIcon: ({color}) => <Icon name="home" size={25} color={color}/>,
            }}
        />
        <Tab.Screen
            name="Favorites"
            component={Favorites}
            style={{marginBottom: 16}}
            options={{
                tabBarLabel: 'Favoritos',
                tabBarIcon: ({color}) => <Icon name="favorite" size={20} color={color}/>,
            }}
        />
        <Tab.Screen
            name="Account"
            component={Account}
            style={{marginBottom: 16}}
            options={{
                tabBarLabel: 'Conta',
                tabBarIcon: ({color}) => <Icon name="person" size={20} color={color} />,
            }}
        />
  </Tab.Navigator>
  );
};
