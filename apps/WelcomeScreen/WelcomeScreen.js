import React, {Component} from 'react';
import {
  Animated,
  Easing,
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
import colors from '../config/colors.js';

const bgImages = [images.backgroundImg, images.backgroundImg];
const imageWidth = 550;

const myStyles = StyleSheet.create({
  cntainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  animationFirstView: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 100, // Adjust as needed
    borderBottomRightRadius: 100,
    overflow: 'hidden',
  },
  animationSecondView: {
    overflow: 'hidden',
    width: imageWidth,
  },
  logoWhite: {
    position: 'absolute',
    bottom: '40%',
    width: '80%',
    height: '80%',

  },
  findTableText: {
    alignSelf: 'center',
    paddingTop: 30,
    color: colors.red,
    fontSize: 30,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  findTableTextTwo: {
    alignSelf: 'center',
    width: '80%',
    paddingTop: 10,
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '800',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginTop: 60,
    flexDirection: 'row',
  },
  logInButton: {
    backgroundColor: colors.purple,
    width: 130,
    height: 60,
    borderTopLeftRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButton: {
    backgroundColor: colors.red,
    width: 130,
    height: 60,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
});

class WelcomeScreen extends Component {
  logInPage = () => {
    this.props.navigation.navigate('LogIn'); // Replace 'SignUp' with your actual screen name
  };

  signUpPage = () => {
    this.props.navigation.navigate('SignUp'); // Replace 'SignUp' with your actual screen name
  };

  animatedValue;
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.startAnimation();
  }
  startAnimation() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 20000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        this.animatedValue.setValue(0);
        this.startAnimation();
      }
    });
  }

  render() {
    const translateX = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -imageWidth],
    });

    return (
      <SafeAreaView style={myStyles.cntainer}>
        <View style={myStyles.animationFirstView}>
          <View style={myStyles.animationSecondView}>
            <Animated.View
              style={{
                width: `${bgImages.length * 100}%`, // Width to accommodate all images
                flexDirection: 'row',
                overflow: 'hidden',
                transform: [
                  {
                    translateX: translateX,
                  },
                ],
              }}>
              {bgImages.map((source, index) => (
                <Image
                  key={index}
                  source={source}
                  style={{
                    width: imageWidth,
                  }}
                />
              ))}
            </Animated.View>
          </View>
        </View>

        <Image style={myStyles.logoWhite} source={images.logoRedBgWhite} resizeMode="contain"></Image>

        <View>
          <Text style={myStyles.findTableText}>
            Find
            <Text style={{color: '#5C296C', opacity: 0.3}}> Your Favourite</Text>{' '}
            Table
          </Text>
          <Text style={myStyles.findTableTextTwo}>
            {' '}
            and chairs in your favourite office and work with your best friends
          </Text>
        </View>

        <View style={myStyles.buttonContainer}>
          <TouchableHighlight
            style={myStyles.logInButton}
            onPress={this.logInPage}>
            <Text style={myStyles.buttonText}>Log in</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={myStyles.signUpButton}
            onPress={this.signUpPage}>
            <Text style={myStyles.buttonText}>Get started</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(WelcomeScreen);
