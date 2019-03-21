import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList,
  Image,
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
  renderUser({item}) {
    console.log(item);
    return (
      <View style={styles.card} key={item.email}>
        <Image style={{ width: 60, height: 60, borderRadius: 30 }}
          source={{ uri: item.picture.medium }} />; 
        <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.users}>
          <FlatList
            refreshing={false}
            onRefresh={() => this.props.fetchUsers()}
            data={this.props.users}
            renderItem={this.renderUser.bind(this)}
          />
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
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: '#EEE'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15
  }
});
