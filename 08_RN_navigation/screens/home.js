import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';

import SpaceCard from '../containers/space_card';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.goDetail = this.goDetail.bind(this);
  }
  static navigationOptions = {
    title: 'ContextMatter',
  };
  goDetail() {
    this.props.navigation.navigate('Details')
  }
  render() {
    return (
      <View style={styles.container}>
        <SpaceCard title="정양산업 감천물류센터" sub="chungyangmobility" color="#5cd664" onPress={this.goDetail}/>
        <SpaceCard title="정양산업 감천물류센터" sub="chungyangmobility" color="#db3327" onPress={this.goDetail} />
        <SpaceCard title="정양산업 감천물류센터" sub="chungyangmobility" color="#ffbf00" onPress={this.goDetail} />
        <SpaceCard title="정양산업 감천물류센터" sub="chungyangmobility" color="#bababa" onPress={this.goDetail} />
        <SpaceCard title="정양산업 감천물류센터" sub="chungyangmobility" color="#5cd664" onPress={this.goDetail} />
        <SpaceCard title="정양산업 감천물류센터" sub="chungyangmobility" color="#5cd664" onPress={this.goDetail} />
        <SpaceCard title="정양산업 감천물류센터" sub="chungyangmobility" color="#db3327" onPress={this.goDetail} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  hb: {
    backgroundColor: 'transparent',
    color: '#000'
  }
});