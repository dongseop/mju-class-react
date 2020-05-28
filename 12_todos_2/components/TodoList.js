import React from "react";
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'; 

const TouchableHighlight = styled.TouchableHighlight``;
const ItemView = styled.View`
  padding: 20px;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  flex-flow: row;
  align-items: center;
`;

const Text = styled.Text`
  margin-left: 10px;
  color: ${props => (props.done ? "#aaa" : "#000")};
  font-weight: ${props => (props.done ? "200" : "bold")};
`;

function Item({ item, onToggle}) {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#EFF7F6"
      onPress={() => {
        onToggle(item.id);
      }}>
      <ItemView>
        {item.done && <Ionicons name="ios-checkmark-circle-outline" size={24} color="#aaa" />}
        {!item.done && <Ionicons name="ios-radio-button-off" size={24} color="black" />}
        <Text done={item.done}>{item.title}</Text>
      </ItemView>
    </TouchableHighlight>
  )
}

const FlatList = styled.FlatList`
  background-color: #fff;
  width: 100%;
`;

export default ({data, onToggle}) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Item item={item} onToggle={onToggle} />}
      keyExtractor={item => item.id}
    />
  )
}