import React from 'react';
import SearchBar from './components/SearchBar';
import SeriesDetails from './components/SeriesDetails';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {generateJwtToken} from './common/functions';

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
    generateJwtToken();
  }

  render() {
    return <AppContainer />;
  }
}
