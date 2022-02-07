import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import {View, Image} from 'react-native';

import {PetshopTabs} from './petshopTabs';
import {NewVaccine} from '../pages/PetshopAccess/NewVaccine';
import {EditAccount} from '../pages/PetshopAccess/EditAccount';
import {CreateService} from '../pages/PetshopAccess/CreateService';
import colors from '../styles/colors';
import { MyAdverts } from '../pages/UserAccess/MyAdverts';
import { CreateAdvert } from '../pages/UserAccess/CreateAdvert';

const Petshop = createStackNavigator();

export const PetshopRoutes = () => {
    return(
        <Petshop.Navigator initialRouteName="PetshopTabs">
            <Petshop.Screen
                name="PetshopTabs"
                component={PetshopTabs}
                options={{
                    title: (
                        <View>
                            <Image style={{width: 30, height: 30, alignSelf: 'center'}} source={require('../../assets/logo.png')}/>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: colors.background,
                      },
                      headerTintColor: colors.primary,
                      headerTitleStyle: {
                        alignSelf: 'center'
                        },
                    headerRight: () => (
                        <View/>
                    ),
                    headerLeft: () => (
                        <View/>
                    ),
                gestureEnabled: false,
                }}
            />
            <Petshop.Screen
                name="NewVaccine"
                component={NewVaccine}
                options={{
                    title: (
                        <View>
                            <Image style={{width: 30, height: 30, alignSelf: 'center'}} source={require('../../assets/logo.png')}/>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: colors.background,
                      },
                      headerTintColor: colors.primary,
                      headerTitleStyle: {
                        alignSelf: 'center'
                        },
                    headerRight: () => (
                        <View/>
                    ),
                gestureEnabled: false,
                }}
            />
            <Petshop.Screen
                name="EditAccount"
                component={EditAccount}
                options={{
                    title: (
                        <View>
                            <Image style={{width: 30, height: 30, alignSelf: 'center'}} source={require('../../assets/logo.png')}/>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: colors.background,
                      },
                      headerTintColor: colors.primary,
                      headerTitleStyle: {
                        alignSelf: 'center'
                        },
                    headerRight: () => (
                        <View/>
                    ),
                gestureEnabled: false,
                }}
            />
            <Petshop.Screen
                name="CreateService"
                component={CreateService}
                options={{
                    title: (
                        <View>
                            <Image style={{width: 30, height: 30, alignSelf: 'center'}} source={require('../../assets/logo.png')}/>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: colors.background,
                      },
                      headerTintColor: colors.primary,
                      headerTitleStyle: {
                        alignSelf: 'center'
                        },
                    headerRight: () => (
                        <View/>
                    ),
                gestureEnabled: false,
                }}
            />
            <Petshop.Screen
                name="MyAdverts"
                component={MyAdverts}
                options={{
                    title: (
                        <View>
                            <Image style={{width: 30, height: 30, alignSelf: 'center'}} source={require('../../assets/logo.png')}/>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: colors.background,
                      },
                      headerTintColor: colors.primary,
                      headerTitleStyle: {
                        alignSelf: 'center'
                        },
                    headerRight: () => (
                        <View/>
                    ),
                gestureEnabled: false,
                }}
            />
            <Petshop.Screen
                name="CreateAdvert"
                component={CreateAdvert}
                options={{
                    title: (
                        <View>
                            <Image style={{width: 30, height: 30, alignSelf: 'center'}} source={require('../../assets/logo.png')}/>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: colors.background,
                      },
                      headerTintColor: colors.primary,
                      headerTitleStyle: {
                        alignSelf: 'center'
                        },
                    headerRight: () => (
                        <View/>
                    ),
                gestureEnabled: false,
                }}
            />
        </Petshop.Navigator>
    )
}


