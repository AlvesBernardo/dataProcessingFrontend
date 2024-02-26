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
  },
  HeadersText: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
    marginTop: 85,
  },
  logoBlue: {
    width: '70%',
    height: '70%',
    marginTop: 30,
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
});

export default function AdminWelcomeScreen({navigation}) {

    const openMenu = () => {
        navigation.openDrawer();
      };
    const profilePage = () => {
        navigation.navigate('ProfilePageScreen');
    };
    const bookingsPage = () => {
        navigation.navigate('AdminBookingViewScreen');
    };
    const newsPage = () => {
        navigation.navigate('AdminNewsScreen');
    };
    const buildingReservationsPage = () => {
      navigation.navigate('AdminBuildingReservationScreen');
    };

  return (
    <View style={myStyles.container}>
      <View style={myStyles.insideCntainer}>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={openMenu}>
            <Image
              source={images.hamburgerMenu}
              style={myStyles.hamburgerIcon}></Image>
          </TouchableWithoutFeedback>

          <View>
            <Text style={myStyles.pageName}>Admin</Text>
          </View>

          <TouchableWithoutFeedback onPress={profilePage}>
            <Image source={images.profile} style={myStyles.profileIcon}></Image>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <ScrollView>
        <View style={myStyles.HeadersTextContainer}>
            <Text style={myStyles.HeadersText}>Welcome Admin</Text>
            <Image style={myStyles.logoBlue} source={images.logoBlue}></Image>
        </View>

        <View style={myStyles.HeadersTextContainer}>
            <Text style={myStyles.HeadersText}>View past bookings</Text>
            <TouchableHighlight style={myStyles.button} onPress={bookingsPage}>
                <Text style={myStyles.buttonText}>View</Text>
            </TouchableHighlight>
        </View>

        <View style={myStyles.HeadersTextContainer}>
            <Text style={myStyles.HeadersText}>Change news</Text>
            <TouchableHighlight style={myStyles.button} onPress={newsPage}>
                <Text style={myStyles.buttonText}>Change</Text>
            </TouchableHighlight>
          </View>
        <View style={myStyles.HeadersTextContainer}>
            <Text style={myStyles.HeadersText}>Building reservations</Text>
            <TouchableHighlight style={myStyles.button} onPress={buildingReservationsPage}>
                <Text style={myStyles.buttonText}>Manage</Text>
            </TouchableHighlight>
        </View>
    
      </ScrollView>
    </View>
  );
}
