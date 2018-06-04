import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'MJ-stargram',
      headerRight: (
        <Button
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.navigate('Auth');
          }} 
          title="Signout"
          color="red"
        />
      ),
    };
  };
  componentDidMount() {
    this.props.fetchUsers();
  }
  renderUsers() {
    if (this.props.users) {
      return this.props.users.map(user => {
        return (
          <View style={styles.card} key={user.id}>
            <Text>{user.username}</Text>
          </View>
        );
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.users}>
          {this.renderUsers()}
        </View>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

function mapStateToProps(state) {
  return { users: state.users };
}
export default connect(mapStateToProps, { fetchUsers })(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  users: {
    flex: 1,
    alignSelf: "stretch"
  },
  card: {
    alignSelf: "stretch",
    padding: 30,
    borderBottomWidth: 5,
    borderBottomColor: '#EEE'
  }
});
