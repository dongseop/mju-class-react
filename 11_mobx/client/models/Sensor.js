import { extendObservable, observable, runInAction, action, computed } from 'mobx';
import apiService from '../services/ApiService';

const STATUS2COLOR = {
  hot: '#c90017',
  warm: '#e2b734',
  cool: '#10bc75',
  cold: '#0f9cc6'
};

export class Sensor {
  @observable values = [];
  @observable user;
  @observable sensorGroup;

  constructor(store, data) {
    this.store = store;
    this.updateAssociations(data);
    extendObservable(this, data);
  }

  @action update(data) {
    this.name = data.name;
    this.temp = data.temp;
    this.hum = data.hum;
    this.co2 = data.co2;
    this.updateAssociations(data);
  }

  @action updateAssociations(data) {
    this.user = this.store.users.findOrCreate(data.user);
    this.sensorGroup = this.store.sensorGroups.findOrCreate(data.sensorGroup);
    delete data.user;
    delete data.sensorGroup;
  }

  @computed get status() {
    if (this.temp > 40) {
      return 'hot';
    } else if (this.temp > 28) {
      return 'warm';
    } else if (this.temp > 5) {
      return 'cool';
    } else {
      return 'cold';
    }
  }

  @computed get bg() {
    return STATUS2COLOR[this.status];
  }

  fetchValues() {
    this.rootStore.uiState.addPendingRequest();
    apiService.getSensorValues(this.id).then(resp => {
      this.rootStore.uiState.removePendingRequest();
      runInAction(() => {
        this.values = resp.data;
      });
    }, () => {
      this.rootStore.uiState.removePendingRequest();
    });
  }

  fetch() {
    this.rootStore.uiState.addPendingRequest();
    apiService.getSensor(this.id).then(resp => {
      this.rootStore.uiState.removePendingRequest();
      this.update(resp.data);
    });
  }
}
