import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import {
  Ionicons,
} from '@expo/vector-icons';

import HomeScreen from './screens/home';
import AlarmScreen from './screens/alarm';
import SpaceScreen from './screens/space';
import SearchScreen from './screens/search';
import DetailsScreen from './screens/details';
import SettingsScreen from './screens/settings';

import AppConstant from './commons/constants';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: AppConstant.tintColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});
const SpaceStack = createStackNavigator({
  Space: SpaceScreen,
  Details: DetailsScreen,
}, {
    initialRouteName: 'Space',
    navigationOptions: {
      headerStyle: {
        backgroundColor: AppConstant.tintColor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  });
const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Details: DetailsScreen,
}, {
    initialRouteName: 'Search',
    navigationOptions: {
      headerStyle: {
        backgroundColor: AppConstant.tintColor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  });
const AlarmStack = createStackNavigator({
  Alarm: AlarmScreen,
  Details: DetailsScreen,
}, {
    initialRouteName: 'Alarm',
    navigationOptions: {
      headerStyle: {
        backgroundColor: AppConstant.tintColor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  });

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Details: DetailsScreen,
}, {
  initialRouteName: 'Settings',
  navigationOptions: {
    headerStyle: {
      backgroundColor: AppConstant.tintColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});

const RootStack = createBottomTabNavigator(
  {
    Favorites: HomeStack,
    Search: SearchStack,
    Alarm: AlarmStack,
    Space: SpaceStack,
    Settings: SettingsStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Favorites') {
          iconName = `ios-star${focused ? '' : '-outline'}`;
        } else if (routeName === 'Space') {
          iconName = `ios-cube${focused ? '' : '-outline'}`;
        } else if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        } else if (routeName === 'Alarm') {
          iconName = `ios-notifications${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-settings${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      // tabBarLabel: ({ focused, tintColor }) => {
      //   const names = {
      //     Home: '즐겨찾기',
      //     Space: '스페이스',
          
      //   }
      //   return <Text>{names[navigation.state.routeName]}</Text>;
      // },
    }),
    tabBarOptions: {
      activeTintColor: AppConstant.tintColor,
      inactiveTintColor: 'gray',
    },
  }
);
const AppStack = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <AppStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
