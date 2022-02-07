import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../../components/Button';
import { useAuth } from '../../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';
import { useChange } from '../../../contexts/change';

export const Avaliations = ({route}) => {
    const {token, user} = useAuth();
    const { navigate } = useNavigation();
    const [avaliations, setAvaliations] = useState([]);
    const [loader, setLoader] = useState(true);
    const [userAlreadyRated, setUserAlreadyRated] = useState(false);
    const {petshop} = route.params;
    const {change} = useChange();

    useEffect(() => {
        async function getData(){
            await api.get(`avaliation/${petshop._id}/${user._id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(response => {
                setLoader(false);
                setAvaliations(response.data.avaliations);
                setUserAlreadyRated(response.data.userAlreadyRated);
            })
            .catch(err =>  {
                setLoader(false);
                console.log(err.response.data.error)
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
                    <>
                    {!userAlreadyRated && <Button onPress={() => navigate('Rate', {petshop})} bgColor={colors.primary} style={{marginBottom: 20}} icon={<Icon name="plus-box" color="white" size={20} style={{marginRight: 8}}/>}>Avaliar o Petshop</Button>}
                    {avaliations.length !== 0 ? (
                        <FlatList
                            contentContainerStyle={{paddingBottom: 20}}
                            data={avaliations}
                            renderItem={renderAvaliation}
                            keyExtractor={(item) => item.id}
                        />  
                    ) : (
                        <View style={{backgroundColor: colors.gray, padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 10}}>
                            <Text style={{fontFamily: 'Poppins_300Light'}}>Não existe nenhuma avaliação pra esse petshop. Seja o primeiro a avaliar!</Text>
                        </View>
                    )}
                    </>
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