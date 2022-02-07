import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Text, Alert, ActivityIndicator} from 'react-native';
import { useAuth } from '../../contexts/auth';
import { api } from '../../services/api';
import { Button } from '../../components/Button';
import colors from '../../styles/colors';
import { useModal } from '../../contexts/modal';
import { useChange } from '../../contexts/change';

export const Reschedule = ({date, hour, petshopId, scheduleId}) => {
    const { setChange } = useChange();
    const { token } = useAuth();
    const {setContent, setIsVisible} = useModal();
    let dates = [];
    let hours = [];
    const [dispDates, setDispDates] = useState([]);
    const [dispHours, setDispHours] = useState([]);
    const [olderDate, setOlderDate] = useState(date);
    const [olderHour, setOlderHour] = useState(hour);
    const [newDate, setNewDate] = useState('');
    const [newHour, setNewHour] = useState('');
    const [loader, setLoader] = useState(false);

    function formatDate(str){
        const aux = str.split('/');
        const formatedDate = ''+ aux[2] + "-" + aux[1] + "-" + aux[0]+'';
        return formatedDate;
      }

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
    
              if(date.date === newDate){
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
      }, [newDate]);

    async function updateSchedule(){
        await api.put("schedule", {
            olderDate,
            olderHour,
            newDate: formatDate(newDate),
            newHour,
            petshopId,
            scheduleId,
        },  {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(response => {
            setIsVisible(false);
            setContent(null);
            setChange(true);
            setChange(false);
        })
        .catch(err => Alert.alert(err.response.data.error));
    }

    return (
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 15, width: '100%'}}>
            <View>
                    <Text style={{fontFamily: 'Poppins_600SemiBold', marginBottom: 10}}>Escolha uma data</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {dispDates.map((date, index) => (
                                <TouchableOpacity key={index} style={{marginRight: 10, padding: 10, backgroundColor: newDate === date ? colors.primarylighten : colors.gray, borderRadius: 8, borderWidth: newDate === date ? 2 : 0, borderColor: newDate === date && colors.primary}}  onPress={() => setNewDate(date)}><Text style={{fontFamily: 'Poppins_400Regular'}}>{date}</Text></TouchableOpacity>
                            ))}
                        </ScrollView>
                
                {newDate !== '' && (
                        <>
                        <Text style={{fontFamily: 'Poppins_600SemiBold', marginBottom: 10, marginTop: 10}}>Escolha uma hora</Text>
                        {loader ? <ActivityIndicator color={colors.primary} size={25} style={{alignSelf: 'center'}}/>
                        : (
                          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                              {dispHours.map((hour, index) => (
                                  <TouchableOpacity key={index} style={{marginRight: 10, padding: 10, backgroundColor: newHour === hour ? colors.primarylighten : colors.gray, borderRadius: 8, borderWidth: newHour === hour ? 2 : 0, borderColor: newHour === hour && colors.primary}}  onPress={() => setNewHour(hour)}><Text style={{fontFamily: 'Poppins_400Regular'}}>{hour}</Text></TouchableOpacity>
                              ))}
                          </ScrollView>
                        )}
                        </>
                )}

                {newDate !== '' && newHour !== '' && (
                    <Button bgColor={colors.primary} onPress={() => updateSchedule()}>Remarcar</Button>
                )}
                
            </View>
        </View>
    )
}