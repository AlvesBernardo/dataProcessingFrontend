import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  SectionList,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import images from '../../assests/index';
import { ScrollView } from 'react-native-gesture-handler';

export default function SettingsScreen({navigation}) {
  const [locationSwitch, setLocationSwitch] = useState(false);
  const [breakNotificationSwitch, setBreakNotificationSwitch] = useState(false);
  const [emailNotificationSwitch, setEmailNotificationSwitch] = useState(false);
  const openMenu = () => {
    navigation.openDrawer();
  };
  const profilePage = () => {
    navigation.navigate('ProfilePageScreen');
  };

  const myStyles = StyleSheet.create({
    container: {
      padding: 20,
    },
    header1: {
      alignSelf: 'center',
      paddingTop: 20,
      fontWeight: 'bold',
      fontSize: 35,
      color: 'black',
      paddingBottom: 40,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    image: {
      width: 24,
      height: 24,
      marginRight: 10,
      resizeMode: 'contain',
    },
    title: {
      flex: 1,
    },
    indentedItem: {
      marginLeft: 20,
    },
    hamburgerIcon: {
      width: 40,
      height: 40,
    },
    profileIcon: {
      width: 30,
      height: 30,
    },
    insideCntainer: {
      width: '90%',
      alignSelf: 'center',
    },
    pageName: {
      fontSize: 20,
      fontFamily: 'Arial',
      fontWeight: '800',
    },
  });

  const accountSection = [
    {
      title: 'Account',
      data: [
        {
          title: 'Profile',
          icon: images.profilePink,
          onPress: () => navigation.navigate('Profile'),
        },
        {
          title: 'Reservations',
          icon: images.reservationsPink,
          onPress: () => navigation.navigate('Reservations'),
        },
        {
          title: 'Turn on location',
          switch: true,
          switchValue: locationSwitch,
          onSwitchChange: () => setLocationSwitch(!locationSwitch),
          icon: images.locationPink,
        },
      ],
    },
  ];

  const notificationsSection = [
    {
      title: 'Notifications',
      data: [
        {
          title: 'Break notifications',
          switch: true,
          switchValue: breakNotificationSwitch,
          onSwitchChange: () =>
            setBreakNotificationSwitch(!breakNotificationSwitch),
          icon: images.breakPink,
        },
        {
          title: 'Email notifications',
          switch: true,
          switchValue: emailNotificationSwitch,
          onSwitchChange: () =>
            setEmailNotificationSwitch(!emailNotificationSwitch),
          icon: images.emailPink,
        },
      ],
    },
  ];

  const renderItem = ({item, index, section}) => {
    // Check if the current section is the 'Account' section
    const isAccountSection = section.title === 'Account';

    // Check if the current item has an onPress function or if its title matches specific values
    if (
      item.onPress ||
      item.title === 'Profile' ||
      item.title === 'Reservations' ||
      item.title === 'Turn on location'
    ) {
      // If the conditions are met, return a TouchableHighlight component
      // that triggers the onPress function when pressed
      return (
        <TouchableHighlight onPress={item.onPress} underlayColor="#DDDDDD">
          <View
            style={[
              myStyles.item,
              (!isAccountSection ||
                item.title === 'Profile' ||
                item.title === 'Reservations' ||
                item.title === 'Turn on location') &&
                myStyles.indentedItem,
            ]}>
            <Image source={item.icon} style={myStyles.image} />
            <Text style={myStyles.title}>{item.title}</Text>
            {item.switch && (
              <Switch
                value={item.switchValue}
                onValueChange={item.onSwitchChange}
                thumbColor={item.switchValue ? 'white' : 'white'} // Pink when active, gray when inactive
                trackColor={{false: 'gray', true: '#CC3362'}} // Gray when inactive, pink when active
              />
            )}
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <View
        style={[
          myStyles.item,
          (!isAccountSection ||
            item.title === 'Profile' ||
            item.title === 'Reservations' ||
            item.title === 'Turn on location') &&
            myStyles.indentedItem,
        ]}>
        <Image source={item.icon} style={myStyles.image} />
        <Text style={myStyles.title}>{item.title}</Text>
        {item.switch && (
          <Switch
            value={item.switchValue}
            onValueChange={item.onSwitchChange}
            thumbColor={item.switchValue ? 'white' : 'white'} // Pink when active, gray when inactive
            trackColor={{false: 'gray', true: '#CC3362'}} // Gray when inactive, pink when active
          />
        )}
      </View>
    );
  };

  return (
    <ScrollView style={myStyles.container}>
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
        <Text style={myStyles.header1}>Settings</Text>
        <SectionList
          sections={[...accountSection, ...notificationsSection]}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={({section: {title}}) => (
            <Text style={myStyles.sectionHeader}>{title}</Text>
          )}
        />
        </ScrollView>
      </ScrollView>
    
  );
}
