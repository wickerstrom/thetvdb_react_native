import React from 'react';
import {TouchableOpacity, View, FlatList, StyleSheet, Text} from 'react-native';
import {withNavigation} from 'react-navigation';

export interface IProps {
  searchResult: Array<JSON>;
}

const ResultList: React.FC<IProps> = (props: any) => {
  return (
    <FlatList
      data={props.searchResult}
      renderItem={({item}: {item: any}) => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Details', {
              id: item.id,
            })
          }>
          <View style={styles.item}>
            <Text>{item.seriesName}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item: any) => item.id.toString()}
      contentContainerStyle={{paddingBottom: 45}}
    />
  );
};

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
