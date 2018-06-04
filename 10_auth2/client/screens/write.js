import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


export default class WriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Write',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Write Screen</Text>
      </View>
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
