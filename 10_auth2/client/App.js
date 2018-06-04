import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

import {Theme} from './config';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
const composeStoreWithMiddleware = applyMiddleware(thunk)(createStore);

import NavigationService from './navigation_service';
import AppNavigator from './navigator';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={composeStoreWithMiddleware(reducers)}>
        <AppNavigator ref={navigationRef => {
          NavigationService.setTopLevelNavigator(navigationRef);
        }} />
      </Provider>
    );
  }
}
