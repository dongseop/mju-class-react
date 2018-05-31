import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import {
  Ionicons,
} from '@expo/vector-icons';

export default class SpaceCard extends React.Component {


  render() {
    const {key, color, title, sub, onPress} = this.props;
    return (
      <TouchableHighlight onPress={onPress}>
        <View key={key} style={styles.card}>
          <Ionicons name={'ios-disc'} size={30} color={color} />
          <View style={styles.title}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.subText}>{sub}</Text>
          </View>
          <View style={styles.right}>
            <Ionicons name={'ios-chatboxes-outline'} size={25} />
          </View>
            
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: '#eee',
    justifyContent: 'center'
  },
  title: {
    flex: 1, 
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 1,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: '#aaa'
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})