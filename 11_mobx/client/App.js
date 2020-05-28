import React, { Component } from 'react';
import { AppLoading } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import { Provider } from 'mobx-react';
import { RootStore } from './services/RootStore';

import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
 import * as Icon from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const rootStore = new RootStore();

class App extends Component {
  state = {
    isLoadingComplete: false,
  };
  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={rootStore}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }
  
  _loadResourcesAsync = async () => {
    console.log("LOAD!!!!!", ...Ionicons);
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;

