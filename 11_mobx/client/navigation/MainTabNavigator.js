import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import UsersScreen from '../screens/UsersScreen';
import SensorGroupsScreen from '../screens/SensorGroupsScreen';
import SensorsScreen from '../screens/SensorsScreen';
import SensorScreen from '../screens/SensorScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const UsersStack = createStackNavigator({
  Users: UsersScreen,
  SensorGroups: SensorGroupsScreen,
  Sensors: SensorsScreen,
  Detail: SensorScreen
});

UsersStack.navigationOptions = {
  tabBarLabel: 'Users',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-person' : 'md-people'}
    />
  ),
};

const SensorsStack = createStackNavigator({
  Sensors: SensorsScreen,
  Detail: SensorScreen,
  SensorGroups: SensorGroupsScreen,
});

SensorsStack.navigationOptions = {
  tabBarLabel: 'Sensors',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-wifi' : 'md-wifi'}
    />
  ),
};



const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  UsersStack,
  SensorsStack,
  LinksStack,
  SettingsStack,
});
