import React from 'react';
import axios from 'axios';
import ResultList from './ResultList';
import {getJWTToken} from '../common/functions';
import {BASE_URL} from '../config';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

type Props = {};

type State = {searchText: string; searchResult: Array<JSON>};

class SearchBar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchText: '',
      searchResult: [],
      isLoading: false,
      statusText: 'Loading ...',
    };
  }
  render() {
    return (
      <View>
        <View style={styles.searchBarView}>
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
        </View>
        {this.state.isLoading ? (
          <Text style={styles.loadingText}>{this.state.statusText}</Text>
        ) : (
          <ResultList searchResult={this.state.searchResult} />
        )}
      </View>
    );
  }

  async getAllSeriesInfo(searchText: string) {
    if (searchText !== '' && searchText !== undefined) {
      this.setState({searchText: ''});
      const jwtToken = await getJWTToken();
      const response = await this.getSeriesSearchResult(searchText, jwtToken);

      if (response !== undefined && response !== null) {
        this.setState({searchResult: response.data.data});
      }
    }
  }

  async getSeriesSearchResult(searchText: string, jwtToken: string) {
    this.setState({isLoading: true, statusText: 'Loading ...'});
    const url = `${BASE_URL}search/series?name=${searchText}`;
    console.log(url);
    try {
      const config = {
        headers: {Authorization: `Bearer ${jwtToken}`},
      };

      const response = await axios.get(url, config);
      this.setState({isLoading: false});
      return response;
    } catch (error) {
      if (error.response.status === 404) {
        console.log('No result found');
        this.setState({statusText: 'No result found.'});
      } else {
        console.log(error.response);
      }
    }
  }

  handleChange = e => {
    this.setState({searchText: e});
  };
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  btn: {
    backgroundColor: '#439D43',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 30,
  },
  searchBarView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default SearchBar;
