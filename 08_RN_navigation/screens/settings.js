import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }
  constructor(props) {
    super(props);
    this.id = props.navigation.getParam('id', '0');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "center", justifyContent: "center"
  }
});