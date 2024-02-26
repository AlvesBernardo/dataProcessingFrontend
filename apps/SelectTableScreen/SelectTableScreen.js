import React, {useRef} from 'react';
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
  FlatList,
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
import {useEffect, useState} from 'react';
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
  horizontalScrollContainerFirst: {
    width: '100%',
    paddingBottom: 50,
    height: 'auto',
  },
  line: {
    width: '90%',
    alignSelf: 'center',
    borderBottomColor: colors.black,
    borderBottomWidth: 3,
  },
  horizontalScrollContainerSecond: {
    width: '100%',
    height: 'auto',
  },
  upcomingContainer: {
    paddingHorizontal: 30,
    width: '80%',
    flexDirection: 'row',
    columnGap: 30,
  },
  ImageCircleContainersOne: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.purpleLowOpacity,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageCircleContainersTwo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.redLowOpacity,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableIcons: {
    width: 80,
    height: 80,
  },
  footerContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  footerText: {
    color: colors.black,
    fontFamily: 'Arial',
    fontWeight: '500',
  },
  reserveText: {
    color: colors.red,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
});

export default function SelectTableScreen({navigation}) {
  const [tables, setTables] = useState([]);
  const [sharedTables, sendSharedTables] = useState([]);

  useEffect(() => {
    // Fetch news data when the component mounts
    fetch('http://10.0.2.2:8080/sendTables', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          //console.log('Tables:', data);
          // Store the news data in the state
          sendSharedTables(data);
        } else {
          console.log('Tables not found');
        }
      })
      .catch(error => {
        console.error('Error fetching tabe code:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch news data when the component mounts
    fetch('http://10.0.2.2:8080/sendFullAvailableTable', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid content type. Expected JSON.');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          console.log('Tables:', data);
          // Store the news data in the state
          setTables(data);
        } else {
          console.log('Tables not found');
        }
      })
      .catch(error => {
        console.error('Error fetching tabe code:', error);
      });
  }, []);

  const openMenu = () => {
    navigation.openDrawer();
  };

  const profilePage = () => {
    navigation.navigate('ProfilePageScreen');
  };

  const handleImagePressAvailableTables = (imageId, imageSource) => {
    navigation.navigate('ReserveTableScreen', {
      tableId: tables.idTableId,
      imageSource,
    });
  };

  const handleImagePressSharedTables = (idImage, imageSource, chairsToSend) => {
    const selectedTable = sharedTables.find(table => table.idTable === idImage);
    if (selectedTable) {
      console.log('Chairs to Send:', selectedTable.dtChairs);
      navigation.navigate('ChairReserveFirst', {
        idTable: idImage,
        imageSource,
        chairsToSend: selectedTable.dtChairs,
      });
    } else {
      console.error('Table not found');
    }
  };
  const reserveWholeLocation = () => {
    navigation.navigate('ReserveLocationScreen');
  };

  return (
    <SafeAreaView style={myStyles.container}>
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
          <Text style={myStyles.HeadersText}>Available Tables</Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={myStyles.horizontalScrollContainerFirst}>
          <View style={myStyles.upcomingContainer}>
            {tables.map(table => (
              <TouchableWithoutFeedback
                key={table.idTable} // Add a unique key prop here
                onPress={() =>
                  handleImagePressAvailableTables(table.idTable, table.source)
                }>
                <View style={myStyles.ImageCircleContainersOne}>
                  <Image source={images.camera} style={myStyles.tableIcons} />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>

        <View style={myStyles.line}></View>

        <View style={myStyles.HeadersTextContainer}>
          <Text style={myStyles.HeadersText}>Shared Tables</Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={myStyles.horizontalScrollContainerSecond}>
          <View style={myStyles.upcomingContainer}>
            {Array.isArray(sharedTables) &&
              sharedTables.map((item, index) => (
                <TouchableWithoutFeedback
                  key={item.idTable} // Add a unique key prop here
                  onPress={() =>
                    handleImagePressSharedTables(item.idTable, item.source)
                  }>
                  <View style={myStyles.ImageCircleContainersOne}>
                    <Image source={images.camera} style={myStyles.tableIcons} />
                  </View>
                </TouchableWithoutFeedback>
              ))}
          </View>
        </ScrollView>

        <View style={myStyles.footerContainer}>
          <Text style={myStyles.footerText}>
            Want to reserve the whole location?{' '}
          </Text>

          <TouchableWithoutFeedback onPress={reserveWholeLocation}>
            <Text style={myStyles.reserveText}>Click here</Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
