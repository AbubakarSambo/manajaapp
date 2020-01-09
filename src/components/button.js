import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import { colors, typography, dimensions } from '../theme';

export const Button = ({ text, callBack }) => {
  let android = Platform.OS === 'android';
  return android ? (
    <TouchableNativeFeedback onPress={callBack}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={callBack}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const GroupButton = ({ text, callBack }) => {
  let android = Platform.OS === 'android';
  return android ? (
    <TouchableNativeFeedback onPress={callBack}>
      <View style={styles.groupButton}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity style={styles.groupButton} onPress={callBack}>
      <View>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const IconButton = ({ callBack, name, size, color }) => {
  let android = Platform.OS === 'android';
  return android ? (
    <TouchableNativeFeedback onPress={callBack}>
      <View style={{ padding: 3 }}>
        <Icon color={color} size={size} name={name} />
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity style={{ padding: 3 }} onPress={callBack}>
      <View>
        <Icon color={color} size={size} name={name} />
      </View>
    </TouchableOpacity>
  );
};

export const SocialButton = ({ type, callBack }) => {
  let android = Platform.OS === 'android';
  const buttonType = type === 'facebook';
  return android ? (
    <TouchableNativeFeedback onPress={callBack}>
      <View
        style={
          buttonType ? styles.facebookButton : styles.googleButton
        }
      >
        {buttonType ? (
          <Icon
            color={colors.primaryText}
            size={20}
            name="facebook"
          />
        ) : (
          <Icon color={colors.primaryText} size={20} name="google" />
        )}
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity
      style={buttonType ? styles.facebookButton : styles.googleButton}
      onPress={callBack}
    >
      {buttonType ? (
        <Icon color={colors.primaryText} size={20} name="facebook" />
      ) : (
        <Icon color={colors.primaryText} size={20} name="google" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // width: '80%',
    borderWidth: 1,
    borderColor: colors.black,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: colors.primary,
  },
  groupButton: {
    borderWidth: 1,
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.primaryText,
    marginTop: 3,
    fontFamily: typography.primary,
    fontSize: 15,
  },
  facebookButton: {
    borderWidth: 1,
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
    backgroundColor: colors.facebook,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: colors.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: colors.google,
  },
});
