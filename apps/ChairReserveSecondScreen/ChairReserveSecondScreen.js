import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Touchable,
  TouchableWithoutFeedback,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../../assests/index';
import colors from '../config/colors.js';
import DateTimePickerAndroid from '@react-native-community/datetimepicker';

const myStyles = StyleSheet.create({
  cntainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    overflow: 'hidden',
  },
  insideCntainer: {
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  angleLeftIcon: {
    width: 30,
    height: 30,
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
  pageName: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  HeadersTextContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    },
    HeadersText: {
      fontSize: 30,
      fontFamily: 'Arial',
      fontWeight: '800',
      color: colors.black,
    },
    logoContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    logo: {
      width: 100,
      height: 100,
      marginTop: 20,
      marginBottom: 20,
    },

  date: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 40,
  },
  dateText: {
    fontSize: 25,
    fontFamily: 'Arial',
    fontWeight: '800',
    marginBottom: 10,
    color: colors.black,
  },
  dateInputText: {
    fontSize: 20,
  },
  timesContainer: {
    width: '80%',
    paddingVertical: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
  },
  timeText: {
    fontSize: 25,
    marginHorizontal: 40,
    fontFamily: 'Arial',
    fontWeight: '800',
    marginRight: 10,
    color: colors.black,
  },
  fromTime: {
    flexDirection:'row',
    alignItems: 'center',
  },
  fromTimeText: {
    fontSize: 20,
  },
  toTime: {
    flexDirection:'row',
    alignItems: 'center',
    marginTop: 20,
  },
  toTimeText: {
    fontSize: 20,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    height: 40,
    backgroundColor: colors.purple,
    marginTop: 30,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
});

export default function ChairReserveSecond({route, navigation}) {
  const checkedChairCount = route.params.checkedChairCount;

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTimeFrom, setShowTimeFrom] = useState(false);
  const [showTimeTo, setShowTimeTo] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date());
  const [selectedTimeTo, setSelectedTimeTo] = useState(new Date());
  const [pickerType, setPickerType] = useState(null); // New state variable
  // New state variable

  const ReservationPage = () => {
    navigation.navigate('SelectTableScreen');
  };
  const profilePage = () => {
    navigation.navigate('ProfilePageScreen');
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };

  const onChangeTimeFrom = (event, selectedTime) => {
    if (event.type === 'set') {
      setShowTimeFrom(false);
      setSelectedTimeFrom(selectedTime);
    } else {
      setShowTimeFrom(false);
    }
  };

  const onChangeTimeTo = (event, selectedTime) => {
    if (event.type === 'set') {
      setShowTimeTo(false);
      setSelectedTimeTo(selectedTime);
    } else {
      setShowTimeTo(false);
    }
  };

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDate(true);
    setPickerType('date'); // Set the picker type to 'date'
  };

  const showTimepicker = () => {
    setShowTimeFrom(true);
    setPickerType('timeFrom'); // Set the picker type to 'date'
  };
  const showEndTimepicker = () => {
    setShowEndTime(true);
    setPickerType('timeTo'); // Set the picker type to 'date'
  };

  const addReservation = () => {
    if (
      selectedTimeTo.toLocaleTimeString() <=
      selectedTimeFrom.toLocaleTimeString()
    ) {
      Alert.alert(
        'Time is not valid',
        `The end time must be more than start time`,
        [
          {
            text: 'OK',
          },
        ],
      );
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date < today) {
        Alert.alert(
          'Date is not valid',
          'Please choose a date equal to or after today.',
          [
            {
              text: 'OK',
            },
          ],
        );
      } else {
        const newReservation = {
          date: date.toDateString(),
          timeFrom: selectedTimeFrom.toLocaleTimeString(),
          timeTo: selectedTimeTo.toLocaleTimeString(),
          chairs: checkedChairCount,
        };
        fetch('http://10.0.2.2:8080/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReservation),
        })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            // Handle any errors that occur during the fetch request
          });
        console.log(newReservation);

        Alert.alert(
          'Reservation successful',
          'You can check your reservations in the reservation section',
          [
            {
              text: 'OK',
            },
          ],
        );
      }
    }
  };

  return (
    <SafeAreaView style={myStyles.cntainer}>
      <View style={myStyles.insideCntainer}>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={ReservationPage}>
            <Image
              source={images.angleLeft}
              style={myStyles.angleLeftIcon}></Image>
          </TouchableWithoutFeedback>
          <View>
            <Text style={myStyles.pageName}>Reservation</Text>
          </View>
          <TouchableWithoutFeedback onPress={profilePage}>
            <Image source={images.profile} style={myStyles.profileIcon}></Image>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <ScrollView>
         <View style={myStyles.HeadersTextContainer}>
             <Text style={myStyles.HeadersText}>Reserve network table</Text>
           </View>

           <View style={myStyles.logoContainer}>
             <Image source={images.network} style={myStyles.logo}></Image>
           </View>

          <View style={myStyles.date}>
           <Text style={myStyles.dateText}>Choose a Date:</Text>
           <TouchableWithoutFeedback onPress={() => setShowDate(true)}>
             <Text style={myStyles.dateInputText}>{date.toDateString()}</Text>
           </TouchableWithoutFeedback>
           {showDate && (
             <DateTimePicker
               display="inline"
               testID="dateTimePicker"
               value={date}
               mode="date"
               is24Hour={true}
               onChange={onChangeDate}
             />
           )}
         </View>

          <View style={myStyles.timesContainer}>
              <View style={myStyles.fromTime}>
                   <Text style={myStyles.timeText}>From :</Text>
                   <TouchableWithoutFeedback onPress={() => setShowTimeFrom(true)}>
                     <Text style={myStyles.fromTimeText}>{selectedTimeFrom.toLocaleTimeString()}</Text>
                   </TouchableWithoutFeedback>
                   {showTimeFrom && (
                     <DateTimePicker
                       display="inline"
                       testID="dateTimePicker"
                       value={selectedTimeFrom}
                       mode="time"
                       is24Hour={true}
                       onChange={(event, time) => onChangeTimeFrom(event, time)}
                     />
                   )}
              </View>

              <View style={myStyles.toTime}>
                   <Text style={myStyles.timeText}>To :</Text>
                   <TouchableWithoutFeedback onPress={() => setShowTimeTo(true)}>
                     <Text style={myStyles.toTimeText}>{selectedTimeTo.toLocaleTimeString()}</Text>
                   </TouchableWithoutFeedback>
                   {showTimeTo && (
                     <DateTimePicker
                       display="inline"
                       testID="dateTimePicker"
                       value={selectedTimeTo}
                       mode="time"
                       is24Hour={true}
                       onChange={(event, time) => onChangeTimeTo(event, time)}
                     />
                   )}
              </View>


          {pickerType === 'date' && showDate && (
            <DateTimePicker
              testID="datePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
          {pickerType === 'timeFrom' && showTimeFrom && (
            <DateTimePicker
              testID="timePicker"
              value={selectedTimeFrom}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTimeFrom}
            />
          )}
          {pickerType === 'timeTo' && showEndTime && (
            <DateTimePicker
              testID="endTimePicker"
              value={selectedTimeTo}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTimeTo}
            />
          )}
        </View>

        <TouchableHighlight style={myStyles.button} onPress={addReservation}>
          <Text style={myStyles.buttonText}>Reserve</Text>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
}
