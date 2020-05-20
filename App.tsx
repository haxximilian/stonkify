import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PriceInput } from './components/PriceInput/priceInput';
import { RootComponent } from './index';

export default function App() {
  return (
    <View style={styles.container}>
      <RootComponent></RootComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
