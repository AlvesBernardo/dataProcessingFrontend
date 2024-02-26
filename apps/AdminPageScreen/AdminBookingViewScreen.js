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
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../../assests/index';
import {useForm, Controller} from 'react-hook-form';
import colors from '../config/colors.js';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { getToken } from '../utils/getToken.js';
import {useEffect} from 'react';

const calculateBorderWidth = millimeters => {
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
  },
});

export default function AdminBookingViewScreen({navigation}) {
  const profilePage = () => {
    navigation.navigate('ProfilePageScreen');
  };

  const back = () => {
    navigation.navigate('AdminWelcomeScreen');
  };
  const [decodedToken, setDecodedToken] = useState(null); // Add this line
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { userToken, decodedToken } = await getToken();

      if (userToken) {
        console.log('Decoded Token:', decodedToken);
        setDecodedToken(decodedToken);
        setToken(userToken);
      } else {
        console.log('No token found');
      }
    };
    fetchData();

  fetch('http://127.0.0.1:8080/reservations', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      setMyBookings(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
  return (
    <SafeAreaView style={myStyles.container}>
      <View style={myStyles.insideCntainer}>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={back}>
            <Image source={images.angleLeft} style={myStyles.angleLeft}></Image>
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
          <Text style={myStyles.HeadersText}>Past bookings</Text>
          <Image style={myStyles.logoBlue} source={images.logoBlue}></Image>
        </View>

        <View style={myStyles.HeadersTextContainer}>
          <View style={myStyles.dbBoxShow}>
            <Text style={myStyles.HeadersText}>Name: John Doe</Text>
            <Text style={myStyles.HeadersText}>Table: 5</Text>
            <Text style={myStyles.HeadersText}>Chairs: 4</Text>
            <Text style={myStyles.HeadersText}>Date: November 27, 2023</Text>
            <Text style={myStyles.HeadersText}>Start time: 10:00 AM</Text>
            <Text style={myStyles.HeadersText}>End time: 12:00 PM</Text>
          </View>
        </View>

        <View style={myStyles.HeadersTextContainer}>
          <TouchableHighlight style={myStyles.button}>
            <Text style={myStyles.buttonText}>Remove</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
