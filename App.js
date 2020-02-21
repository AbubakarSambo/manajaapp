/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AsyncStorage from '@react-native-community/async-storage';

import {colors} from './src/theme';
import {Signup} from './src/screens/signup';
import {Login} from './src/screens/login';
import {Home} from './src/screens/home';
import {Settings} from './src/screens/settings';
import {Summary} from './src/screens/summary';
// import { Saved } from './src/screens/saved/saved';
// import { Profile } from './src/screens/profile/profile';
// import { Event } from './src/screens/event/event';

Icon.loadFont();
const AuthStack = createStackNavigator(
  {
    Signup: Signup,
    Login: Login,
  },
  {
    initialRouteName: 'Signup',
  },
);
const AppStack = createBottomTabNavigator(
  {
    Home: Home,
    Settings: Settings,
    Summary: Summary,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Settings') {
          iconName = 'wrench';
        } else if (routeName === 'Summary') {
          iconName = 'user';
        }
        return <Icon color={colors.primary} size={20} name={iconName} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: 'gray',
    },
  },
);

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: AsyncStorage.getItem('token') ? 'App' : 'Auth',
    // initialRouteName: 'Auth',
  },
);

export default createAppContainer(SwitchNavigator);
