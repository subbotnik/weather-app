import { httpClient } from '../httpClient';
import { Weather } from './loadWeatherByLongLat';

type Params = {
  city: string;
};
type CoordType = {
  lon: number;
  lat: number;
};

export type CityWeatherResponse = {
  coord: CoordType;
  weather: Weather[];
  base: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod: number;
  timezone: number;
};

export function loadWeatherByCity({city}: Params) {
  try {
    return httpClient.getRequest<CityWeatherResponse>(
      `/2.5/weather?q=${city}&units=metric`,
    );
  } catch (error) {
    console.error('Error loading weather by city:', error); 
  }
}
