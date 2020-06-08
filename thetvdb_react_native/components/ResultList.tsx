import React from 'react';
import {TouchableOpacity, View, FlatList, StyleSheet, Text} from 'react-native';
import {withNavigation} from 'react-navigation';

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
      onEndThreshold={0}
      contentContainerStyle={{paddingBottom: 45}}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
});

export default withNavigation(ResultList);
