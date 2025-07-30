import { Location } from '../../modules/weatherStore';
import { httpClient } from '../httpClient';

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type CurrentLocationWeatherDetails = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
};

export type Daily = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise?: number;
  moonset?: number;
  moon_phase: number;
  summary: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
  rain?: number;
};

export type WeatherResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentLocationWeatherDetails;
  daily: Daily[];
};

export function loadWeatherByLongLat({long, lat}: Location) {
  try {
    return httpClient.getRequest<WeatherResponse>(
      `/3.0/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric`,
    );
  } catch (error) {
    console.error('Error loading weather by longitude and latitude:', error);
  }
}
