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

const myStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 20,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 35,
    color: 'black',
  },
  label: {
    fontSize: 16,
    marginBottom: -10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  button1: {
    backgroundColor: '#5C296C',
    padding: 10,
    borderRadius: 20,
  },
  button2: {
    backgroundColor: '#5C296C',
    padding: 10,
    borderRadius: 20,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const MyForm = ({route, navigation}) => {
  const {userData} = route.params;

  // Define state variables to store user input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // console.log(userData);
  // console.log(`CPROFILE: ${userData}`)
  const userId = `${userData.idUser}`;
  const placeholderUserName = `${userData.dtFirstName}`;
  const placeholderEmail = `${userData.dtEmail}`;

  const isEmailValid = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return email.match(emailRegex);
  };

  const handleSubmit = () => {
    //check if entered email is valid
    console.log(email);
    if (email !== undefined && email !== '') {
      if (!isEmailValid(email)) {
        Alert.alert('Invalid Email', 'Please provide a valid email address.');
        return;
      }
    }

    const data = {
      userId: `${userId}`,
      dtFirstName: `${name}`,
      dtEmail: `${email}`,
    };

    fetch('http://10.0.2.2:8080/changeProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, null, 2),
    })
      .then(response => {
        if (!response.ok) {
          // Check if the response status code indicates an error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(responseData => {
        // Handle the JSON data returned by the server
        console.log(responseData);
      })
      .catch(error => {
        // Handle any errors that occur during the fetch request
        console.error('Error:', error);
      });

    console.log(`id: ${userId}, firstname: ${name}, email: ${email}`);
    navigation.navigate('Profile');
  };

  return (
    <View style={myStyles.container}>
      <Text style={myStyles.label}></Text>
      <TextInput
        style={myStyles.input}
        placeholder={placeholderUserName}
        value={name}
        onChangeText={setName}
      />

      <Text style={myStyles.label}></Text>
      <TextInput
        style={myStyles.input}
        placeholder={placeholderEmail}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={myStyles.button2} onPress={handleSubmit}>
        <Text style={myStyles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ChangeProfileDataScreen({route, navigation}) {
  return (
    <View>
      <Text style={myStyles.header}>Change Personal Information</Text>

      <View>
        <MyForm route={route} navigation={navigation} />
      </View>

      <View style={myStyles.container}>
        <TouchableOpacity
          style={myStyles.button1}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={myStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
