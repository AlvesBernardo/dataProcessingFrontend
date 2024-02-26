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
  FlatList
} from 'react-native';
import {
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
    flex: 1,
    backgroundColor: colors.backgroundColor,
    overflow: 'hidden',
  },
  insideContainer: {
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
    alignSelf: 'center',
  },
  pageNameContainer: {
    width: '100%',
    paddingEnd: 50,
  },
  text: {
    fontSize: 30,
    fontFamily: 'Arial',
    fontWeight: '800',
    alignSelf: 'left',
    color: colors.black,
    marginBottom: 30,
    marginTop: 50,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  liatItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray
  },
  profilesContainer: {
    //paddingHorizontal: 30,
    width: '80%',
    flexDirection: 'row',
    columnGap: 30,
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.redLowOpacity,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCircle2: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.purpleLowOpacity,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  profilePicture: {
    width: 50,
    height: 50,
  },
   line: {
      width: '90%',
      alignSelf: 'center',
      borderBottomColor: colors.black,
      borderBottomWidth: 3,
      marginTop: 30,
    },
});

export default function SearchFriends({navigation}) {
    const backToHome = () => {
        navigation.navigate('HomeScreen');
      };

      const friendProfile = () => {
        navigation.navigate('FriendProfileScreen');
      };

      const AddFriend = () => {
        navigation.navigate('AddFriendScreen');
      };

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const data = [
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' },
      { id: '3', name: 'Doe' },
    ];

    const handleSearch = (text) => {
      setSearchText(text);
      const filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredItems);
    }

    const renderItem = ({ item }) => (
      <Text style={myStyles.listItem}>{item.name}</Text>
    )

   return (
      <SafeAreaView style={myStyles.container}>
        <View style={myStyles.insideContainer}>
          <View style={myStyles.header}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View>
                <Image source={images.angleLeft} style={myStyles.angleLeftIcon} />
              </View>
            </TouchableWithoutFeedback>
            <View style={myStyles.pageNameContainer}>
              <Text style={myStyles.pageName}>Close Friends</Text>
            </View>
          </View>

          <ScrollView>
             <Text style={myStyles.text}>Find new Friends!</Text>
          </ScrollView>

            <FlatList
              data={searchText ? filteredData : []}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListHeaderComponent={() => (
                  <TextInput
                    style={myStyles.searchBar}
                    placeholder="Search"
                    onChangeText={handleSearch}
                    value={searchText}
                  />
              )}
            />

            <Text style={myStyles.text}>Suggested Friends</Text>

            <ScrollView horizontal>
                <View style={myStyles.profilesContainer}>
                    <View style={myStyles.profileCircle}>
                        <TouchableHighlight onPress={AddFriend}>
                            <View>
                                <Image source={images.profile} style={myStyles.profilePicture} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={myStyles.profileCircle}>
                        <Image source={images.profile} style={myStyles.profilePicture}></Image>
                    </View>
                    <View style={myStyles.profileCircle}>
                        <Image source={images.profile} style={myStyles.profilePicture}></Image>
                    </View>
                </View>
            </ScrollView>

            <View style={myStyles.line}></View>
            <Text style={myStyles.text}>More friends</Text>

            <ScrollView horizontal>
                <View style={myStyles.profilesContainer}>
                    <View style={myStyles.profileCircle2}>
                        <Image source={images.profile} style={myStyles.profilePicture}></Image>
                    </View>
                    <View style={myStyles.profileCircle2}>
                        <Image source={images.profile} style={myStyles.profilePicture}></Image>
                    </View>
                    <View style={myStyles.profileCircle2}>
                        <Image source={images.profile} style={myStyles.profilePicture}></Image>
                    </View>
                </View>
            </ScrollView>
        </View>
      </SafeAreaView>
   );
};