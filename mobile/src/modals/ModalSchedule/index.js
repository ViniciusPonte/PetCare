/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';
import {Button} from '../../components/Button';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { usePet } from '../../contexts/pet';
import {ViewModal} from './styles';
import { useChange } from '../../contexts/change';

Icon.loadFont();

export const ScheduleModal = ({service, petshopId}) => {
  const {setChange} = useChange();
  const {user, token} = useAuth();
  let dates = [];
  let hours = [];
  const [dispDates, setDispDates] = useState([]);
  const [dispHours, setDispHours] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const {selectedPet, setSelectedPet} = usePet();
  const { navigate } = useNavigation();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getData(){
      await api.get(`petshop_detail/${petshopId}`, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      .then(setLoader(true))
      .then(response => {
        response.data.petshop.availableHours.map(date => {
          if(!dates.includes(date.date)){
            dates.push(date.date);    
          }

          if(date.date === selectedDate){
            if(date.status){
              hours.push(date.hour);
            }
          }

        })
        setLoader(false);
        setDispHours(hours);
        setDispDates(dates);
      })
      .catch(err => {
        setLoader(false);
        Alert.alert(err.response.data.error);
      })
    }
    getData();
  }, [selectedDate]);

  function formatDate(str){
    const aux = str.split('/');
    const formatedDate = ''+ aux[2] + "-" + aux[1] + "-" + aux[0]+'';
    return formatedDate;
  }

   async function handleCreateSchedule(){

    await api.post('/schedule', {
      userId: user._id,
      serviceId: service._id,
      petId: selectedPet._id,
      petshopId,
      date: formatDate(selectedDate),
      time: selectedHour
    }, {
      headers: {
        Authorization: "Bearer " + token,
      }
    })
    .then(response => {
      setSelectedPet(null);
      setSelectedDate('');
      setSelectedHour('');
      Alert.alert('Serviço agendado com sucesso!');
      navigate('Schedule');
      setChange(true);
      setChange(false);
    })
    .catch(err => {
      Alert.alert(err.response.data.error);
    })
 }

  return (
      <ViewModal>
        <View style={{height: 6, width: 30, backgroundColor: colors.gray, alignSelf: 'center', marginBottom: 10, borderRadius: 15}}/>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          {service && <Text style={{fontSize: 18, fontFamily: 'Poppins_400Regular'}}>{service.name}</Text>}
          {service && <Text style={{fontSize: 18, fontFamily: 'Poppins_600SemiBold'}}>{service.price}</Text>}
        </View>

       <View>
          <View style={{marginVertical: 10}}>
            <Text style={{marginBottom: 10, fontFamily: 'Poppins_400Regular'}}>Escolha uma data</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {dispDates.map((date, index) => (
                  <TouchableOpacity key={index} style={{marginRight: 10, padding: 10, backgroundColor: selectedDate === date ? colors.primarylighten : colors.gray, borderRadius: 8, borderWidth: selectedDate === date ? 2 : 0, borderColor: selectedDate === date && colors.primary}} onPress={() => {setSelectedDate(date); setSelectedHour(null)}}><Text style={{fontFamily: 'Poppins_400Regular'}}>{date}</Text></TouchableOpacity>
                ))}
            </ScrollView>
          </View>
          
          {selectedDate !== '' && (
            <View style={{marginVertical: 10}}>
              <Text style={{marginBottom: 10, fontFamily: 'Poppins_400Regular'}}>Escolha uma hora</Text>
              {loader ? <ActivityIndicator color={colors.primary} size={25} style={{alignSelf: 'center'}}/>
              : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {dispHours.map((hour, index) => (
                    <TouchableOpacity key={index} style={{marginRight: 10, padding: 10, backgroundColor: selectedHour === hour ? colors.primarylighten : colors.gray, borderRadius: 8, borderWidth: selectedHour === hour ? 2 : 0, borderColor: selectedHour === hour && colors.primary}}  onPress={() => setSelectedHour(hour)}><Text style={{fontFamily: 'Poppins_400Regular'}}>{hour}</Text></TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          )}

          {selectedDate !== '' && selectedHour !== '' && (
            <Button bgColor={colors.primary} onPress={() => handleCreateSchedule()}>Agendar</Button>
          )}
          
        </View>
      </ViewModal>
  );
};