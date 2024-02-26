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

import images from '../../assests/index';
import {useForm, Controller} from 'react-hook-form';
import colors from '../config/colors.js';

const myStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header1: {
    alignSelf: 'center',
    paddingTop: 20,
    fontWeight: 'bold',
    fontSize: 35,
    color: 'black',
  },
  header2: {
    paddingLeft: 20,
    paddingTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  headerInfo: {
    paddingLeft: 13,
    paddingTop: 10,
    marginTop: -10,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  textInfo: {
    paddingLeft: 13,
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  contactInfo: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    margin: 20,
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
  button: {
    backgroundColor: '#5C296C',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  hamburgerIcon: {
    width: 40,
    height: 40,
  },
  insideCntainer: {
    width: '90%',
    alignSelf: 'center',
  },
  pageName: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
});

const MyForm = () => {
  // Define state variables to store user input
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const openMenu = () => {
    navigation.openDrawer();
  };
  const profilePage = () => {
    navigation.navigate('ProfilePageScreen');
  };

  //Check whether what has been typed into the email field is a valid email
  const isEmailValid = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return email.match(emailRegex);
  };

  // Define a function to handle form submission
  const handleSubmit = () => {
    if (!isEmailValid(email)) {
      setErrorMessage('Invalid Email', 'Please provide a valid email address.');
      // Alert.alert('Invalid Email', 'Please provide a valid email address.');
      return;
    }
    // You can process the form data here, e.g., send it to an API
    //code to be sended

    const data = {
      subject: `${subject}`,
      email: `${email}`,
      message: `${message}`,
    };
    fetch('http://10.0.2.2:8080/contactUs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, null, 2),
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        // Handle any errors that occur during the fetch request
        console.log('Error: ', error);
      });
    console.log(`Subject: ${subject}, Email: ${email}, Message: ${message}`);
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
            <Text style={myStyles.pageName}>Tables</Text>
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


        <Text style={myStyles.label}></Text>
        <TextInput
          style={myStyles.input}
          placeholder="Title"
          value={subject}
          onChangeText={text => setSubject(text)}
        />

        <Text style={myStyles.label}></Text>
        <TextInput
          style={myStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />

        <Text style={myStyles.label}></Text>
        <TextInput
          style={myStyles.input}
          placeholder="Message"
          value={message}
          onChangeText={text => setMessage(text)}
          multiline={true} // Allow multiple lines
          numberOfLines={5} // Adjust the number of lines visible initially
          textAlignVertical="top"
        />

        <TouchableOpacity style={myStyles.button} onPress={handleSubmit}>
          <Text style={myStyles.buttonText}>Send message</Text>
        </TouchableOpacity>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
      </ScrollView>
    </View>
  );
};

export default function ContactUsScreen() {
  return (
    <View>
      <Text style={myStyles.header1}>Contact Us</Text>

      <Text style={myStyles.header2}>Send us an email</Text>

      <View>
        <MyForm />
      </View>

      <View style={myStyles.contactInfo}>
        <Text style={myStyles.headerInfo}>Contact info</Text>

        <Text style={myStyles.textInfo}>Email: ITHUB@placeholder.com</Text>

        <Text style={myStyles.textInfo}>Phone number: +31 6 12 34 56 78</Text>
      </View>
    </View>
  );
}
