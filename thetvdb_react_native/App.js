import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SeriesDetails from './components/SeriesDetails';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const RootStack = createStackNavigator(
  {
    Home: SearchBar,
    Details: SeriesDetails,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  componentDidMount() {
    this.getJwtToken();
  }

  getJwtToken() {
    const url = 'https://api.thetvdb.com/login';

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
  render() {
    return <AppContainer />;
  }
}
