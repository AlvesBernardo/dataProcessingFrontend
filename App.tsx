import 'react-native-gesture-handler';
import React, {useEffect, useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './apps/SignUpScreen/SignUpScreen';
import EmailVerificationScreen from './apps/SignUpScreen/EmailVerificationScreen';
import LogInScreen from './apps/LogInScreen/LogInScreen';
import WelcomeScreen from './apps/WelcomeScreen/WelcomeScreen';
import ForgetPasswordScreen from './apps/ForgetPasswordScreen/ForgetPasswordScreen';
import ForgetPasswordLinkScreen from './apps/ForgetPasswordScreen/ForgetPasswordLinkScreen';
import HomeScreen from './apps/HomeScreen/HomeScreen';
import ChairReserveFirst from './apps/ChairReserveFirstScreen/ChairReserveFirstScreen';
import ChairReserveSecond from './apps/ChairReserveSecondScreen/ChairReserveSecondScreen';
import SelectTableScreen from './apps/SelectTableScreen/SelectTableScreen';
import ReserveLocationScreen from './apps/ReserveLocationScreen/ReserveLocationScreen';
import ReserveTableScreen from './apps/ReserveTableScreen/ReserveTableScreen';
import AdminWelcomeScreen from './apps/AdminPageScreen/AdminWelcomeScreen';
import AdminBookingViewScreen from './apps/AdminPageScreen/AdminBookingViewScreen';
import AdminNewsScreen from './apps/AdminPageScreen/AdminNewsScreen';
import AdminBuildingReservationScreen from './apps/AdminPageScreen/AdminBuildingReservationScreen';
import QrScanningScreen from './apps/QrScanningScreen/QrScanningScreen';
import ProfilePageScreen from './apps/ProfileScreen/ProfileScreen';
import CloseFriend from './apps/CloseFriendsScreen/CloseFriends';
import FriendProfileScreen from './apps/CloseFriendsScreen/FriendProfileScreen';
import SearchFriendsScreen from './apps/CloseFriendsScreen/SearchFriendsScreen';
import AddFriendScreen from './apps/CloseFriendsScreen/AddFriendScreen';
import ChangeProfileDataScreen from './apps/ProfileScreen/ChangeProfileDataScreen';
import ContactUsScreen from './apps/ContactUsScreen/ContactUsScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawerContent from './apps/CustomDrawer/CustomDrawer';
import SettingsScreen from './apps/SettingsScreen/SettingsScreen';
import images from './assests/index';
import {Image, Text, View, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {tokens} from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
//import jwtDecode, { JwtPayload } from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import {decode} from 'base-64';
global.atob = decode;
global.Buffer = require('buffer').Buffer;

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

async function fetchData(setIsAuthenticated: (value: boolean) => void) {
  try {
    const token = await AsyncStorage.getItem('userTokenOne');
    console.log('app token is: ' + token);
    if (token) {
      // Assuming your token has the standard claims structure
      const decoded = parseJwt(token);
      if (new Date().getTime() > decoded.exp * 1000) {
        setIsAuthenticated(false); //false
      } else {
        setIsAuthenticated(true); //true
      }
    } else {
      setIsAuthenticated(false); //false
    }
  } catch (error) {
    console.error('Error retrieving userToken:', error);
    setIsAuthenticated(false); //false
  }
}

function App(): JSX.Element {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setIsAuthenticatedCallback = useCallback((value: boolean) => {
    setIsAuthenticated(value);
  }, []);

  useEffect(() => {
    const checkInternetConnection = (state: any) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection and try again.',
        );
      }
    };

    const unsubscribe = NetInfo.addEventListener(checkInternetConnection);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchData(setIsAuthenticatedCallback).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [setIsAuthenticatedCallback]);

  if (!isConnected) {
    Alert.alert('No Internet Connection');
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        {isAuthenticated ? (
          <>
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                drawerLabel: 'Home',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.home}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />
            <Drawer.Screen
              name="ProfilePageScreen"
              component={ProfilePageScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="ChangeProfileDataScreen"
              component={ChangeProfileDataScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="SelectTableScreen"
              component={SelectTableScreen}
              options={{
                drawerLabel: 'Make reservation',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.chair}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />

            <Drawer.Screen
              name="SettingsScreen"
              component={SettingsScreen}
              options={{
                drawerLabel: 'Setting screen',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.chair}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />

            <Drawer.Screen
              name="ContactUsScreen"
              component={ContactUsScreen}
              options={{
                drawerLabel: 'Contact us',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.chair}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />

            <Drawer.Screen
              name="QRCodeScanner"
              component={QrScanningScreen}
              options={{
                drawerLabel: 'Check in',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.chair}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />

            <Drawer.Screen
              name="ChairReserveFirst"
              component={ChairReserveFirst}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="ReserveLocationScreen"
              component={ReserveLocationScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="ReserveTableScreen"
              component={ReserveTableScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="ChairReserveSecond"
              component={ChairReserveSecond}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="AddFriendScreen"
              component={AddFriendScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="CloseFriend"
              component={CloseFriend}
              options={{
                drawerLabel: 'Close Friends',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.chair}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />

            <Drawer.Screen
              name="FriendProfileScreen"
              component={FriendProfileScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="SearchFriendsScreen"
              component={SearchFriendsScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="AdminWelcomeScreen"
              component={AdminWelcomeScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />

            <Drawer.Screen
              name="AdminBookingViewScreen"
              component={AdminBookingViewScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />

            <Drawer.Screen
              name="AdminBuildingReservationScreen"
              component={AdminBuildingReservationScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />

            <Drawer.Screen
              name="AdminNewsScreen"
              component={AdminNewsScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                drawerLabel: 'Home',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.home}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />

            <Drawer.Screen
              name="ProfilePageScreen"
              component={ProfilePageScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="ChangeProfileDataScreen"
              component={ChangeProfileDataScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="QRCodeScanner"
              component={QrScanningScreen}
              options={{
                drawerLabel: 'Check in',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.chair}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />
            <Drawer.Screen
              name="SelectTableScreen"
              component={SelectTableScreen}
              options={{
                drawerLabel: 'Make reservation',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.chair}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />

            <Drawer.Screen
              name="SettingsScreen"
              component={SettingsScreen}
              options={{
                drawerLabel: 'Settings Screen',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.chair}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />
            <Drawer.Screen
              name="ContactUsScreen"
              component={ContactUsScreen}
              options={{
                drawerLabel: 'Contact us',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.chair}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />

            <Drawer.Screen
              name="AddFriendScreen"
              component={AddFriendScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="CloseFriend"
              component={CloseFriend}
              options={{
                drawerLabel: 'Close Friends',
                drawerIcon: ({focused, size}) => (
                  <Image
                    source={images.chair}
                    style={[{height: 30, width: 30}]}
                  />
                ),
                drawerInactiveTintColor: 'black',
                drawerActiveBackgroundColor: 'rgba(92, 41, 108, 0.5)',
                drawerActiveTintColor: 'white',
              }}
            />

            <Drawer.Screen
              name="FriendProfileScreen"
              component={FriendProfileScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="SearchFriendsScreen"
              component={SearchFriendsScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="ChairReserveFirst"
              component={ChairReserveFirst}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="ReserveLocationScreen"
              component={ReserveLocationScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="ReserveTableScreen"
              component={ReserveTableScreen}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />

            <Drawer.Screen
              name="ChairReserveSecond"
              component={ChairReserveSecond}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />
            <Drawer.Screen
              name="LogIn"
              component={LogInScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />

            <Drawer.Screen
              name="EmailVerification"
              component={EmailVerificationScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />
            <Drawer.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />
            <Drawer.Screen
              name="ForgetPassword"
              component={ForgetPasswordScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />
            <Drawer.Screen
              name="ForgetPasswordLinkScreen"
              component={ForgetPasswordLinkScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />

            <Drawer.Screen
              name="AdminWelcomeScreen"
              component={AdminWelcomeScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />

            <Drawer.Screen
              name="AdminBookingViewScreen"
              component={AdminBookingViewScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />

            <Drawer.Screen
              name="AdminBuildingReservationScreen"
              component={AdminBuildingReservationScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />

            <Drawer.Screen
              name="AdminNewsScreen"
              component={AdminNewsScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                swipeEnabled: false,
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
