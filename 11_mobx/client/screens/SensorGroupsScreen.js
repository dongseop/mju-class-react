import React, { Component } from 'react';
import { FlatList, TouchableOpacity, Platform } from 'react-native';
import { observer, inject } from 'mobx-react';
import { ListItem } from 'react-native-elements';
import apiService from '../services/ApiService';


const SensorGroupListItem = observer(({ sensorGroup, onPress }) => {
  return (
    <TouchableOpacity onPress={() => {
      onPress(sensorGroup);
    }}>
      <ListItem
        leftAvatar={{ rounded: false, source: { uri: sensorGroup.img } }}
        title={sensorGroup.name}
        subtitle={sensorGroup.location}
        chevron={true}
        subtitleStyle={{ color: '#aaa' }}
      />
    </TouchableOpacity>
  );
});

@inject('store')
@observer
class SensorGroupsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const user = navigation.getParam('user', undefined);
    if (user) {
      return {
        title: user.name
      };
    }
    return {
      title: 'Sensor Groups'
    };
  };

  constructor(props) {
    super(props);
    this.store = this.props.store.sensorGroups;
    this.user = this.props.navigation.getParam('user', {});
    this.state = {
      refreshing: false,
      list: []
    };
  }

  componentDidMount() {
    this.setState({ refreshing: true }, async () => {
      //This code will showing the refresh indicator
      if (Platform.OS === 'ios')
        this.listRef && this.listRef.scrollToOffset({ offset: -65, animated: true });
    });

    this.fetch();
  }

  async fetch() {
    try {
      const resp = await apiService.getSensorGroups(this.user.id);
      const ids = this.store.put(resp.data);
      this.setState({
        refreshing: false,
        list: ids,
      });
    } catch(e) {
      console.log(e.status || e);
    }
  }
 
  render() {
    return (
      <FlatList
        ref={ref => this.listRef = ref}
        data={this.state.list}
        keyExtractor={(item) => `${item}`}
        renderItem={({ item }) => {
          return (
            <SensorGroupListItem
              sensorGroup={this.store.getItem(item)}
              onPress={(sensorGroup) =>
                this.props.navigation.push('Sensors', { id: item, sensorGroup })
              }
            />
          );
        }}
        onRefresh={() => { this.fetch(1); }}
        refreshing={this.state.refreshing}
      />
    );
  }

}

export default SensorGroupsScreen;