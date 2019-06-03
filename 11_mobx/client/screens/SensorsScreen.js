import React, { Component } from 'react';
import {
  FlatList,
  TouchableOpacity, 
  Platform,
  View,
  Text
} from 'react-native';
import { ListItem, Tile } from 'react-native-elements';
import { observer, inject } from 'mobx-react';
import apiService from '../services/ApiService';

const SensorListItem = observer(({ sensor, onPress }) => {
  return (
    <TouchableOpacity onPress={ () => {
      onPress(sensor.name);
    }}>
      <ListItem
        leftAvatar={{title: `${sensor.temp}`, overlayContainerStyle:{ backgroundColor: 'green' }}}
        title={sensor.name}
        subtitle={`temp: ${sensor.temp} / hum: ${sensor.hum} / co2: ${sensor.co2}`}
        chevron={true}
        subtitleStyle={{ color: '#aaa' }}
      />
    </TouchableOpacity>
  );
});

@inject('store')
@observer
class SensorsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const sensorGroup = navigation.getParam('sensorGroup', {});
    return {
      title: sensorGroup.name || 'Sensors'
    };
  };

  constructor(props) {
    super(props);
    this.store = this.props.store.sensors;
    this.sensorGroup = this.props.navigation.getParam('sensorGroup', null);
    this.state = {
      refreshing: false,
      page: 0,
      totalPage: 1,
      list: [],
      loading: false
    };
  }
  
  componentDidMount() {
    this.setState({ refreshing: true }, () => {
      //This code will showing the refresh indicator
      if (Platform.OS === 'ios')
        this.listRef && this.listRef.scrollToOffset({ offset: -65, animated: true });
    });
    this.fetch();
  }

  async fetch(page) {
    page = page || (this.state.page + 1);
    if (this.state.refreshing || page > this.state.totalPage) {
      return;
    }
    let list = this.state.list;
    if (page == 1) {
      list = [];
    }
    try {
      const resp = await apiService.getSensors(this.sensorGroup && this.sensorGroup.id, { params: { page } });
      const newIds = this.store.put(resp.data);
      this.setState({
        refreshing: false,
        page: parseInt(resp.headers['x-page'], 10),
        list: list.concat(newIds),
        totalPage: parseInt(resp.headers['x-total-page'], 10)
      });
    } catch(e) {
      console.log(e.status || e);
    }
  }
  renderSensorGroup() {
    const sensorGroup = this.sensorGroup;
    if (!sensorGroup) {
      return;
    }
    return (
      <Tile
        imageSrc={{ uri: sensorGroup.img }}
        title={sensorGroup.name}
        featured
        caption={sensorGroup.img}
      />
      
    );
  }

  renderFooter() {
    return this.state.refreshing ? <View><Text>Loading...</Text></View> : null;
  }

  render() {
    return (
      <View style={{flex:1, margin: 0}}>
        {this.renderSensorGroup()}
        <FlatList
          ref={ref => this.listRef = ref}
          data={this.state.list}
          keyExtractor={(item) => `${item}`}
          renderItem={({ item }) => { return (
            <SensorListItem 
              sensor={this.store.getItem(item)} 
              onPress={(title) =>
                this.props.navigation.push('Detail', {id: item, title})
              }
            />
          ); }}
          onRefresh={() => {this.fetch(1); }}
          renderFooter={this.renderFooter.bind(this)}
          refreshing={this.state.refreshing}
          onEndReached={() => { this.fetch(); }}
          onEndReachedThreshold={1}
        />
      </View>
    );
  }

}

export default SensorsScreen;
