import React, { Component, useState, Fragment } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { AmericanStocks } from '../../availableStonks';

const TextCurrency = 'SEK';
const Header = 'Enter value to be converted';

export const PriceInput: React.FC<any> = ({ onShowList, stonk }) => {
  const [text, setText] = useState('0');
  const [amountOfStonks, setAmountOfStonks] = useState(0);
  const [selectedStonk, setSelectedStonk] = useState(stonk);
  const [showAmountOfStonks, setShowAmountOfStonks] = useState(false);

  //showAmountOfStonks
  const [inputStyle, setInputStyle] = useState({
    fontSize: 100,
    paddingRight: 10,
  });

  function pressedButton() {
    axios
      .get(
        `http://10.2.10.80:8080/calculateStock?value=${text}&symbol=${selectedStonk.symbol}`
      )
      .then(function (response) {
        setAmountOfStonks(response.data.value);
        setShowAmountOfStonks(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function onTextChange(newText: string) {
    const divider = newText.length < text.length ? 0.9 : 1.2;
    setText(newText);
    setShowAmountOfStonks(false);
    setInputStyle({
      fontSize: newText.length > 3 ? inputStyle.fontSize / divider : 100,
      paddingRight: 10,
    });
  }

  return (
    <Fragment>
      <KeyboardAvoidingView
        behavior='padding'
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80%',
          borderColor: '#3B3C40',
        }}
      >
        <Text
          style={{
            marginTop: 50,
          }}
        >
          {Header}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 2,
            width: '80%',
            borderColor: '#3B3C40',
            justifyContent: 'center',
          }}
        >
          <TextInput
            keyboardType='numeric'
            maxLength={10}
            style={inputStyle}
            onChangeText={(text) => onTextChange(text)}
            defaultValue={text}
          />
          <Text style={{ alignSelf: 'center' }}>{TextCurrency}</Text>
        </View>

        {showAmountOfStonks && (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 25,
              marginBottom: 30,
              width: '100%',
              padding: 5,
              backgroundColor: '#ffffff',
              shadowColor: '#000000',
              shadowOpacity: 0.1,
              shadowRadius: 16,
              shadowOffset: {
                height: 0,
                width: 6,
              },
            }}
          >
            <Text
              style={{ alignSelf: 'center', fontSize: 20 }}
            >{`${text} ${TextCurrency} =`}</Text>
            <Text style={{ padding: 10, fontSize: 100 }}>{amountOfStonks}</Text>
            <Text
              style={{ alignSelf: 'center', fontSize: 20, fontWeight: '600' }}
            >
              {selectedStonk.name.toLocaleUpperCase()}
            </Text>
          </View>
        )}
        <View
          style={{
            width: '100%',
          }}
        >
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderColor: '#3B3C40',
              borderWidth: 1,
              borderRadius: 100,
              width: '100%',
              padding: 2,
              backgroundColor: '#ffffff',
              marginBottom: 10,
            }}
          >
            <Icon
              name='menu'
              style={{ marginLeft: 15, marginTop: 7, alignSelf: 'flex-end' }}
              size={25}
              color='black'
            />

            <Button
              onPress={onShowList}
              title='SELECT STONK'
              color='black'
              accessibilityLabel='Learn more about this purple button'
            />
          </View>
          <View
            style={{
              borderRadius: 100,
              marginBottom: 30,
              width: '100%',
              padding: 5,
              backgroundColor: '#ffffff',
              shadowColor: '#000000',
              shadowOpacity: 0.1,
              shadowRadius: 16,
              shadowOffset: {
                height: 0,
                width: 6,
              },
            }}
          >
            <Button
              onPress={pressedButton}
              title={`AMOUNT OF ${selectedStonk.name.toLocaleUpperCase()}`}
              color='black'
              accessibilityLabel='Learn more about this purple button'
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Fragment>
  );
};
