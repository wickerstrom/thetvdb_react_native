import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import ResultList from './ResultList';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

type myProps = {};

type myState = {searchText: string; searchResult: Array<JSON>};

class SearchBar extends React.Component<myProps, myState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchText: '',
      searchResult: [],
      isLoading: false,
    };
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          onChangeText={e => this.handleChange(e)}
          value={this.state.searchText}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.getAllSeriesInfo(this.state.searchText);
          }}>
          <Text style={styles.btnText}>Search </Text>
        </TouchableOpacity>
        {this.state.isLoading ? (
          <Text>'Loading ...'</Text>
        ) : (
          <ResultList searchResult={this.state.searchResult} />
        )}
      </View>
    );
  }

  async getAllSeriesInfo(searchText: string) {
    if (searchText !== '' && searchText !== undefined) {
      this.setState({searchText: ''});
      const jwtToken = await this.getToken();

      const response = await this.getSeriesSearchResult(searchText, jwtToken);

      if (response !== undefined && response !== null) {
        this.setState({searchResult: response.data.data});
      }
    }
  }

  async getSeriesSearchResult(searchText: string, jwtToken: string) {
    this.setState({isLoading: true});
    const url = `https://api.thetvdb.com/search/series?name=${searchText}`;

    try {
      const config = {
        headers: {Authorization: `Bearer ${jwtToken}`},
      };

      const response = await axios.get(url, config);
      this.setState({isLoading: false});
      return response;
    } catch (error) {
      this.setState({isLoading: false});
      console.log(error);
    }
  }

  async getToken() {
    try {
      const response = await AsyncStorage.getItem('@storage_Key');
      if (response !== null) {
        return response;
      }
    } catch (e) {
      return null;
    }
  }

  handleChange = e => {
    this.setState({searchText: e});
  };
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    margin: 5,
  },
  btn: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default SearchBar;
