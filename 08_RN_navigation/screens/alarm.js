import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "center", justifyContent: "center"
  },
  hb: {
    backgroundColor: 'transparent',
    color: '#000'
  }
});

export default class AlarmScreen extends React.Component {
  static navigationOptions = {
    title: 'Alarm',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Alarm Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}
