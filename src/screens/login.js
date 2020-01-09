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
import AsyncStorage from '@react-native-community/async-storage';

import {Button, SocialButton, TextLink} from '../components';
import apiEndpoint from '../../config/api';

import {colors, typography, dimensions} from '../theme';

export const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const goToSignup = () => {
    navigation.navigate('Signup');
  };
  const doLogIn = () => {
    let data = {
      phone,
      password,
    };
    if (phone && password) {
      axios({
        method: 'post',
        data,
        url: `${apiEndpoint}/user/login`,
        headers: {'Content-Type': 'application/json; charset=utf-8'},
      }).then(
        response => {
          const {data} = response;
          const {token, user} = data;
          axios.defaults.headers.common.Authorization = token;
          AsyncStorage.setItem('token', token);
          AsyncStorage.setItem('user', JSON.stringify(user));
          navigation.navigate('Home');
          console.log(response);
        },
        error => {
          console.log(error.response, 'kk');
        },
      );
    } else {
      console.log('error');
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.subContainer}>
          <Text style={styles.textStyle}>Log In</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Phone"
            autoCorrect={false}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Password"
            autoCorrect={false}
          />
          <Button text="Log In" callBack={doLogIn} />
          <TextLink callBack={goToSignup} text="Sign Up" />
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
  socialStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 55,
  },
  textStyle: {
    color: colors.black,
    marginTop: 3,
    marginLeft: 10,
    fontFamily: typography.primary,
    fontSize: 25,
    backgroundColor: colors.primaryText,
  },
  input: {
    height: 50,
    // width: '80%',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    margin: 10,
    fontFamily: typography.primary,
    fontSize: 16,
  },
});
