import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import {View, Image} from 'react-native';

import {UserTabs} from './userTabs';
import colors from '../styles/colors';
import { PetshopDetail } from '../pages/UserAccess/PetshopDetail';
import { Pets } from '../pages/UserAccess/Pets';
import { CreatePet } from '../pages/UserAccess/CreatePet';
import { FilteredSearch } from '../pages/UserAccess/FilteredSearch';
import { Adoption } from '../pages/UserAccess/Adoption';
import { MyAdverts } from '../pages/UserAccess/MyAdverts'
import { CreateAdvert } from '../pages/UserAccess/CreateAdvert'
import { Vaccines } from '../pages/UserAccess/Vaccines';
import { EditAccount } from '../pages/UserAccess/EditAccount';
import { EditPet } from '../pages/UserAccess/EditPet';
import { Avaliations } from '../pages/UserAccess/Avaliations';
import { Rate } from '../pages/UserAccess/Rate';

const User = createStackNavigator();

export const UserRoutes = () => {
    return(
        <User.Navigator initialRouteName="UserTabs">
            <User.Screen
                name="UserTabs"
                component={UserTabs}
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
            <User.Screen 
                name="PetshopDetail"
                component={PetshopDetail}
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

            <User.Screen 
                name="Pets"
                component={Pets}
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

            <User.Screen 
                name="CreatePet"
                component={CreatePet}
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

            <User.Screen 
                name="FilteredSearch"
                component={FilteredSearch}
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

            <User.Screen 
                name="Adoption"
                component={Adoption}
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

            <User.Screen 
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

            <User.Screen 
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

            <User.Screen 
                name="Vaccines"
                component={Vaccines}
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

            <User.Screen 
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

            <User.Screen 
                name="EditPet"
                component={EditPet}
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

            <User.Screen 
                name="Avaliations"
                component={Avaliations}
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

            <User.Screen 
                name="Rate"
                component={Rate}
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

        </User.Navigator>
    )
}


