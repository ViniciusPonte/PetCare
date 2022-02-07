import React, {useEffect, useState} from 'react';
import { Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, Platform, View, ActivityIndicator } from 'react-native'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../../contexts/auth';
import * as Location from 'expo-location';
import colors from '../../../styles/colors';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../services/api';
import { CardSchedule } from '../../../components/CardSchedule';
import { useModal } from '../../../contexts/modal';
import { ModalComponent } from '../../../components/ModalComponent';
import { useChange } from '../../../contexts/change';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon2.loadFont();

export const Home = () => {
    const { setUserLocation, user, setUser, token } = useAuth();
    const { navigate } = useNavigation();
    const [expoPushToken, setExpoPushToken] = useState(user.notificationToken);
    const [nextSchedule, setNextSchedule] = useState(null);
    const {isVisible} = useModal();
    const [loader, setLoader] = useState(true);
    const {change} = useChange();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
              return;
            }
            let location = await Location.getCurrentPositionAsync({})
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
            });
        })();
    }, []);


    async function registerForPushNotificationsAsync(){
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          setExpoPushToken(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
    };

    useEffect(() => {
        if(!user.notificationToken){
            registerForPushNotificationsAsync();
        } else {
            return;
        }
    }, []);

    useEffect(() => {
        async function saveUser(){
            await api.put(`user/${user._id}`, {
                notificationToken: expoPushToken,
            }, {
                headers:{
                    Authorization: 'Bearer ' + token,
                }
            })
            .then(response => {
                AsyncStorage.removeItem('@petcare:user');
                const data = {...user, notificationToken: expoPushToken};
                AsyncStorage.setItem('@petcare:user', JSON.stringify(data));
                if (response.status === 200){
                    setUser(data);
                }
            })
            .catch(err => Alert.alert(err.response.data.error))
        }

        saveUser();
    }, [expoPushToken]);

    useEffect(() => {
        async function getNextSchedule(){
            await api.get(`schedule/users/${user._id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then(response => {
                setLoader(false);
                setNextSchedule(response.data[0]);
            })
            .catch(err => {
                setLoader(false);
                Alert.alert(err.response.data.error)
            })
        }   

        getNextSchedule();
    }, [token, change])

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{padding: 20}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18}}>Olá, {user.name}</Text>

                <View style={{marginTop: 20, marginBottom: 60}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', marginBottom: 10}}>Próximo agendamento</Text>
                    {loader ? <ActivityIndicator style={{alignSelf: 'center'}}  color={colors.primary} size={30}/> : nextSchedule ? <CardSchedule schedule={nextSchedule}/> : (
                        <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                            <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe nenhum agendamento marcado.</Text>
                        </View>
                    )}
                </View>


                <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', marginBottom: 30}}>
                    <TouchableOpacity onPress={() => navigate('Map')} style={{flex: 0.5, backgroundColor: colors.primary, padding: 10, alignItems: 'center', borderRadius: 20, justifyContent: 'center'}}>
                        <Icon name="calendar-plus" size={55} color={colors.background}></Icon>
                        <Text style={{color: colors.background, fontSize: 16, fontFamily: 'Poppins_600SemiBold'}}>NOVO</Text>
                        <Text style={{color: colors.background, fontSize: 16, fontFamily: 'Poppins_600SemiBold'}}>AGENDAMENTO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigate('Pets')} style={{flex: 0.4, backgroundColor: colors.primary, padding: 10, alignItems: 'center', borderRadius: 20, justifyContent: 'center'}}>
                        <Icon name="paw" size={55} color={colors.background}></Icon>
                        <Text style={{color: colors.background, fontSize: 16, fontFamily: 'Poppins_600SemiBold'}}>MEUS PETS</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigate('Adoption')} style={{backgroundColor: colors.primary, padding: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 20, justifyContent: 'center'}}>
                    <Icon2 name="volunteer-activism" size={55} color={colors.background}></Icon2>
                    <Text style={{color: colors.background, fontSize: 16, fontFamily: 'Poppins_600SemiBold', marginLeft: 20}}>ADOTE UM BICHINHO</Text>
                </TouchableOpacity>

            </ScrollView>
            {isVisible && <ModalComponent />}
        </SafeAreaView>
    )
}