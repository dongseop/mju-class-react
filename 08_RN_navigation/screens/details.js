import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const id = navigation.getParam('id', '0');
    return {
      title: `정양산업 물류센터`,
    }
  };
  constructor(props) {
    super(props);
    this.id = props.navigation.getParam('id', '0');
  }
  renderSensorItem() {

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sensors}>
          <Text>ABCD</Text>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "center", justifyContent: "center"
  }
});