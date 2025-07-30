import { action, makeObservable, observable, runInAction } from 'mobx';

import { API } from '../api';
import {
  UnifiedWeatherData,
  unifyWeatherByLocation
} from '../utils/unifyWeatherData';

export type Location = {
  lat?: number;
  long?: number;
};

export class WeatherStore {
  weather: UnifiedWeatherData[] | [] = [];
  locationLoading: boolean = false;
  cityLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      turnOnLoading: action,
      loadWeatherByLongLat: action,
      loadWeatherByCity: action,
      removeCity: action,
      cleanError: action,
      cityLoading: observable,
      locationLoading: observable,
      weather: observable,
      error: observable,
    });
  }

  turnOnLoading = () => {
    this.locationLoading = true;
  };

  loadWeatherByLongLat = async ({lat, long}: Location) => {
    this.locationLoading = true;
    const response = await API.loadWeatherByLongLat({lat, long});

    const unifiedData: UnifiedWeatherData = unifyWeatherByLocation(
      response?.data!,
    );

    runInAction(() => {
      this.weather = [unifiedData];
      this.locationLoading = false;
    });
  };

  loadWeatherByCity = async ({city}: {city: string}) => {
    this.cityLoading = true;
    const cityResponse = await API.loadWeatherByCity({city});
    const response = await API.loadWeatherByLongLat({lat: cityResponse?.data?.coord.lat, long: cityResponse?.data?.coord.lon});

    console.log(response, cityResponse, 'response.data');

    if (!response?.data) {
      runInAction(() => {
        this.error = 'Failed to load weather data';
        this.cityLoading = false;
      });
      return;
    }

    const unifiedData = unifyWeatherByLocation(response?.data!);

    const filteredWeather = this.weather.filter(
      (item: UnifiedWeatherData) => item.city !== unifiedData.city,
    );

    runInAction(() => {
      this.weather = [...filteredWeather, unifiedData];
      this.cityLoading = false;
    });
  };

  removeCity = ({city}: {city: string}) => {
    const filteredWeather = this.weather.filter(
      (item: UnifiedWeatherData) => item.city !== city,
    );

    runInAction(() => {
      this.weather = [...filteredWeather];
    });
  };
  cleanError = () => {
    runInAction(() => {
      this.error = null;
    });
  };
}

export default new WeatherStore();
