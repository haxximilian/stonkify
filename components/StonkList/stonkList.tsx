import React, { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { AvailableStonks } from '../../availableStonks';

export interface Stonk {
  symbol: string;
  name: string;
}

export const Item: React.FC<any> = ({ stonk, onSelectedItem }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onSelectedItem(stonk)}>
      <Icon
        name='show-chart'
        style={{ marginRight: 10, alignSelf: 'flex-start' }}
        size={25}
        color='black'
      ></Icon>
      <Text>{stonk.name}</Text>
    </TouchableOpacity>
  );
};
export const StonkList: React.FC<any> = ({ backFunction, onSearch }) => {
  const [stonksList, setStonksList] = useState([...AvailableStonks]);

  function filterStonks(search: string) {
    setStonksList(
      AvailableStonks.filter((stonk) =>
        stonk.name.toLocaleUpperCase().includes(search.toLocaleUpperCase())
      )
    );
  }

  return (
    <View style={styles.container}>
      <Icon
        onPress={backFunction}
        name='arrow-back'
        style={{ marginLeft: 15, marginTop: 7, alignSelf: 'flex-start' }}
        size={25}
        color='black'
      />
      <TextInput
        placeholder='Search...'
        style={{
          alignSelf: 'center',
          borderRadius: 100,
          marginBottom: 30,
          width: '80%',
          padding: 10,
          backgroundColor: '#ffffff',
          borderColor: '#000000',
          borderWidth: 1,
        }}
        onChangeText={(text) => filterStonks(text)}
        maxLength={10}
        defaultValue={''}
      />
      <FlatList
        data={stonksList}
        renderItem={({ item }) => (
          <Item
            key={item.symbol}
            stonk={item}
            onSelectedItem={(stonk: any) => onSearch(stonk)}
          />
        )}
        keyExtractor={(item) => item.symbol}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    paddingLeft: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
});
