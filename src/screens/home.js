import React, {useState} from 'react';
import axios from 'axios';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {Button, SocialButton, TextLink} from '../components';
import apiEndpoint from '../../config/api';

import {colors, typography, dimensions} from '../theme';
import AsyncStorage from '@react-native-community/async-storage';

export const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const logout = () => {
    AsyncStorage.setItem('token', '');
    navigation.navigate('Login');
  };
  const submit = () => {
    if (name && amount && category) {
      const userObj = {
        name,
        amount,
        category,
      };
      console.log(userObj);
      axios({
        method: 'post',
        data: userObj,
        url: `${apiEndpoint}/payments`,
        headers: {'Content-Type': 'application/json; charset=utf-8'},
      }).then(
        response => {
          //   navigation.navigate('Login');
          setName('');
          setAmount('');
          setCategory('');
          console.log(response);
        },
        error => {
          console.log(error.response, 'kk');
        },
      );
    } else {
      Alert.alert('Error', 'Missing required fields sonn!');
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
          <TextInput
            value={category}
            onChangeText={setCategory}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Category"
            autoCorrect={false}
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
