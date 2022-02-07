import React, { useState } from 'react';
import { Alert, SafeAreaView, TextInput, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Button } from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/auth';
import { useChange } from '../../../contexts/change';
import { api } from '../../../services/api';
import colors from '../../../styles/colors';

export const Rate = ({route}) => {
    const { navigate } = useNavigation();
    const {petshop} = route.params;
    const {user, token} = useAuth();
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');
    const {setChange} = useChange();

    async function createRate(){
        await api.post(`avaliation`, {
            userId: user._id,
            petshopId: petshop._id,
            rate,
            comment
        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(response => {
            setChange(true);
            setChange(false);
            navigate('Avaliations');
        })
        .catch(err => {
            Alert.alert(err.response.data.error)
        })
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', padding: 40}}>
                <View/>
                <View/>
                <View/>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={rate}
                    selectedStar={(rating) => setRate(rating)}
                    fullStarColor="#edc600"
                    halfStarColor="#edc600"
                    emptyStarColor="#000"
                    halfStarEnabled={true}
                />
                <TextInput
                    style={{borderWidth: 2, width: '100%', fontFamily: 'Poppins_400Regular', borderRadius: 12, padding: 12, marginTop: 20}}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Faça um comentário... (Opcional)"
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => setComment(text)}
                    value={comment}
                />
                <View/>
                <View/>
                <Button bgColor={colors.primary} onPress={() => createRate()}>Avaliar</Button>
            </View>
        </SafeAreaView>
    )
}