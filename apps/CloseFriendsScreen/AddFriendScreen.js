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
  FlatList
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
    marginBottom: 70,
    marginTop: 50,
  },
  button: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 50,
      width: 300,
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

  export default function AddFriend({navigation}) {
      const backToHome = () => {
          navigation.navigate('Home');
        };

        const backToSearch = () => {
          navigation.navigate('SearchFriendsScreen');
        };



     return (
        <SafeAreaView style={myStyles.container}>
          <View style={myStyles.insideContainer}>
            <View style={myStyles.header}>
              <TouchableWithoutFeedback onPress={backToHome}>
                <View>
                  <Image source={images.angleLeft} style={myStyles.angleLeftIcon} />
                </View>
              </TouchableWithoutFeedback>
              <View style={myStyles.pageNameContainer}>
                <Text style={myStyles.pageName}>Add Friend</Text>
              </View>
            </View>
            <View style={myStyles.profileContainer}>
                    <Image
                      source={images.profile} // Replace with the path to your image
                      style={myStyles.profileImage}
                    />
                    <View style={myStyles.textInputs}>
                      <Text>User Name</Text>
                    </View>

                    <View style={myStyles.textInputs}>
                      <Text>Company: IT-HUB</Text>
                    </View>

                    <View>
                      <TouchableHighlight style={myStyles.button} onPress={backToSearch}>
                        <Text style={myStyles.buttonText}>Add</Text>
                      </TouchableHighlight>
                    </View>

                    <View>
                      <TouchableHighlight style={myStyles.button} onPress={backToSearch}>
                        <Text style={myStyles.buttonText}>Back</Text>
                      </TouchableHighlight>
                    </View>
            </View>
          </View>
        </SafeAreaView>
     );
  };