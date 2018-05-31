import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from "react-native";
export default class TaskInput extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = props.onSubmit;
    this.state = {title: ""};
    this.submitTask = this.submitTask.bind(this);
    console.log(this.state);
  }
  submitTask() {
    console.log(this.state);
    this.onSubmit(this.state.title.trim());
    this.setState({title: ""});
    this.refs.txtInput.focus();
  }
  render() {
    return (<KeyboardAvoidingView
      style={{ backgroundColor: '#eee' }}
      behavior='padding'
      keyboardVerticalOffset={0}>
      <TextInput style={styles.textStyle}
        autoFocus={true}
        placeholder="Type here!"
        ref="txtInput"
        value={this.state.title}
        onChangeText={(text) => this.setState({title: text})}
        onSubmitEditing={this.submitTask}
      />
    </KeyboardAvoidingView>);
  }
}

const styles = StyleSheet.create({
  textStyle: {
    backgroundColor: "#fff",
    height: 40,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10
  }
});
