import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


export default class HeartScreen extends React.Component {
  static navigationOptions = {
    title: 'Heart',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Heart Screen</Text>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
