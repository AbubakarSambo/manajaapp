/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TextInput,
} from 'react-native';
import apiEndpoint from './config/api';
import axios from 'axios';

const App = () => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const submit = e => {
    console.log(name, amount, category);
    axios
      .post(`${apiEndpoint}/payments`, {
        name,
        amount,
        category,
      })
      .then(
        response => {
          setError('');
          setName('');
          setAmount('');
          setCategory('');
          console.log(response);
        },
        error => {
          setError(error);
        },
      );
  };
  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            onChangeText={e => setName(e)}
            name="name"
            placeholder="Name"
            value={name}
          />
          <TextInput
            style={styles.input}
            onChangeText={e => setAmount(e)}
            name="amount"
            placeholder="Amount"
            value={amount}
          />
          <TextInput
            style={styles.input}
            onChangeText={e => setCategory(e)}
            name="category"
            placeholder="Category"
            value={category}
          />
          <Button title="Press me" color="#f194ff" onPress={submit} />
          <Text>{error && <Text>error</Text>}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 200,
    display: 'flex',
    alignItems: 'center',
    height: 400,
  },
  input: {
    marginBottom: 20,
  },
});

export default App;
