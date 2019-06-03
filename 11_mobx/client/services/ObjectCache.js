import { observable, action } from 'mobx';
import _ from 'lodash';

export class ObjectCache {
  constructor(rootStore, Model) {
    this.rootStore = rootStore;
    this.Model = Model;
  }

  findOrCreate(data) {
    let item = this.getItem(data.id);
    if (item) {
      item.update(data);
    } else {
      item = new this.Model(this.rootStore, data);
      this.list[item.id] = item;
    }
    return item;
  }

  getItem(id) {
    return this.list[id];
  }
  @observable list = {};

  @action put(data) {
    const ids = [];
    _.each(data, item => {
      this.findOrCreate(item);
      ids.push(item.id);
    });
    return ids;
  }
}



