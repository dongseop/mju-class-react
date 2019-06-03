import React, { Component } from 'react';
import { 
  FlatList, 
  Platform,
  TouchableOpacity
} from 'react-native';
import { observer, inject } from 'mobx-react';
import apiService from '../services/ApiService';
import UserItem from '../components/UserItem';

const UserListItem = observer(({user, onPress}) => {
  return (
    <TouchableOpacity onPress={() => {
      onPress(user);
    }}>
      <UserItem user={user} chevron={true}/>
    </TouchableOpacity>
  );
});

@inject('store')
@observer
class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  }
  constructor(props) {
    super(props);
    this.store = this.props.store.users;
    this.state = {
      refreshing: false,
      list: []
    };
    apiService.setNavigation(this.props.navigation);
  }
  componentDidMount() {
    this.setState({ refreshing: true }, () => {
      //This code will showing the refresh indicator
      if (Platform.OS === 'ios')
        this.listRef && this.listRef.scrollToOffset({ offset: -65, animated: true });
    });

    this.fetch();
  }
  async fetch() {
    try {
      const resp = await apiService.getUsers();
      const list = this.store.put(resp.data);
      this.setState({
        refreshing: false,
        list
      });
    } catch(e) {
      this.setState({refreshing: false});
    }
  }

  render() {
    return (
      <FlatList 
        data={this.state.list}
        keyExtractor={(item)=> `${item}`}
        renderItem={({item}) => { return (
          <UserListItem 
            user={this.store.getItem(item)}
            onPress={(user)=>
              this.props.navigation.push('SensorGroups', { id: item, user })
            }
          />
        );}}
        onRefresh={() => {this.fetch();}}
        refreshing={this.state.refreshing}
      />
    );
  }
}

export default UsersScreen;
