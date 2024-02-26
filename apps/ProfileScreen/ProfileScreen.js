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
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {withNavigation} from 'react-navigation';
import images from '../../assests/index';
import {useForm, Controller} from 'react-hook-form';
import colors from '../config/colors.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    overflow: 'hidden',
  },
  insideContainer: {
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
    alignSelf: 'center',
  },
  pageNameContainer: {
    width: '100%',
    paddingEnd: 50,
  },

  textInputs: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '80%',
    height: 50,
    padding: 10,
    backgroundColor: colors.white,
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
    marginTop: 30,
  },
  buttonText: {
    color: colors.purple,
  },
});

export default function ProfileScreen({navigation}) {
  const [loading, setLoading] = useState(true); //Track data loading from backend
  const [token, setToken] = useState('')
  const [decodedToken, setDecodedToken] = useState(null); // Add this line
  const [userData, setUserData] = useState({
    dtFirstName: '',
    dtEmail: '',
  });

  useEffect(() => {
    console.log('useEffect is called');

    const getToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userTokenOne');
        if (userToken) {
          const decodedToken = jwtDecode(userToken);
          console.log('Decoded Token:', decodedToken);
          setDecodedToken(decodedToken); // Set the decodedToken state
          const userType = decodedToken?.type;
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
    // Fetch JSON data from your Node.js backend
    if (token) {
      // Fetch JSON data from your Node.js backend
      fetch('http://10.0.2.2:8080/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setUserData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error getting userData', error);
          setLoading(false);
        });
    }
  }, [token]);


  const navigateToChangeProfileData = () => {
    if (!loading) {
      // Only navigate when data loading is complete'
      // console.log(`PROFILE: ${userData}`)
      navigation.navigate('ChangeProfileDataScreen', {userData});
    } else {
      console.log('Data is still loading');
    }
  };

  const backToHomePage = () => {
    navigation.navigate('Home');
  };

  console.log('The user data is :', userData.dtEmail, userData.dtFirstName)

  return (
    <SafeAreaView style={myStyles.container}>
      <View style={myStyles.insideContainer}>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={backToHomePage}>
            <View>
              <Image source={images.angleLeft} style={myStyles.angleLeftIcon}></Image>
            </View>
          </TouchableWithoutFeedback>
          <View style={myStyles.pageNameContainer}>
            <Text style={myStyles.pageName}>Profile</Text>
          </View>
        </View>
      </View>
      <View style={myStyles.profileContainer}>
        <Image
          source={images.profile}
          style={myStyles.profileImage}
        />
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <View style={myStyles.textInputs}>
              <Text>{userData.dtFirstName}</Text>
            </View>
            <View style={myStyles.textInputs}>
              <Text>{userData.dtEmail}</Text>
            </View>
            <TouchableHighlight
              style={myStyles.signUpButton}
              onPress={navigateToChangeProfileData}
            >
              <Text style={myStyles.buttonText}>Change Data</Text>
            </TouchableHighlight>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
