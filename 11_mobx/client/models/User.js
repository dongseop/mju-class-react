import { extendObservable, action } from 'mobx';
import apiService from '../services/ApiService';

export class User {
  constructor(store, data) {
    this.store = store;
    extendObservable(this, data);
  }

  @action update(data) {
    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
  }

  fetch() {
    this.rootStore.uiState.addPendingRequest();
    apiService.getUser(this.id).then(resp => {
      this.rootStore.uiState.removePendingRequest();
      this.update(resp.data);
    });
  }
}
