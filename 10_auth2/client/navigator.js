import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import AuthLoadingScreen from './screens/auth_loading';
import HomeScreen from './screens/home';
import HeartScreen from './screens/heart';
import WriteScreen from './screens/write';
import SearchScreen from './screens/search';
import ProfileScreen from './screens/profile';
import OtherScreen from './screens/other';
import SignInScreen from './screens/signin';

import { Theme } from './config';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });
const HomeStack = createStackNavigator({ Home: HomeScreen, Profile: ProfileScreen });
const SearchStack = createStackNavigator({ Search: SearchScreen });
const WriteStack = createStackNavigator({ Write: WriteScreen });
const HeartStack = createStackNavigator({ Heart: HeartScreen });
const ProfileStack = createStackNavigator({ Profile: ProfileScreen });

const RootStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Write: WriteStack,
    Heart: HeartStack,
    Profile: ProfileStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Profile') {
          return <Image style={{ width: 28, height: 28, borderRadius: 14 }}
            source={{ uri: 'https://randomuser.me/api/portraits/women/17.jpg' }} />;
        }
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        } else if (routeName === 'Write') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Heart') {
          iconName = `ios-heart${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Theme.tintColor,
      inactiveTintColor: 'gray',
    },
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default AppNavigator;