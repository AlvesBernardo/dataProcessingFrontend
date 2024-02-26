// tokenUtils.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export const getToken = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userTokenOne');
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      return { userToken, decodedToken };
    } else {
      console.log('No token found in AsyncStorage');
      return { userToken: null, decodedToken: null };
    }
  } catch (error) {
    console.error('Error fetching token from AsyncStorage:', error);
    return { userToken: null, decodedToken: null };
  }
};
