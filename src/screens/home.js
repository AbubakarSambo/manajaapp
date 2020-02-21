import React, {useState} from 'react';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  Picker,
  View,
  Dimensions,
} from 'react-native';
import {Button, SocialButton, TextLink} from '../components';
import apiEndpoint from '../../config/api';
import {retrieveItem} from '../util';
import {colors, typography, dimensions} from '../theme';
import AsyncStorage from '@react-native-community/async-storage';

export const Home = ({route, navigation}) => {
  const {places, categories} = navigation.state.params || {};
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [place, setPlace] = useState('');
  const logout = () => {
    AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };
  const submit = () => {
    if (name && amount && category) {
      const payObj = {
        name,
        amount,
        category,
        place,
      };
      axios({
        method: 'post',
        data: payObj,
        url: `${apiEndpoint}/payments`,
        headers: {'Content-Type': 'application/json; charset=utf-8'},
      }).then(
        response => {
          //   navigation.navigate('Login');
          setName('');
          setAmount('');
          setCategory('');
        },
        error => {
          console.log(error.response, 'kk');
        },
      );
    } else {
      console.log('Error', 'Missing required fields sonn!');
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.subContainer}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Name"
            autoCorrect={false}
          />
          <TextInput
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Amount"
            autoCorrect={false}
          />
          <RNPickerSelect
            placeholder={{label: 'Categories'}}
            items={
              (categories &&
                categories.map((item, index) => {
                  return {label: item, value: item, key: item};
                })) ||
              []
            }
            onValueChange={itemValue => setCategory(itemValue)}
          />
          <RNPickerSelect
            placeholder={{label: 'Places'}}
            items={
              (places &&
                places.map((item, index) => {
                  return {label: item, value: item, key: item};
                })) ||
              []
            }
            onValueChange={itemValue => setPlace(itemValue)}
          />
          <Button text="ADD" callBack={submit} />
          <Button text="Logout" callBack={logout} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: '40%',
    backgroundColor: colors.primaryText,
    height: '100%',
  },
  subContainer: {
    display: 'flex',
  },
});
