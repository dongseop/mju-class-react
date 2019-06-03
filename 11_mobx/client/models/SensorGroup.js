import { extendObservable, observable, action } from 'mobx';
import apiService from '../services/ApiService';

export class SensorGroup {
  @observable user;

  constructor(store, data) {
    this.store = store;
    this.updateAssociations(data);
    extendObservable(this, data);
  }

  @action update(data) {
    this.name = data.name;
    this.img = data.img;
    this.location = data.location;
    this.updateAssociations(data);
  }

  @action updateAssociations(data) {
    this.user = this.store.users.findOrCreate(data.user);
    delete data.user;
  }

  fetch() {
    this.rootStore.uiState.addPendingRequest();
    apiService.getSensorGroup(this.id).then(resp => {
      this.rootStore.uiState.removePendingRequest();
      this.update(resp.data);
    });
  }
}
