import React from 'react';
import {TouchableOpacity, View, FlatList, StyleSheet, Text} from 'react-native';
import {withNavigation} from 'react-navigation';

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function ResultList(props) {
  return (
    <FlatList
      data={props.searchResult}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Details', {
              id: item.id,
            })
          }>
          <View style={styles.item}>
            <Text style={styles.title}>{item.seriesName}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default withNavigation(ResultList);
