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
    paddingLeft: 30,
    fontFamily: 'Arial',
    fontWeight: '100',
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
    paddingTop: 40,
  },
  loginText: {
    color: colors.red,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
});

export default function SignUpScreen({navigation}) {
  let lastVerificationRequestTime = 0;
  const requestInterval = 5 * 60 * 1000; // 5 minutes in milliseconds

  const onSubmit = data => {
    navigation.navigate('EmailVerification', {data: data});

    const currentTime = Date.now();
    console.log('onSubmit is called'); // Add this line
    // Check if enough time has passed since the last request
    if (currentTime - lastVerificationRequestTime >= requestInterval) {
      // Perform the fetch request
      fetch('http://10.0.2.2:8080/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data as needed
          console.log(data);
        })
        .catch(error => {
          // Handle any errors that occur during the fetch request
          console.error('Error sending verification email:', error);
        });

      // Update the last request time to the current time
      lastVerificationRequestTime = currentTime;
    } else {
      // The 5-minute interval hasn't passed; you can choose to do nothing or handle this case
      console.log('Request is within the 5-minute interval; no action taken.');
    }
  };

  const loginPage = () => {
    navigation.navigate('LogIn');
  };

  const WelcomePage = () => {
    navigation.navigate('Welcome');
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
            <Image style={myStyles.logo} source={images.logoRed} resizeMode='contain'></Image>
          </View>
        </View>

        <View style={myStyles.textContainer}>
          <Text style={myStyles.textWelcomeOne}>
            <Text style={{color: colors.red}}>Create</Text> Account
          </Text>
          <Text style={myStyles.textWelcomeTwo}>
            Connect with your friends today!
          </Text>
        </View>

        <View style={myStyles.formContainers}>
          <View style={myStyles.inputContainers}>
            <Text style={myStyles.label}>Name</Text>

            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Name is required',
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
                    placeholder="John"
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
              <Text style={myStyles.label}>Company role</Text>

              <Controller
                name="companyRole"
                control={control}
                rules={{
                  required: 'Your company role is required',
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
                      placeholder="Marketing"
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

          <View style={myStyles.inputContainers}>
            <Text style={myStyles.label}>Repeat your password</Text>

            <Controller
              name="passwordRepeat"
              control={control}
              rules={{
                required: 'Password repeat is required',
                validate: value => value === pwd || 'Password does not match',
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
                    placeholder="Enter your password again"
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

          <TouchableHighlight
            style={myStyles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={myStyles.buttonText}>Sign up</Text>
          </TouchableHighlight>
        </View>

        <View style={myStyles.loginContainer}>
          <Text>Already have an account? </Text>

          <TouchableWithoutFeedback onPress={loginPage}>
            <Text style={myStyles.loginText}>Log in</Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
