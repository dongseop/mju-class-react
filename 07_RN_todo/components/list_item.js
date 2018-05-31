import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function(props) {
  let { id, item, onToggle } = props;
  return (
    <View style={styles.viewStyle}>
      <Switch style={{marginRight:10}}
        onValueChange={(value) => onToggle(id)} 
        value={item.done}   
        />
      <Text style={item.done? styles.done : styles.undone}>{item.title}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    borderBottomColor: "#eee"
  },
  undone: {
    fontWeight: "bold"
  },
  done: {
    color: "#aaa",
    textDecorationLine: 'line-through'
  }
});
