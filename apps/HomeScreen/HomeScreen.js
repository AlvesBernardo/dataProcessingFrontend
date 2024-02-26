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
import QrScanningScreen from '../QrScanningScreen/QrScanningScreen';
import images from '../../assests/index';
import colors from '../config/colors.js';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const myStyles = StyleSheet.create({
  cntainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    overflow: 'hidden',
  },
  insideCntainer: {
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
  },
  HeadersTextContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeadersText: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  horizontalScrollContainer: {
    width: '100%',
    height: 'auto',
  },
  upcomingContainer: {
    paddingHorizontal: 30,
    width: '80%',
    flexDirection: 'row',
    columnGap: 30,
  },
  upcomingContainerOne: {
    width: 300,
    height: 120,
    flexDirection: 'row',
  },
  upcomingContainerOneLeft: {
    width: '40%',
    height: 120,
    backgroundColor: colors.white,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: 'black',
  },
  upcomingContainerOneRight: {
    width: '60%',
    height: 120,
    backgroundColor: 'rgba(92, 41, 108, 0.5)',
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  tableIcons: {
    width: 80,
    height: 80,
  },
  upcomingTextHeader: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  boldTextUpcoming: {
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: '60%',
    height: 40,
    backgroundColor: colors.purple,
    marginTop: 30,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  newsContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: colors.purple,
    marginBottom: 50,
  },
  newsInsideContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsPictures: {
    width: 128,
    height: 128,
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: colors.purple,
  },
});

export default function HomeScreen({navigation}) {
  const [news, setNews] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState(null); // Add this line
  const [data, setData] = useState({});

  //console.log(handleToken);

  //console.log('Test'+ token);
  // Fetch data when the component mounts
  useEffect(() => {
    // Fetch token from AsyncStorage
    const getToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userTokenOne');
        if (userToken) {
          const decodedToken = jwtDecode(userToken);
          console.log('Decoded Token:', decodedToken);
          setDecodedToken(decodedToken); // Set the decodedToken state
          const userType = decodedToken?.type;
          console.log('User Type:', userType);
          setToken(userToken);
          console.log('Token from AsyncStorage:', userToken);
        } else {
          console.log('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching token from AsyncStorage:', error);
      }
    };

    getToken();
    console.log('Token state:', token);

    // Fetch data when the component mounts
    fetch('http://10.0.2.2:8080/reservations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setMyBookings(data);
      })
      .catch(
        error => {
          console.error('Error fetching data:', error);
        },
        [token],
      );

    // Fetch news data when the component mounts
    fetch('http://10.0.2.2:8080/getNews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('News:', data);
          setNews(data);
        } else {
          console.log('Verification code not found');
        }
      })
      .catch(error => {
        console.error('Error fetching verification code:', error);
      });
  }, [token]);

  const reservationPage = () => {
    navigation.navigate('SelectTableScreen');
  };

  const openMenu = () => {
    navigation.openDrawer();
  };
  const profilePage = () => {
    navigation.navigate('ProfilePageScreen');
  };

  const adminPanel = () => {
    navigation.navigate('AdminWelcomeScreen');
  };
  // const handleScanButtonPress = () => {
  //     navigation.navigate('QrScanningScreen');
  // };

  const handleLogout = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('userTokenOne');
      // Navigate to the login screen
      navigation.navigate('LogIn');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaView style={myStyles.cntainer}>
      <View style={myStyles.insideCntainer}>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={openMenu}>
            <Image
              source={images.hamburgerMenu}
              style={myStyles.hamburgerIcon}></Image>
          </TouchableWithoutFeedback>
          <View>
            <Text style={myStyles.pageName}>Home</Text>
          </View>
          <TouchableWithoutFeedback onPress={profilePage}>
            <Image source={images.profile} style={myStyles.profileIcon}></Image>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <ScrollView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={myStyles.horizontalScrollContainer}>

        </ScrollView>

        <View style={myStyles.insideCntainer}>
          <View>
            <TouchableHighlight
              style={myStyles.button}
              onPress={reservationPage}>
              <Text style={myStyles.buttonText}>Create a new reservation</Text>
            </TouchableHighlight>
          </View>

          <View>
            {decodedToken?.type === 1 && (
              <TouchableHighlight style={myStyles.button} onPress={adminPanel}>
                <Text style={myStyles.buttonText}>Access Admin panel</Text>
              </TouchableHighlight>
            )}
          </View>

          <TouchableHighlight onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableHighlight>

          <View style={myStyles.HeadersTextContainer}>
            <Text style={myStyles.HeadersText}>News</Text>
          </View>

          <View style={myStyles.newsContainer}>
            <View style={myStyles.newsInsideContainer}>
              <View style={{width: '50%'}}>
                <Text>
                  Do you know the importance of taking breaks?Activate your
                  break notifications to remember every time!
                </Text>
              </View>
              <View>
                <Image
                  source={images.newsOne}
                  style={myStyles.newsPictures}></Image>
              </View>
            </View>

            <View style={myStyles.newsContainer}>
              {Array.isArray(news) ? (
                news.map((item, index) => (
                  <View key={index} style={myStyles.newsInsideContainer}>
                    <View style={{width: '50%'}}>
                      <Text>{item.dtNews}</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      {/* <Image
            source={images.newsOne}
            style={myStyles.newsPictures}
          /> */}
                    </View>
                  </View>
                ))
              ) : (
                <Text>No news available</Text>
              )}
            </View>
            <View style={myStyles.line} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
