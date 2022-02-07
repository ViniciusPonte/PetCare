import React from 'react';
import { useAuth } from '../contexts/auth';
import { FreeRoutes } from './free.routes';
import { UserRoutes } from './user.routes';
import { PetshopRoutes } from './petshop.routes' 
import { ActivityIndicator, Image, View } from 'react-native';
import colors from '../styles/colors';

export const Routes = () => {
    const {user, type, loading} = useAuth();

    if (loading) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background}}>
                <Image style={{width: 100, height: 100}} source={require('../../assets/logo.png')}/>
                <ActivityIndicator color={colors.primary} style={{width: 40, marginTop: 20}} size={30} />
            </View> 
        );
    }

    if (!user){
        return <FreeRoutes />;
    } else {
        if(type === "user"){
            return <UserRoutes />;
        }else {
            return <PetshopRoutes />
        }
        
    }
}