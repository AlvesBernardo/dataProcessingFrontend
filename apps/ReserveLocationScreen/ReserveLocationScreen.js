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
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../../assests/index';
import {useForm, Controller} from 'react-hook-form';
import colors from '../config/colors.js';

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
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
  hamburgerIcon: {
    width: 40,
    height: 40,
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
    marginTop: 30,
  },
  HeadersText: {
    fontSize: 30,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  formContainers: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainers: {
    marginTop: 20,
    width: '100%',
  },
  errors: {
    color: colors.red,
    alignSelf: 'flex-start',
    fontFamily: 'Arial',
  },
  textInputs: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '100%',
    height: 50,
    padding: 10,
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 25,
    fontFamily: 'Arial',
    fontWeight: '800',
    marginBottom: 15,
    color: colors.black,
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
  buttonContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: '60%',
    height: 40,
    backgroundColor: colors.purple,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
});


export default function ReserveLocationScreen({navigation}) {
    const { control, handleSubmit, watch } = useForm();

      const [date, setDate] = useState(new Date());
      const [showDate, setShowDate] = useState(false);
      const [showTimeFrom, setShowTimeFrom] = useState(false);
      const [showTimeTo, setShowTimeTo] = useState(false);
      const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date());
      const [selectedTimeTo, setSelectedTimeTo] = useState(new Date());

      const openMenu = () => {
        navigation.openDrawer();
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

      const addReservation = (data) => {
        if (
          selectedTimeTo.toLocaleTimeString() <=
          selectedTimeFrom.toLocaleTimeString()
        ) {
          Alert.alert(
            'Time is not valid',
            `The end time must be more than the start time`,
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
              name: data.name,
              email: data.email,
              date: date.toDateString(),
              timeFrom: selectedTimeFrom.toLocaleTimeString(),
              timeTo: selectedTimeTo.toLocaleTimeString(),
            };

           /* fetch("http://10.0.2.2:8080/sendFullReservationEmail",{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newReservation),
            })
          */

              fetch("http://10.0.2.2:8080/fullOfficeReservation", 
              {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newReservation),
              })
              .then(response => {
                Alert.alert("Reservation sent successfully");
              })
              .catch(error => {
                // Handle any errors that occur during the fetch request
              });

          }

        }
    }
  return (
   <SafeAreaView style={myStyles.container}>
         <View style={myStyles.insideCntainer}>
           <View style={myStyles.header}>
             <TouchableWithoutFeedback onPress={openMenu}>
               <Image
                 source={images.hamburgerMenu}
                 style={myStyles.hamburgerIcon}></Image>
             </TouchableWithoutFeedback>

             <View>
               <Text style={myStyles.pageName}>Reserve Location</Text>
             </View>

             <TouchableWithoutFeedback onPress={profilePage}>
               <Image source={images.profile} style={myStyles.profileIcon}></Image>
             </TouchableWithoutFeedback>
           </View>
         </View>

         <ScrollView>
           <View style={myStyles.HeadersTextContainer}>
             <Text style={myStyles.HeadersText}>Reserve the location</Text>
           </View>

           <View style={myStyles.logoContainer}>
             <Image source={images.logoBlue} style={myStyles.logo}></Image>
           </View>

           <View style={myStyles.formContainers}>
             <View style={myStyles.inputContainers}>
               <Text style={myStyles.label}>Name</Text>

               <Controller
                 name="name"
                 control={control}
                 rules={{
                   required: 'Name is required',
                 }}
                 render={({
                   field: {onChange, onBlur, value},
                   fieldState: {error},
                 }) => (
                   <>
                     <TextInput
                       style={[
                         myStyles.textInputs,
                         {borderColor: error ? colors.red : '#E8E8E8'},
                       ]}
                       placeholder="John"
                       onBlur={onBlur}
                       onChangeText={onChange}
                       value={value}
                     />
                     {error && (
                       <Text style={myStyles.errors}>
                         {error.message || 'Error'}
                       </Text>
                     )}
                   </>
                 )}
               />
             </View>
           </View>
           <View style={myStyles.formContainers}>
             <View style={myStyles.inputContainers}>
               <Text style={myStyles.label}>Email</Text>

               <Controller
                 name="email"
                 control={control}
                 rules={{
                   required: 'Email is required',
                 }}
                 render={({
                   field: {onChange, onBlur, value},
                   fieldState: {error},
                 }) => (
                   <>
                     <TextInput
                       style={[
                         myStyles.textInputs,
                         {borderColor: error ? colors.red : '#E8E8E8'},
                       ]}
                       placeholder="john@gmail.com"
                       onBlur={onBlur}
                       onChangeText={onChange}
                       value={value}
                     />
                     {error && (
                       <Text style={myStyles.errors}>
                         {error.message || 'Error'}
                       </Text>
                     )}
                   </>
                 )}
               />
             </View>
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
             </View>

           <View style={myStyles.buttonContainer}>
             <TouchableHighlight
               onPress={handleSubmit(addReservation)}
               style={myStyles.button}>
               <Text style={myStyles.buttonText}>Reserve</Text>
             </TouchableHighlight>
           </View>
         </ScrollView>
       </SafeAreaView>
     );
   }
