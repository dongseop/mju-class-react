import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import apiService from '../services/ApiService';
import SensorGraph from '../components/SensorGraph';
import SensorValue from '../components/SensorValue';
import UserItem from '../components/UserItem';

@inject('store')
@observer
class SensorScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', 'NO-TITLE');
    return {
      title,
    };
  };

  constructor(props) {
    super(props);
    this.store = this.props.store.sensors;
    this.id = this.props.navigation.getParam('id', 'NO-ID');
    this.sensor = this.store.getItem(this.id);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    try {
      const resp = await Promise.all([
        apiService.getSensor(this.id),
        apiService.getValues(this.id)
      ]);
      runInAction(() => {
        this.sensor.update(resp[0].data);
        this.sensor.values = resp[1].data;
      });
      this.setState({ refreshing: false });
    } catch (e) {
      console.log(e.status || e);
    }
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.fetch();
            }}
          />
        }
      >
        <SensorGraph values={this.sensor.values.slice()} />
        <SensorValue bg={this.sensor.bg} type={'Temperature'} value={this.sensor.temp} />
        <SensorValue bg={this.sensor.bg} type={'Humidity'} value={this.sensor.hum} />
        <SensorValue bg={this.sensor.bg} type={'Co2'} value={this.sensor.co2} />
        <UserItem user={this.sensor.user} />
      </ScrollView>
    );
  }
}

export default SensorScreen;