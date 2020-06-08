import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class SeriesDetails extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      seriesInfo: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    if (
      JSON.stringify(this.props.navigation.getParam('id')) !== undefined &&
      JSON.stringify(this.props.navigation.getParam('id')) !== null
    ) {
      let response = await this.getInfo(
        JSON.stringify(this.props.navigation.getParam('id')),
      );
      if (response !== null && response !== undefined) {
        this.setState({seriesInfo: response.data.data});
      }
    }
  }

  async getInfo(id: string) {
    const jwtToken = await this.getToken();
    const response = await this.getSeriesDetails(id, jwtToken);
    return response;
  }

  async getSeriesDetails(id: string, jwtToken: string) {
    this.setState({isLoading: true});
    const url = `https://api.thetvdb.com/series/${id}`;

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
      console.log(response);
      if (response !== null) {
        return response;
      }
    } catch (e) {
      return null;
    }
  }

  render() {
    return (
      <View>
        {this.state.isLoading ? (
          <Text>'Loading ...'</Text>
        ) : (
          <View style={styles.seriesDetailsView}>
            <Text style={styles.seriesNameText}>
              {this.state.seriesInfo.seriesName}
            </Text>
            <Text style={styles.seriesOverviewText}>
              {this.state.seriesInfo.overview}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  seriesNameText: {
    fontSize: 20,
    textAlign: 'center',
  },
  seriesDetailsView: {
    marginTop: 5,
  },
  seriesOverviewText: {
    textAlign: 'justify',
    padding: 5,
  },
});

export default withNavigation(SeriesDetails);
