//import React, {useState, useEffect} from 'react';

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

import {withNavigation} from 'react-navigation';
import images from '../../assests/index';
import {useForm, Controller} from 'react-hook-form';
import colors from '../config/colors.js';
import AddFriend from './AddFriendScreen';

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
  text: {
    fontSize: 40,
    fontFamily: 'Arial',
    fontWeight: '800',
    alignSelf: 'center',
    color: colors.black,
    paddingTop: 70,
  },
  friendsContainer1: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  friendsContainer2: {
     width: '90%',
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: 50,
    },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginTop: 50,
    marginLeft: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    width: '80%',
    height: 40,
    backgroundColor: colors.purple,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
    alignSelf: 'center',
    color: colors.white,

  }


});

export default function CloseFriends({navigation}) {
    const backToHome = () => {
        navigation.navigate('Home');
      };

      const friendProfile = () => {
        navigation.navigate('FriendProfileScreen');
      };

      const searchFriends = () => {
        navigation.navigate('SearchFriendsScreen')
      }

      const addFriend = () => {
        navigation.navigate('AddFriendScreen');
      }

   return (
      <SafeAreaView style={myStyles.container}>
        <View style={myStyles.insideContainer}>
          <View style={myStyles.header}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View>
                <Image source={images.angleLeft} style={myStyles.angleLeftIcon} />
              </View>
            </TouchableWithoutFeedback>
            <View style={myStyles.pageNameContainer}>
              <Text style={myStyles.pageName}>Close Friends</Text>
            </View>
          </View>

          <ScrollView>
            <View>
                <Text style={myStyles.text}>Your Friends</Text>
            </View>

            <View style={myStyles.friendsContainer1}>
                <TouchableHighlight onPress={friendProfile}>
                    <View>
                        <Image source={images.profile} style={myStyles.profilePicture} />
                    </View>
                </TouchableHighlight>
                <Image source={images.profile} style={myStyles.profilePicture} />
                <Image source={images.profile} style={myStyles.profilePicture} />
            </View>
            <View style={myStyles.friendsContainer2}>
                <Image source={images.profile} style={myStyles.profilePicture} />
                <Image source={images.profile} style={myStyles.profilePicture} />
                <Image source={images.profile} style={myStyles.profilePicture} />
            </View>

            <TouchableHighlight style={myStyles.button} onPress={addFriend}>
              <Text style={myStyles.buttonText}>Add Friend</Text>
            </TouchableHighlight>

            <TouchableHighlight style={myStyles.button} onPress={searchFriends}>
              <Text style={myStyles.buttonText}>Search</Text>
            </TouchableHighlight>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };

