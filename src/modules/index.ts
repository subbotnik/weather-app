import { PermissionsStore } from './permissionsStore';
import { WeatherStore } from './weatherStore';

export class RootStore {
  permissionsStore: PermissionsStore;
  weatherStore: WeatherStore;

  constructor() {
    this.permissionsStore = new PermissionsStore();
    this.weatherStore = new WeatherStore();
  }
}
