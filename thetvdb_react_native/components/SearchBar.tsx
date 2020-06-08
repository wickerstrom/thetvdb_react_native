import React from 'react';
import axios from 'axios';
import ResultList from './ResultList';
import {getJWTToken} from '../common/functions';
// @ts-ignore
import {BASE_URL} from '../config';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

interface IProps {}

interface IState {
  searchText: string;
  searchResult: Array<JSON>;
  isLoading: boolean;
  statusText: string;
}

class SearchBar extends React.Component<IProps, IState> {
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
            onChangeText={(e: String) => this.handleChange(e)}
            value={this.state.searchText}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.getAllSeriesInfo(this.state.searchText);
            }}>
            <Text style={styles.btnText}>Search</Text>
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

  async getSeriesSearchResult(
    searchText: string,
    jwtToken: string | null | undefined,
  ) {
    this.setState({isLoading: true, statusText: 'Loading ...'});
    const url = `${BASE_URL}search/series?name=${searchText}`;
    try {
      const config = {
        headers: {Authorization: `Bearer ${jwtToken}`},
      };

      const response = await axios.get(url, config);
      this.setState({isLoading: false});
      return response;
    } catch (error) {
      if (error.response.status === 404) {
        this.setState({statusText: 'No result found.'});
      } else {
        console.log(error.response);
      }
    }
  }

  handleChange = (e: any) => {
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
