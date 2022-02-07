import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import { Login } from '../pages/FreeAccess/Login'
import { ForgotPassword } from '../pages/FreeAccess/ForgotPassword'
import { Register } from '../pages/FreeAccess/Register';
import { ClientRegister } from '../pages/FreeAccess/ClientRegister'
import { Onboarding } from '../pages/FreeAccess/Onboarding'
import { PetshopRegister } from '../pages/FreeAccess/PetshopRegister'
import { Image, Text, View } from 'react-native';
import colors from '../styles/colors';
import { PetshopRegisterStepTwo } from '../pages/FreeAccess/PetshopRegisterStepTwo';
import { PetshopRegisterStepThree } from '../pages/FreeAccess/PetshopRegisterStepThree';
import { ModalComponent } from '../components/ModalComponent';
import { useModal } from '../contexts/modal';

const Free = createStackNavigator();

export const FreeRoutes = () => {
    const {isVisible} = useModal();

    return(
        <Free.Navigator initialRouteName="Onboarding">
            <Free.Screen 
                name="Onboarding"
                component={Onboarding}
                options={{
                    header: () => null,
                    gestureEnabled: false
                }}
            />

            <Free.Screen 
                name="Login"
                component={Login}
                options={{
                    header: () => null,
                    gestureEnabled: false
                }}
            />

            <Free.Screen 
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    header: () => null,
                    gestureEnabled: false
                }}
            />

            <Free.Screen 
                name="Register"
                component={Register}
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
                    gestureEnabled: false
                }}
            />

            <Free.Screen 
                name="ClientRegister"
                component={ClientRegister}
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
                    gestureEnabled: false
                }}
            />

            <Free.Screen 
                name="PetshopRegister"
                component={PetshopRegister}
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
                    gestureEnabled: false
                }}
            />

            <Free.Screen 
                name="PetshopRegisterStepTwo"
                component={PetshopRegisterStepTwo}
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
                    gestureEnabled: false
                }}
            />

            <Free.Screen 
                name="PetshopRegisterStepThree"
                component={PetshopRegisterStepThree}
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
                    gestureEnabled: false
                }}
            />
            {isVisible && <ModalComponent />}
        </Free.Navigator>
    )
}