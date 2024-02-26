import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import images from '../../assests/index';

const myStyles = StyleSheet.create({
  drawerHeader: {
    marginTop: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItems: {
    marginTop: 30,
  },
});

export default CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={myStyles.drawerHeader}>
        <Image source={images.logo}></Image>
      </View>

      <View style={myStyles.drawerItems}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};
