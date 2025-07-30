import { CityWeatherResponse } from '../api/weather/loadWeatherByCity';
import { Daily, WeatherResponse } from '../api/weather/loadWeatherByLongLat';

export type UnifiedWeatherData = {
  city: string;
  timezone: number;
  uvIndex?: number;
  wind: number;
  visibility: number;
  humidity: number;
  time: string;
  imageName: string;
  temp: number;
  daily?: Daily[];
};

const calcTime = (offset: number) => {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const nd = new Date(utc + 1000 * offset);
  return nd.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
};

export const unifyWeatherByLocation = (
  data: WeatherResponse,
): UnifiedWeatherData => {
  const [, city] = data.timezone.split('/');
  const [weather] = data.current.weather;
  const imageName = weather.icon.slice(0, 2);
  return {
    city,
    timezone: data.timezone_offset,
    uvIndex: data.current.uvi,
    wind: data.current.wind_speed,
    visibility: data.current.visibility / 1000,
    humidity: data.current.humidity,
    time: calcTime(data.timezone_offset),
    imageName,
    temp: Math.round(data.current.temp),
    daily: data?.daily,
  };
};

export const unifyWeatherByCity = (
  data: CityWeatherResponse,
): UnifiedWeatherData => {
  const [weather] = data.weather;
  const imageName = weather.icon.slice(0, 2);
  return {
    city: data.name,
    timezone: data.timezone,
    wind: data.wind.speed,
    visibility: data.visibility / 1000,
    humidity: data.main.humidity,
    time: calcTime(data.timezone),
    imageName,
    temp: Math.round(data.main.temp),
  };
};
