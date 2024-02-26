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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {CheckBox} from 'react-native-elements';
import images from '../../assests/index';
import colors from '../config/colors.js';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

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
  },
  HeadersTextContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeadersText: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  tableLogo: {
    width: 60,
    height: 60,
    marginTop: 30,
  },
  tableAndChairsContainer: {
    width: '100%',
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    width: 150,
    height: 250,
    borderWidth: 2,
    borderColor: colors.purple,
    borderRadius: 10,
  },
  checkboxHorizontal: {
    width: 70,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.purple,
    marginVertical: 15,
  },
  checkboxVertical: {
    width: 30,
    height: 70,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.purple,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  checked: {
    backgroundColor: colors.purple,
  },
  verticalChairsContainer: {
    flexDirection: 'row',
  },
  countContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    color: colors.purple,
    fontSize: 40,
    fontFamily: 'Arial',
    fontWeight: '800',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
  chair: {
    width: 30, // Adjust based on your design
    height: 30, // Adjust based on your design
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.purple,
    backgroundColor: 'red', // To make the chair transparent
    position: 'absolute',
  },
  
});

export default function ChairReserveFirst({navigation, route}) {
  const amountOfChairs = route.params.chairsToSend;
  console.log(amountOfChairs);
  const initialCheckedChairs = Array.from(
    {length: amountOfChairs},
    () => false,
  );
  // Use initialCheckedChairs as the initial state
  const [checkedChairs, setCheckedChairs] = useState(initialCheckedChairs);
  const {imageId, imageSource} = route.params;
  const toggleCheck = index => {
    const updatedCheckedChairs = [...checkedChairs];
    updatedCheckedChairs[index] = !updatedCheckedChairs[index];
    setCheckedChairs(updatedCheckedChairs);
    setAtLeastOneChairChecked(
      updatedCheckedChairs.some(isChecked => isChecked),
    );
  };

  const checkedChairCount = checkedChairs.filter(isChecked => isChecked).length;

  const [atLeastOneChairChecked, setAtLeastOneChairChecked] = useState(false);

  const onSubmit = () => {
    navigation.navigate('ChairReserveSecond', {checkedChairCount});
  };

  const backToReservation = () => {
    navigation.navigate('SelectTableScreen');
  };

  const profilePage = () => {
    navigation.navigate('ProfilePageScreen');
  };

  const chairSize = 20; // Adjust based on your design
const chairStyle = {
  width: chairSize,
  height: chairSize,
  borderRadius: 5, // Adjust the border radius as needed
  borderWidth: 2,
  borderColor: colors.purple,
  backgroundColor: 'transparent',
  position: 'absolute',
};

  return (
    <SafeAreaView style={myStyles.container}>
      <View style={myStyles.insideContainer}>
        <View style={myStyles.header}>
          <TouchableWithoutFeedback onPress={backToReservation}>
            <Image
              source={images.angleLeft}
              style={myStyles.angleLeftIcon}></Image>
          </TouchableWithoutFeedback>
          <View>
            <Text style={myStyles.pageName}>Reservation</Text>
          </View>
          <TouchableWithoutFeedback onPress={profilePage}>
            <Image source={images.profile} style={myStyles.profileIcon}></Image>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <ScrollView>
        <View style={myStyles.HeadersTextContainer}>
          <Text style={myStyles.HeadersText}>
            Choose a chair in table {imageId}
          </Text>
          <Image source={imageSource} style={myStyles.tableLogo}></Image>
        </View>

        <View style={myStyles.tableAndChairsContainer}>
          {/* Central Table */}
          <View style={myStyles.table}></View>

          {/* Chairs around the table */}
          {Array.from({ length: amountOfChairs }, (_, index) => {
  const angle = (index * (2 * Math.PI)) / amountOfChairs;
  const radius = 100; // Adjust this based on your layout
  const centerX = 150; // x-coordinate of the center of the table
  const centerY = 125; // y-coordinate of the center of the table

  const left = Math.cos(angle) * radius + centerX - chairSize / 2;
  const top = Math.sin(angle) * radius + centerY - chairSize / 2;

  return (
    <TouchableOpacity
      key={index}
      onPress={() => toggleCheck(index)}
      style={[
        chairStyle,
        { left, top },
        checkedChairs[index] && myStyles.checked,
      ]}
    ></TouchableOpacity>
  );
})}
        </View>

        <View style={myStyles.countContainer}>
          <Text style={myStyles.counter}>{checkedChairCount}</Text>
        </View>

        <View style={myStyles.buttonContainer}>
          {atLeastOneChairChecked && (
            <TouchableHighlight onPress={onSubmit} style={myStyles.button}>
              <Text style={myStyles.buttonText}>Continue</Text>
            </TouchableHighlight>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
