import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ResultList from './components/ResultList';

const App: () => React$Node = () => {
  useEffect(() => {
    getJwtToken();
  });

  function getJwtToken() {
    const url = 'https://api.thetvdb.com/login';

    axios
      .post(url, {
        apikey: 'ba3857d2d0970437b1dc8ef69a4abf81',
        userkey: '5ED8E87EB0C6E5.17700117',
        username: 'Wickerman',
      })
      .then(function(response) {
        AsyncStorage.setItem('@storage_Key', response.data.token);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <>
      <SafeAreaView>
        <SearchBar />
      </SafeAreaView>
    </>
  );
};

export default App;
