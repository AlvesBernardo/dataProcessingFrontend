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
    paddingTop: 50,
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
    paddingTop: 40,
  },
  loginText: {
    color: colors.red,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
});

export default function ForgotPasswordLinkScreen({navigation}) {
  const [verificationCode, setVerificationCode] = useState(null);

  const onSubmit = data => {
    function fetchVerificationCode() {
      const fetchCode = () => {
        fetch('http://10.0.2.2:8080/resetPasswordEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(data => {
            const code = data.verificationCode;
            if (code) {
              setVerificationCode(code);
              console.log('Verification code received:', code);
            } else {
              console.log('Verification code not found');
            }
          })
          .catch(error => {
            console.error('Error fetching verification code:', error);
          });
      };

      // Fetch initially
      fetchCode();

      // Fetch every minute
      const intervalId = setInterval(fetchCode, 60000); // 60000 milliseconds = 1 minute

      // Optionally, you can clear the interval when you no longer need to fetch
      // clearInterval(intervalId); // Call this to stop the fetches
    }
    useEffect(() => {
      fetchVerificationCode();
    }, []);

    Alert.alert(
      'Password Changed successfuly',
      'Now you can login with your new password',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('LogIn');
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

  const pwd = watch('password');

  return (
    <SafeAreaView style={myStyles.cntainer}>
      <ScrollView>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={loginPage}>
            <Image source={images.angleLeft}></Image>
          </TouchableWithoutFeedback>
          <View style={myStyles.logoContainer}>
            <Image source={images.logo}></Image>
          </View>
        </View>

        <View style={myStyles.textContainer}>
          <Text style={myStyles.textWelcomeOne}>
            <Text style={{color: colors.red}}>Reset</Text> Your password
          </Text>
          <Text style={myStyles.textWelcomeTwo}>Enter your new password!</Text>
        </View>

        <View style={myStyles.formContainers}>
          <View style={myStyles.inputContainers}>
            <Text style={myStyles.label}>Email</Text>

            <Controller
              name="email"
              control={control}
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
                    editable={false}
                  />
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
                validate: value =>
                  value === verificationCode || 'Password does not match',
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
            <Text style={myStyles.buttonText}>Reset</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
