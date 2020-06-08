import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
// @ts-ignore
import {APIKEY, USERNAME, USERKEY, BASE_URL} from 'react-native-dotenv';

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
  if (APIKEY !== undefined && USERKEY !== undefined && USERNAME !== undefined) {
    axios
      .post(url, {
        apikey: APIKEY,
        userkey: USERKEY,
        username: USERNAME,
      })
      .then(response => {
        AsyncStorage.setItem('@storage_Key', response.data.token);
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    console.log('Apikey, Userkey or UserName is undefined.');
  }
}
