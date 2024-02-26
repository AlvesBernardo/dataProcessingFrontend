import React, {useState, useEffect} from 'react';
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
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../../assests/index';
import {
  useForm, 
  Controller,
} from 'react-hook-form';
import colors from '../config/colors.js';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const calculateBorderWidth = (millimeters) => {
  const pixelsPerMillimeter = 2;
  return millimeters * pixelsPerMillimeter;
};

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
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  HeadersText: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  logoBlue: {
    width: '70%',
    height: '70%',
    marginBottom: 20,
    marginTop: 20,
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
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '800',
    marginBottom: 5,
    color: colors.black,
  },
  date: {
    width: '80%',
    alignSelf: 'center',
  },
  dateText: {
    marginTop: 30,
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
    alignSelf: 'center',
  },
  timesContainer: {
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    width: '80%',
    height: 40,
    backgroundColor: colors.purple,
    margin: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  logo: {
    width: 200,
    height: 30,
    margin: 20,
  },
  dbBoxShow: {
    borderWidth: calculateBorderWidth(1),
    borderColor: 'black',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  }
});

export default function AdminBuildingReservationScreen({navigation}) {
  const [decodedToken, setDecodedToken] = useState(null); // Add this line
  const [token, setToken] = useState('');

    const profilePage = () => {
        navigation.navigate('ProfilePageScreen');
    };

    const back = () => {
      navigation.navigate('AdminWelcomeScreen');
    }

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
      const getToken = async () => {
        try {
          const userToken = await AsyncStorage.getItem('userTokenOne');
          if (userToken) {
            const decodedToken = jwtDecode(userToken);
            console.log('Decoded Token:', decodedToken);
            setDecodedToken(decodedToken); // Set the decodedToken state
            console.log('User Type:', userType);
            setToken(userToken);
            console.log('Token from AsyncStorage:', userToken);
          } else {
            console.log('No token found in AsyncStorage');
          }
        } catch (error) {
          console.error('Error fetching token from AsyncStorage:', error);
        }
      };
  
      getToken();
    
        // Fetch news data when the component mounts
        fetch('http://10.0.2.2:8080/getFullReservation', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data) {
              console.log('Reservations:', data);
              // Store the news data in the state
              setReservations(data);
            } else {
              console.log('Verification code not found');
            }
          })
          .catch(error => {
            console.error('Error fetching verification code:', error);
          });
        
      }, []);

    const manageReservation = /*async*/ (id, value) => {
        if (!id || !value){
            console.error('Invalid input');
            return;
          }
          
          // Perform the delete operation for a specific news item
          fetch(`http://10.0.2.2:8080/manageFullReservation/${id}/${value}`, {
            method: 'POST',
          })
            .then(response => response.json())
            .then(result => {
              if (result.success) {
                console.log('Reservation confirmed successfully');
                res.status(200).json({ message: 'Reservation confirmed successfully' });
              } else {
                console.error('Failed to confirm reservation');
                res.status(500).json({ message: 'Failed to confirm reservation' });
              }
            })
    }

  return (
    <View style={myStyles.container}>
      <View style={myStyles.insideCntainer}>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={back}>
            <Image
              source={images.angleLeft}
              style={myStyles.angleLeft}></Image>
          </TouchableWithoutFeedback>

          <View>
            <Text style={myStyles.pageName}>Home</Text>
          </View>

          <TouchableWithoutFeedback onPress={profilePage}>
            <Image source={images.profile} style={myStyles.profileIcon}></Image>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <ScrollView>
        <View style={myStyles.HeadersTextContainer}>
            <Text style={myStyles.HeadersText}>Full bookings </Text>
            <Image style={myStyles.logoBlue} source={images.logoBlue}></Image>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={myStyles.horizontalScrollContainer}>
          <View style={myStyles.upcomingContainer}>
            {reservations.map(reservation => (
                <View key={reservation.idReservation} style={myStyles.upcomingContainerOne}>

                    <Text>
                    <Text style={myStyles.boldTextUpcoming}>Date:</Text>
                    {reservation.dtDate}
                    </Text>

                    <Text>
                    <Text style={myStyles.boldTextUpcoming}>Start time:</Text>
                    {reservation.dtStartTime}
                    </Text>

                    <Text>
                    <Text style={myStyles.boldTextUpcoming}>End time:</Text>
                    {reservation.dtEndTime}
                    </Text>

                    <View style={myStyles.HeadersTextContainer}>
                        <TouchableHighlight style={myStyles.button}>
                            <Text style={myStyles.buttonText} onPress={() => manageReservation(reservation.idReservation, 1)}>Confirm</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={myStyles.button}>
                            <Text style={myStyles.buttonText} onPress={() => manageReservation(reservation.idReservation, 0)}>Deny</Text>
                        </TouchableHighlight>
                    </View>

                </View>

            ))}
          </View>
        </ScrollView>

      </ScrollView>
    </View>
  );
}
