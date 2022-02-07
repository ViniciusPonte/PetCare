import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useAuth } from '../../../contexts/auth';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';
import { useChange } from '../../../contexts/change';

export const Avaliations = () => {
    const {user, token} = useAuth();
    const [avaliations, setAvaliations] = useState([]);
    const [loader, setLoader] = useState(true);
    const {change} = useChange();

    useEffect(() => {
        async function getData(){
            await api.get(`avaliation/${user._id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(response => {
                setLoader(false);
                setAvaliations(response.data.avaliations);
            })
            .catch(err =>  {
                setLoader(false);
                Alert.alert(err.response.data.error)
            })
        }

        getData()
    }, [change]);

    const renderAvaliation = ({item}) => (
        <View style={styles.av}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold'}}>{item.userId.name}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={item.rate}
                    starSize={15}
                    fullStarColor="#edc600"
                    halfStarColor="#edc600"
                    emptyStarColor="#000"
                    halfStarEnabled={true}
                />
            </View>

            {item.comment !== "" && (
                <Text style={{fontFamily: 'Poppins_400Regular'}}>"{item.comment}"</Text>
            )}
        </View>
    );

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', color: colors.primary, fontSize: 18}}>Avaliações</Text>
                </View>
                
                {loader ? <ActivityIndicator color={colors.primary} size={25} style={{alignSelf: 'center'}}/>
                : (
                    avaliations.length !== 0 ? (
                        <FlatList
                            contentContainerStyle={{paddingBottom: 20}}
                            data={avaliations}
                            renderItem={renderAvaliation}
                            keyExtractor={(item) => item.id}
                        />  
                    ) : (
                        <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                            <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe nenhuma avaliação até o momento.</Text>
                        </View>
                    )
                )}
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    av: {
      flex: 1,
      width: '95%',
      paddingHorizontal: 10,
      paddingVertical: 15, 
      alignSelf: 'center', 
      justifyContent: 'space-between', 
      backgroundColor: colors.gray, 
      marginBottom: 15, 
      borderRadius: 15,
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