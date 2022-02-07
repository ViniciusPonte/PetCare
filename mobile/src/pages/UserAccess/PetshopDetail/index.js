import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Linking } from 'react-native';
import { useAuth } from '../../../contexts/auth';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useModal } from '../../../contexts/modal';
import { ModalComponent } from '../../../components/ModalComponent';
import { Picker } from '@react-native-picker/picker'
import { usePet } from '../../../contexts/pet';
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import {ViewModal} from './styles';
import { ScheduleModal } from '../../../modals/ModalSchedule';
import { useChange } from '../../../contexts/change';

export const PetshopDetail = ({route}) => {
    const {user, token} = useAuth();
    const [services, setServices] = useState([]);
    const [modal, setModal] = useState(false);
    const [clickedService, setClickedService] = useState();
    const {petshop} = route.params;
    const { navigate } = useNavigation();
    const [loader, setLoader] = useState(false);
    const {isVisible} = useModal();
    const {setSelectedPet, selectedPet} = usePet();
    const [pets, setPets] = useState([]);
    const [icon, setIcon] =  useState(false);
    const [average, setAverage] = useState(0);
    const [total, setTotal] = useState(0);
    const {setChange, change} = useChange();

    useEffect(() => {
        async function getData(){
            await api.get(`pets/${user._id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then(response => {
                setPets(response.data);
                setSelectedPet(response.data[0]);
            })
            .catch(err => Alert.alert(err.response.data.error))
        }

        getData();
    }, []);
    
    useEffect(() => {
        async function getData(){
            await api.get(`services/${petshop._id}?type=${selectedPet.type}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
            .then(setLoader(true))
            .then(response => {
                setLoader(false);
                setServices(response.data);
                console.log(response.data);
            })
            .catch(err => {
                setLoader(false);
                console.log(err);
            })
        }
        selectedPet && getData();
    }, [selectedPet]);

    useEffect(() => {
        async function isFavorited(){
            await api.get(`is_favorite/${user._id}/${petshop._id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(response => {
                if(response.data === true){
                    setIcon(true);
                } else {
                    setIcon(false);
                }
            })
            .catch(err => console.log(err))
        }

        isFavorited();
    }, []);

    useEffect(() => {
        async function getData(){
          await api.get(`avaliation/${petshop._id}/${user._id}`, {
            headers: {
              Authorization: "Bearer " + token,
            }
          })
          .then(response => {
            setAverage(response.data.average);
            setTotal(response.data.total);
          })
          .catch(err => {
            Alert.alert(err.response.data.error)
          })
        }
  
        getData()
    }, [change])

    async function toggleFavorite(petshopId){
        if(icon){
          await api.delete(`favorites/${user._id}/${petshopId}`, {
            headers: {
              Authorization: "Bearer " + token,
            }
          })
          .then(response => {
            setChange(true);
            setChange(false);
            setIcon(false)
          })
          .catch(err => console.log(err))
        } else {
          await api.post(`favorites`, {
            userId: user._id,
            petshopId
          }, {
            headers: {
              Authorization: "Bearer " + token,
            }
          })
          .then(response => {
            setChange(true);
            setChange(false);
            setIcon(true)
          })
          .catch(err => console.log(err))
        }
    }

    const message = `Olá!%20${petshop.name},%20gostaria%20de%20tirar%20uma%20dúvida.`

    const Service = ({service}) => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, backgroundColor: colors.gray, padding: 15, borderRadius: 10}}>
                <View>
                    <Text style={{fontFamily: 'Poppins_600SemiBold'}}>{service.name}</Text>
                    <Text style={{fontFamily: 'Poppins_400Regular'}}>{service.price}</Text>
                </View>
                <TouchableOpacity style={{backgroundColor: colors.primary, padding: 8, borderRadius: 10}} onPress={() => {
                    setClickedService(service);
                    setModal(!modal);
                }}>
                    <Text style={{color: 'white', fontFamily: 'Poppins_400Regular'}}>Agendar</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderService = ({item}) => <Service service={item}/>

    return (
        <SafeAreaView style={{flex: 1}}>
            <Image source={{uri: petshop.photoUri}} style={{width: 400, height: 180}}/>
            <TouchableOpacity style={{position: 'absolute', top: 20, right: 20, backgroundColor: colors.green, padding: 5, borderRadius: 50}}>
                <Icon name="whatsapp" size={30} color="white" onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55${petshop.phone.replace(/[^0-9]/g, '')}&text=${message}`)}/>
            </TouchableOpacity>
            <View style={{padding: 20, flex: 1, paddingBottom: 0}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', textTransform: 'uppercase', fontSize: 17}}>{petshop.name}</Text>
                    {icon ? <Icon name="heart" size={30} color={colors.red} onPress={() => toggleFavorite(petshop._id)}/> : <Icon name="heart-outline" size={30} color={colors.red} onPress={() => toggleFavorite(petshop._id)}/>}
                </View>
                <TouchableOpacity onPress={() => navigate('Avaliations',  {petshop})} style={{flexDirection: 'row', alignItems: 'flex-end', marginBottom:  5}}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={average}
                        starSize={15}
                        fullStarColor="#edc600"
                        halfStarColor="#edc600"
                        emptyStarColor="#000"
                        halfStarEnabled={true}
                    />
                    <Text style={{marginLeft: 5}}>{"(" + total + ")"}</Text>
                </TouchableOpacity>
                {selectedPet && (
                    <>
                    <View style={{backgroundColor: 'white', borderRadius: 8, marginVertical: 8}}>
                        <Picker 
                            selectedValue={selectedPet}
                            style={{ height: 50, color: 'black'}}
                            itemStyle={{fontFamily: 'Poppins_400Regular'}}
                            onValueChange={(itemValue, itemIndex) => setSelectedPet(itemValue)}
                        >
                            {pets.map((item, index) => (
                                <Picker.Item key={index} label={item.name} value={item}/>
                            ))}
                        </Picker>
                    </View>

                    {loader ? <ActivityIndicator color={colors.primary} size={30}/> : (
                        services.length !== 0 ?
                        <FlatList 
                            contentContainerStyle={{paddingBottom: 10, paddingTop: 10}}
                            data={services}
                            renderItem={renderService}
                            keyExtractor={(item) => item.id}
                        />
                        : (
                            <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                                <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe nenhum serviço para {selectedPet.gender === 'Macho' ? 'o' : 'a'} {selectedPet.name} no momento :(</Text>
                            </View>
                        )
                    )}

                    </>
                )}
            </View>
            <Modal 
                isVisible={modal} 
                swipeDirection="down"
                onSwipeComplete={() => {setModal(false); setClickedService(null)}}
                onSwipeCancel={() => setClickedService(clickedService)}
                onBackdropPress={() => {setModal(false); setClickedService(null)}}
                style={{justifyContent: 'flex-end', margin: 0, padding: 0}}
            >
                <ViewModal>
                    <ScheduleModal petshopId={petshop._id} service={clickedService}/>
                </ViewModal>
            </Modal>
            {isVisible && <ModalComponent />}
        </SafeAreaView>
    )
}