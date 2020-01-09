import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, dimensions } from '../theme';

export const TextLink = ({ text, callBack }) => {
  console.log(callBack);
  let android = Platform.OS === 'android';
  return android ? (
    <TouchableNativeFeedback onPress={callBack}>
      <View style={styles.style} onPress={callBack}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={callBack}>
      <View style={styles.style} onPress={callBack}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const CardTitle = ({ text }) => {
  return <Text style={styles.cardTitle}>{text}</Text>;
};
export const FancyText = ({ text }) => {
  return <Text style={styles.fancyText}>{text}</Text>;
};

const styles = StyleSheet.create({
  style: {
    marginLeft: 10,
  },
  textStyle: {
    color: colors.facebook,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  fancyText: {
    color: colors.primary,
  },
});
