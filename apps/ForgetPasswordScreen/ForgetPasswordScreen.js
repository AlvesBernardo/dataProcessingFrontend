import React from 'react';
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
  cntainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  header: {
    width: '100%',
    alignSelf: 'center',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  logoContainer: {
    alignItems: 'center',
    width: '100%',
    paddingRight: 70,
  },
  logo: {
    width: '70%',
    height: '70%',
  },
  textContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
  },
  textWelcomeOne: {
    fontSize: 30,
    paddingLeft: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  textWelcomeTwo: {
    paddingLeft: 20,
    fontFamily: 'Arial',
    fontWeight: '100',
  },
  formContainers: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  inputContainers: {
    justifyContent: 'center',
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
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
    height: 50,
    backgroundColor: colors.red,
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  loginContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: colors.red,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
});

export default function ForgetPasswordScreen({navigation}) {
  const onSubmit = data => {
    fetch('http://10.0.2.2:8080/resetPasswordEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        // Handle any errors that occur during the fetch request
      });

    Alert.alert(
      'Password Reset Email Sent',
      `Please follow the instructions sent to ${data.email} to reset your password`,
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('ForgetPasswordLinkScreen');
          },
        },
      ],
    );
  };

  const loginPage = () => {
    navigation.navigate('LogIn');
  };

  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const {control, handleSubmit, watch} = useForm();

  return (
    <SafeAreaView style={myStyles.cntainer}>
      <ScrollView>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={loginPage}>
            <Image source={images.angleLeft}></Image>
          </TouchableWithoutFeedback>

          <View style={myStyles.logoContainer}>
            <Image style={myStyles.logo} source={images.logoRed} resizeMode='contain'></Image>
          </View>
        </View>

        <View style={myStyles.textContainer}>
          <Text style={myStyles.textWelcomeOne}>
            <Text style={{color: colors.red}}>Forgot</Text> Your password?
          </Text>

          <Text style={myStyles.textWelcomeTwo}>
            Enter your email, we send a link to you!
          </Text>
        </View>

        <View style={myStyles.formContainers}>
          <View style={myStyles.inputContainers}>
            <Text style={myStyles.label}>Email</Text>

            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {value: emailRegex, message: 'Email is invalid'},
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
                    placeholder="John@example.com"
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

          <TouchableHighlight
            style={myStyles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={myStyles.buttonText}>Send</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
