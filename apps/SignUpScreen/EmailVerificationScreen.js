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
  Linking,
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
import axios from 'axios';

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
    alignItems: 'center',
  },
  textWelcomeOne: {
    fontSize: 30,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  emailTextContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailTextOne: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  emailTextTwo: {
    paddingTop: 10,
    fontSize: 25,
    fontFamily: 'Arial',
    fontWeight: '800',
    color: colors.red,
  },
  emailTextThree: {
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '800',
    paddingTop: 10,
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
  resendCodeText: {
    color: colors.red,
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default function EmailVerificationScreen({route, navigation}) {
  let lastRequestTime = 0; // Initialize the last request time to 0
  const requestInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
  const [verificationCode, setVerificationCode] = useState(null);
  function fetchVerificationCode() {
    const fetchCode = () => {
      fetch('http://10.0.2.2:8080/getVerificationCode', {
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

  const {control, handleSubmit} = useForm();

  const onSubmit = codeSend => {
    //code to nbe sended
    fetch('http://10.0.2.2:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      goToSignUpScreen,
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        // Handle any errors that occur during the fetch request
      });
  };

  const sendAgain = () => {
    console.log();
  };

  const goToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  const {data} = route.params;

  const [secondsRemaining, setSecondsRemaining] = useState(60);

  const decrementTimer = () => {
    if (secondsRemaining > 0) {
      setSecondsRemaining(secondsRemaining - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(decrementTimer, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  useEffect(() => {
    if (secondsRemaining === 0) {
      const linkURL = 'https://example.com';
    }
  }, [secondsRemaining]);

  useEffect(() => {
    fetchVerificationCode();
  }, []);

  return (
    <SafeAreaView style={myStyles.cntainer}>
      <View style={myStyles.header}>
        <TouchableWithoutFeedback onPress={goToSignUpScreen}>
          <Image source={images.angleLeft}></Image>
        </TouchableWithoutFeedback>
        <View style={myStyles.logoContainer}>
          <Image source={images.logo}></Image>
        </View>
      </View>

      <View style={myStyles.textContainer}>
        <Text style={myStyles.textWelcomeOne}>
          <Text style={{color: colors.red}}>Verify</Text> Your Email
        </Text>
      </View>

      <View style={myStyles.emailTextContainer}>
        <Text style={myStyles.emailTextOne}>We sent the code to</Text>
        <Text style={myStyles.emailTextTwo}>{data.email}</Text>
        <Text style={myStyles.emailTextThree}>
          The code is valid for 5 minutes
        </Text>
      </View>

      <View style={myStyles.formContainers}>
        <View style={myStyles.inputContainers}>
          <Text style={myStyles.label}>Verification code</Text>

          <Controller
            name="code"
            control={control}
            rules={{
              required: 'Code is required',
              validate: value =>
                value == 1111 || 'code is not correct',
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
          <Text style={myStyles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>

      <View>
        {secondsRemaining > 0 ? (
          <Text style={myStyles.resendCodeText}>
            Didn' recieve code? wait {secondsRemaining} seconds
          </Text>
        ) : (
          <TouchableWithoutFeedback onPress={handleSubmit(sendAgain)}>
            <Text style={myStyles.resendCodeText}>Send again</Text>
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  );
}
