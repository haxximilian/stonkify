import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PriceInput } from './components/PriceInput/priceInput';
import { StonkList, Stonk, Item } from './components/StonkList/stonkList';
import axios from 'axios';

enum ViewState {
  ConvertView,
  ListView,
}

export const RootComponent: React.FC<any> = () => {
  const [viewState, setViewState] = useState(ViewState.ConvertView);
  const [stonk, setStonk] = useState({
    name: 'Resurs Holding AB',
    symbol: '0RFP.ILN',
  });

  function searchForStonks(stonk: Stonk) {
    setStonk(stonk);
    setViewState(ViewState.ConvertView);
  }

  function showList() {
    setViewState(ViewState.ListView);
  }

  function goToPriceInput() {
    setViewState(ViewState.ConvertView);
  }

  return (
    <View style={styles.container}>
      {viewState === ViewState.ConvertView ? (
        <PriceInput onShowList={showList} stonk={stonk}></PriceInput>
      ) : (
        <StonkList
          onSearch={searchForStonks}
          backFunction={goToPriceInput}
        ></StonkList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
