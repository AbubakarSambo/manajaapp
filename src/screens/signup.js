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
  Alert,
} from 'react-native';
import {Button, TextLink} from '../components';

import {colors, typography, dimensions} from '../theme';
import apiEndpoint from '../../config/api';

export const Signup = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = () => {
    if (password === confirmPassword) {
      const userObj = {
        firstName,
        lastName,
        phone,
        password,
      };
      console.log(userObj);
      axios({
        method: 'post',
        data: userObj,
        url: `${apiEndpoint}/user`,
        headers: {'Content-Type': 'application/json; charset=utf-8'},
      }).then(
        response => {
          navigation.navigate('Login');
          console.log(response);
        },
        error => {
          console.log(error.response, 'kk');
        },
      );
    } else {
      Alert.alert('Error', 'Passwords should be the same');
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.subContainer}>
          <Text style={styles.textStyle}>Sign Up</Text>

          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
            autoCapitalize="none"
            placeholder="First name"
            autoCorrect={false}
          />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Last name"
            autoCorrect={false}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Phone Number"
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
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Confirm Password"
            autoCorrect={false}
          />

          <Button callBack={signUp} text="Sign up" />
          <TextLink callBack={goToLogin} text="Log In" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 55,
    backgroundColor: colors.primaryText,
    height: '100%',
  },
  subContainer: {
    display: 'flex',
    margin: 'auto',
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
