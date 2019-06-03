import { User, Sensor, SensorGroup } from '../models';
import { ObjectCache } from './ObjectCache';
export class RootStore {
  constructor() {
    this.users = new ObjectCache(this, User);
    this.sensors = new ObjectCache(this, Sensor);
    this.sensorGroups = new ObjectCache(this, SensorGroup);
  }
}

