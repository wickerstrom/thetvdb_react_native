import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {BASE_URL} from '../config';

export async function getJWTToken() {
  try {
    const response = await AsyncStorage.getItem('@storage_Key');
    if (response !== null) {
      return response;
    } else {
      generateJwtToken();
    }
  } catch (e) {
    return null;
  }
}

export function generateJwtToken() {
  const url = `${BASE_URL}login`;

  axios
    .post(url, {
      apikey: 'ba3857d2d0970437b1dc8ef69a4abf81',
      userkey: '5ED8E87EB0C6E5.17700117',
      username: 'Wickerman',
    })
    .then(response => {
      AsyncStorage.setItem('@storage_Key', response.data.token);
    })
    .catch(function(error) {
      console.log(error);
    });
}
