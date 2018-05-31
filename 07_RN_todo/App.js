import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  AsyncStorage
} from "react-native";
import { Constants } from "expo";
import Swipeout from "react-native-swipeout";
import Header from './components/header';
import TaskInput from './components/task_input';
import ListItem from './components/list_item';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      todos: [
      ] 
    };
    this.onItemToggle = this.onItemToggle.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    AsyncStorage.getItem("@MyTodo:todos").then(todos => {
      if (todos) {
        console.log(todos);
        this.setState({todos: JSON.parse(todos)});
      }
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Save");
    AsyncStorage.setItem("@MyTodo:todos", JSON.stringify(this.state.todos));
  }
  onItemToggle(id) {
    const todo = this.state.todos[id];
    todo.done = !todo.done;
    this.setState({
      todos: [...this.state.todos.slice(0, id), 
        todo,
        ... this.state.todos.slice(id + 1)
      ]
    });   
  }
  deleteItem(id) {
    this.setState({
      todos: [...this.state.todos.slice(0, id),
      ... this.state.todos.slice(id + 1)
      ]
    });   
  }
  addTask(title) {
    if (!title) return; 
    const lastElement = this.state.todos[this.state.todos.length - 1];
    const lastKey = (lastElement) ? parseInt(lastElement.key, 10) : 0;
    this.setState({
      todos: [
        ...this.state.todos,
        {
          key: (lastKey + 1).toString(),
          title: title,
          done: false
        }
      ],
    }); 
  }
  renderItem(item) {
    const swipeSettings = {
      right: [
        { onPress: () => this.deleteItem(item.index), text: 'Delete', type: 'delete' }
      ], 
    };
    return <Swipeout {...swipeSettings}><ListItem 
        key={item.index} 
        id={item.index} 
        item={item.item} 
        onToggle={this.onItemToggle} /></Swipeout>;
  }
  render() {
    const numDone = this.state.todos.filter(item => item.done).length;
    const numUndone = this.state.todos.length - numDone;
    return <SafeAreaView style={styles.container}>
        <Header title="Todo App" />
        <View style={styles.status}>
          <View style={[styles.statusItem, { backgroundColor: 'deepskyblue' }]}>
            <Text style={styles.statusText}>Done: {numDone}</Text>
          </View>
          <View style={[styles.statusItem, {backgroundColor: 'deeppink'}]}>
            <Text style={styles.statusText}>Remain: {numUndone}</Text>
          </View>
        </View>
        <FlatList data={this.state.todos} renderItem={this.renderItem} />
        <TaskInput onSubmit={this.addTask}/>
    </SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff" 
  },
  status: {
    flexDirection: "row",
    backgroundColor: "#888",
    justifyContent: "space-around"
  },
  statusItem: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold"
  },
});
