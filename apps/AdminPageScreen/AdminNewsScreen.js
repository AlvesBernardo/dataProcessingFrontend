import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
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
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../../assests/index';
import {useForm, Controller} from 'react-hook-form';
import colors from '../config/colors.js';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {blue} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
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
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  HeadersText: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
    margin: 15,
  },
  logoBlue: {
    width: '70%',
    height: '70%',
    marginBottom: 60,
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
  date: {
    width: '80%',
    alignSelf: 'center',
  },
  dateText: {
    marginTop: 30,
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
    alignSelf: 'center',
  },
  timesContainer: {
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    width: '80%',
    height: 40,
    backgroundColor: colors.purple,
    margin: 10,
  },
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    width: '80%',
    height: 40,
    backgroundColor: colors.purple,
    marginBottom: 10,
  },
  buttonDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    width: '80%',
    height: 40,
    backgroundColor: colors.purple,
    margin: 10,
    position: 'absolute',
    zIndex: -999,
    top: 60,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  logo: {
    width: 200,
    height: 30,
    margin: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  picker: {
    width: '80%',
  },
});

export default function AdminNewsScreen({navigation}) {
  const [news, setNews] = useState([]);
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState(null); // Add this line
  const { control, handleSubmit, watch } = useForm();

  const openMenu = () => {
    navigation.openDrawer();
  };
  const profilePage = () => {
    navigation.navigate('ProfilePageScreen');
  };
  const back = () => {
    navigation.navigate('AdminWelcomeScreen');
  };
  const [selected, setSelected] = React.useState('');

  const data = [
    {key: '1', value: 'Mobiles', disabled: true},
    {key: '2', value: 'Appliances'},
    {key: '3', value: 'Cameras'},
  ];

  const handleChooseImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',
      });

      // You can perform your storage logic here with the 'image' object
      Alert.alert('Success', 'Image selected successfully!');
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };



  useEffect(() => {
    const getToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userTokenOne');
        if (userToken) {
          const decodedToken = jwtDecode(userToken);
          console.log('Decoded Token:', decodedToken);
          setDecodedToken(decodedToken);
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

    const addNews = (data) => {
      const newNews = data.news;
    
      fetch('http://10.0.2.2:8080/addNews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ news: newNews }), // Fix here
      });
    };

    const deleteNews = id => {
      if (!id) {
        console.error('No news ID selected for deletion');
        return;
      }

      fetch(`http://10.0.2.2:8080/deleteNews/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            setNews(result.remainingNews);
            setSelected(null);
          } else {
            console.log('News item not found');
          }
        })
        .catch(error => {
          console.error('Error deleting news:', error);
        });
    };

    getToken();

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

  return (
    <SafeAreaView style={myStyles.container}>
      <View style={myStyles.insideCntainer}>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={back}>
            <Image source={images.angleLeft} style={myStyles.angleLeft}></Image>
          </TouchableWithoutFeedback>

          <View>
            <Text style={myStyles.pageName}>News</Text>
          </View>

          <TouchableWithoutFeedback onPress={profilePage}>
            <Image source={images.profile} style={myStyles.profileIcon}></Image>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <ScrollView>
        <View style={myStyles.HeadersTextContainer}>
          <Text style={myStyles.HeadersText}>Change news</Text>
          <Image
            style={myStyles.logoBlue}
            source={images.logoBlue}
            resizeMode="contain"></Image>
        </View>

        <View style={myStyles.HeadersTextContainer}>
          <Text style={myStyles.HeadersText}>Add news</Text>
          <TextInput
            style={myStyles.input}
            name = "news"
            placeholder="News content"
            onChangeText={text => {}}
          />
          <TouchableHighlight
            style={myStyles.button}
            onPress={handleChooseImage}>
            <Text style={myStyles.buttonText}>Insert Image</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={myStyles.buttonAdd}
            onPress={handleSubmit(addNews)}>
            <Text style={myStyles.buttonText}>Add</Text>
          </TouchableHighlight>
        </View>

        <View style={myStyles.HeadersTextContainer}>
          <Text style={myStyles.HeadersText}>Delete news</Text>
          <View style={myStyles.picker}>
            {news.length > 0 ? (
              <SelectList
                setSelected={val => setSelected(val)}
                data={news.map(item => ({
                  key: item.idNews.toString(),
                  value: item.dtNews,
                }))}
                save="value"
                dropdownStyles={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: 40,
                  width: '100%',
                  zIndex: 999,
                }}
              />
            ) : (
              <Text>No news to display</Text>
            )}
            {selected && (
              <TouchableHighlight style={myStyles.buttonDelete}>
                <Text
                  style={myStyles.buttonText}
                  onPress={() => deleteNews(selected.idNews)}>
                  Delete
                </Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
