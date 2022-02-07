import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/auth';
import StarRating from 'react-native-star-rating';
import { useChange } from '../../contexts/change';

export const CardPetshop = ({petshop, favoritePage}) => {
    const {user, token} = useAuth();
    const {navigate} = useNavigation();
    const [icon, setIcon] = useState(false);
    const [average, setAverage] = useState(0);
    const [total, setTotal] = useState(0);
    const {setChange, change} = useChange();

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

    return (
        <View style={styles.petview}>

        <Image source={{uri: petshop.photoUri}} style={{width: 150, height: 100, borderRadius: 10}} resizeMode={"cover"}/>  

        <View style={{paddingLeft: 20, flex: 1, justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{alignSelf: 'center', textTransform: 'uppercase', fontFamily: 'Poppins_600SemiBold', color: 'black', width: '80%'}} numberOfLines={1}>{petshop.name}</Text>
                {icon ? <Icon name="heart" size={20} color={colors.red} onPress={() => toggleFavorite(petshop._id)}/> : <Icon name="heart-outline" size={20} color={colors.red} onPress={() => toggleFavorite(petshop._id)}/>}
            </View>

            <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop:  -5}}>
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

            <TouchableOpacity onPress={() =>  navigate('PetshopDetail', {petshop: petshop})} style={{padding:8, borderRadius: 5, backgroundColor: colors.primary, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textTransform: 'uppercase', color: 'white', fontFamily: 'Poppins_600SemiBold'}}>{favoritePage ? 'Detalhes' : 'Conhecer'}</Text>
                <Icon name="forward" style={{marginLeft: 5}} size={16} color='white'/>
            </TouchableOpacity>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    petview: {
      flexDirection: 'row', 
      marginVertical: 10,
      shadowColor: "#c41a7a",
      shadowOffset: {
        width: 2,
        height: 10
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
});

