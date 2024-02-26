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
  RefreshControl
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { DrawerActions, useNavigation } from '@react-navigation/native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../assests/index';
import {useForm, Controller} from 'react-hook-form';
import colors from '../config/colors.js';
import HomeScreen from '../HomeScreen/HomeScreen';

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
  textContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
  },
  textWelcomeOne: {
    fontSize: 30,
    paddingLeft: 30,
    fontFamily: 'Arial',
    fontWeight: '800',
    color: colors.black,
  },
  textWelcomeTwo: {
    paddingLeft: 30,
    fontFamily: 'Arial',
    fontWeight: '100',
    color: colors.grey,
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 40,
  },
  forgotText: {
    color: colors.red,
    fontFamily: 'Arial',
    fontWeight: '800',
    textAlign: 'right',
  },
  accountText: {
    color: colors.black,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  loginText: {
    color: colors.red,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
});
export default function LoginScreen({ navigation }) {
  // const navigation = useNavigation();
  const onSubmit = async data => {
    try {
      const response = await fetch('http://10.0.2.2:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        const token = responseData.token;
        console.log('Token:', token);

        // Save the token to AsyncStorage and navigate to the HomeScreen
        await AsyncStorage.setItem('userTokenOne', token); 
        console.log('Token stored in AsyncStorage');

        navigation.reset({
          index: 0,
          routes: [{ 
            name: 'Home',
          }],
        });

      } else {
        // Handle login failure (e.g., show an alert or error message)
        console.log('Login failed. Status:', response.status);
        Alert.alert('Login Failed', 'The username or password is incorrect.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Login Error', 'An error occurred while attempting to log in. Please try again later.');
    }
  };


  const signUp = () => {
    navigation.navigate('SignUp');
  };

  const WelcomePage = () => {
    navigation.navigate('Welcome');
  };

  const forgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');

  return (
    <SafeAreaView style={myStyles.cntainer}>
      <ScrollView>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={WelcomePage}>
            <Image source={images.angleLeft}></Image>
          </TouchableWithoutFeedback>
          <View style={myStyles.logoContainer}>
            <Image source={images.logo}></Image>
          </View>
        </View>

        <View style={myStyles.textContainer}>
          <Text style={myStyles.textWelcomeOne}>
            <Text>Hello! Welcome </Text>
            <Text style={{color: colors.red}}>back</Text>
            <Text>!</Text>
          </Text>
          <Text style={myStyles.textWelcomeTwo}>
            Hello again, you have been missed!{' '}
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

          <View style={myStyles.inputContainers}>
            <Text style={myStyles.label}>Password</Text>

            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should be mimimum 8 characters',
                },
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
                    placeholder="Enter your password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={true}
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

          <TouchableWithoutFeedback onPress={forgetPassword}>
            <Text style={myStyles.forgotText}>Forgot password?</Text>
          </TouchableWithoutFeedback>

          <TouchableHighlight
            style={myStyles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={myStyles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>

        <View style={myStyles.loginContainer}>
          <Text style={myStyles.accountText}>Do not have an account </Text>

          <TouchableWithoutFeedback onPress={signUp}>
            <Text style={myStyles.loginText}>Log in</Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
