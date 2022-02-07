import React, {useEffect, useState, useRef} from 'react';
import { SafeAreaView, View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { useAuth } from '../../../contexts/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../services/api';
import Modal from 'react-native-modal';
import colors from '../../../styles/colors';
import {MapView, ViewModal} from './styles';
import MapViewDirections from 'react-native-maps-directions';
import config from '../../../config';
import { formatDistance } from '../../../utils/formatDistance';
import { formatTime } from '../../../utils/formatTime';
import StarRating from 'react-native-star-rating';
import { useChange } from '../../../contexts/change';

export const Map = () => {
    const { navigate } = useNavigation();
    const mapEl = useRef(null);
    const {userLocation, token, user} = useAuth();
    const [clickedPetshop, setClickedPetshop] = useState(null);
    const [petshops, setPetshops] = useState([]);
    const [destination, setDestination] = useState(null);
    const [distance, setDistance] = useState(null);
    const [time, setTime] = useState(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [icon, setIcon] = useState(false);
    const [average, setAverage] = useState(0);
    const [total, setTotal] = useState(0);
    const {setChange} = useChange();

    useEffect(() => {
        resetStates();
    }, []);

    function resetStates(){
        setClickedPetshop(null);
        setDestination(null);
        setDistance(null);
        setTime(null);
        setSearch('');
    }

    useEffect(() => {
        async function isFavorited(){
            await api.get(`is_favorite/${user._id}/${clickedPetshop._id}`, {
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

        clickedPetshop && isFavorited();
    }, [clickedPetshop]);

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

    const categories = [
        {
            name: 'Cachorros',
            icon: <Icon name="dog" size={20} color={filter === 'Cachorros' ? 'white': colors.primary} style={{marginRight: 5}}/>,
        },
        {
            name: 'Gatos',
            icon: <Icon name="cat" size={20} color={filter === 'Gatos' ? 'white': colors.primary} style={{marginRight: 5}}/>,
        },
        {
            name: 'Peixes',
            icon: <Icon name="fish" size={20} color={filter === 'Peixes' ? 'white': colors.primary} style={{marginRight: 5}}/>,
        },
        {
            name: 'Aves',
            icon: <Icon2 name="kiwi-bird" size={14} color={filter === 'Aves' ? 'white': colors.primary} style={{marginRight: 5}}/>,
        },
        {
            name: 'Coelhos',
            icon: <Icon name="rabbit" size={20} color={filter === 'Coelhos' ? 'white': colors.primary} style={{marginRight: 5}}/>,
        },
        {
            name: 'Roedores',
            icon: <Icon name="rodent" size={20} color={filter === 'Roedores' ? 'white': colors.primary} style={{marginRight: 5}}/>,
        },
        {
            name: 'Répteis',
            icon: <Icon name="turtle" size={20} color={filter === 'Répteis' ? 'white': colors.primary} style={{marginRight: 5}}/>,
        },
    ];

    useEffect(() => {
        async function getData(){
          await api.get(`avaliation/${clickedPetshop._id}/${user._id}`, {
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
  
        clickedPetshop && getData()
    }, [clickedPetshop])

    useEffect(() => {
        async function getData(){
            await api.get(`petshop?ltd=${userLocation.latitude}&lgn=${userLocation.longitude}&filter=${filter}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            .then(response => {
                setPetshops(response.data.nearbyPetshops);
            })
            .catch(err => {
                console.log(err);
            })
        }
        getData();
    }, [filter]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                {userLocation &&
                   <>
                    <MapView
                        initialRegion={userLocation}
                        showsUserLocation={true}
                        zoomEnabled={true}
                        showsMyLocationButton={false}
                        showsCompass={false}
                        ref={mapEl}
                    >
                        {petshops.map((petshop, index) => (
                            <Marker 
                            key={index} 
                            tracksViewChanges={false}
                            coordinate={{
                                latitude: Number(petshop.latitude),
                                longitude: Number(petshop.longitude),
                            }} 
                            onPress={() => {
                                    setDestination(!destination ? {
                                        latitude: Number(petshop.latitude),
                                        longitude: Number(petshop.longitude),
                                        latitudeDelta: 0.014,
                                        longitudeDelta: 0.014,
                                    } : null);
                                    setTime(null);
                                    setDistance(null);
                                    setClickedPetshop(petshop);
                                }}
                                >
                                <Icon name="paw" size={30} color={colors.primary}/>
                            </Marker>
                        ))}
                        {destination && (
                            <MapViewDirections
                                origin={userLocation}
                                destination={destination}
                                apikey={config.googleApi}
                                strokeWidth={3}
                                strokeColor={colors.primary}
                                onReady={result => {
                                    setDistance(result.distance);
                                    setTime(result.duration);
                                    mapEl.current.fitToCoordinates(
                                        result.coordinates, {
                                            edgePadding: {
                                                top: 400,
                                                bottom: 400,
                                                left: 50,
                                                right: 50
                                            }
                                        }
                                    )
                                }}
                            />
                        )}
                    </MapView>
                    <View style={{position: 'absolute', top: 10, width: '100%'}}>
                        <View style={styles.searchBar}>
                            <TextInput style={{width: '80%', fontFamily: 'Poppins_300Light'}} value={search} onChangeText={(e) => setSearch(e)} placeholder="Qual petshop você procura?"/>
                            <TouchableOpacity style={{padding: 10}} onPress={() => {
                                navigate('FilteredSearch', {key: search})
                                setClickedPetshop(null);
                                setDestination(null);
                                setDistance(null);
                                setTime(null);
                                setSearch('');
                            }}>
                                <Icon name="magnify" size={20} color={colors.primary}/>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 20}} showsHorizontalScrollIndicator={false}>
                            {categories.map((category, index) => (
                                <TouchableOpacity key={index} style={{paddingHorizontal: 10, paddingVertical: 5, borderWidth: 2, borderColor: colors.primary, flexDirection: 'row',alignItems: 'center', marginRight: 10, backgroundColor: filter === category.name ? colors.primary : 'white', borderRadius: 10}}
                                 onPress={() => {
                                    if (filter !== ''){
                                        setFilter('');
                                    } else {
                                        setFilter(category.name)
                                    }
                                }}>
                                    {category.icon}
                                    <Text style={{color: filter === category.name ? 'white' : colors.primary, fontFamily: 'Poppins_400Regular'}}>{category.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    </>
                }
            </View>
            <Modal 
                isVisible={clickedPetshop} 
                swipeDirection="down"
                backdropOpacity={0}
                onSwipeComplete={() => {resetStates(); setTime(null)}}
                onBackdropPress={() => {resetStates(); setTime(null)}}
                onSwipeCancel={() => setClickedPetshop(clickedPetshop)}
                style={{justifyContent: 'flex-end', margin: 0}}
            >
                <ViewModal>
                    <View style={{alignSelf: 'center', width: 40, height: 4, backgroundColor: colors.gray, borderRadius: 15, marginTop: 10, marginBottom: 20}}/>
                    {clickedPetshop && (
                        <View style={{flexDirection: 'row'}}>

                            <Image source={{uri: clickedPetshop.photoUri}} style={{width: 140, height: 110, borderRadius: 10}} resizeMode={"cover"}/>  
        
                            <View style={{paddingLeft: 20, flex: 1, justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom:  5}}>
                                    <Text style={{alignSelf: 'center', textTransform: 'uppercase', fontFamily: 'Poppins_600SemiBold', color: 'black', width: '80%'}} numberOfLines={1}>{clickedPetshop.name}</Text>
                                    {icon ? <Icon name="heart" size={20} color={colors.red} onPress={() => toggleFavorite(clickedPetshop._id)}/> : <Icon name="heart-outline" size={20} color={colors.red} onPress={() => toggleFavorite(clickedPetshop._id)}/>}
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'flex-end', marginBottom:  5}}>
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
                                </View>
                                
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:  5}}>

                                    {distance && (
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Icon name="map-marker-distance" style={{marginRight: 5}} size={16} color={colors.primary}/>
                                            <Text>{formatDistance(distance)}</Text>
                                        </View>
                                    )}

                                    {time && (
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Icon name="alarm"  style={{marginRight: 5}} size={16} color={colors.primary}/>
                                            <Text>{formatTime(time)}</Text>
                                        </View>
                                    )}

                                </View>
                                <TouchableOpacity onPress={() => {
                                    setClickedPetshop(null);
                                    setDistance(null);
                                    setTime(null);
                                    setDestination(null);
                                    navigate('PetshopDetail', {petshop: clickedPetshop});
                                }} style={{padding:8, borderRadius: 5, backgroundColor: colors.primary, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                                    <Text style={{textTransform: 'uppercase', color: 'white', fontWeight: 'bold'}}>Conhecer</Text>
                                    <Icon name="forward" style={{marginLeft: 5}} size={16} color='white'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </ViewModal>
            </Modal>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    searchBar: {
      flex: 1, 
      paddingHorizontal: 10,
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      backgroundColor: 'white', 
      margin: 10, 
      marginHorizontal: 20,
      borderRadius: 10,
      shadowColor: "#c41a7a",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
});