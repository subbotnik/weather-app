import { autorun } from 'mobx';
import { useCallback, useEffect } from 'react';

import { getCurrentLocation } from '../services/LocationService';
import { useStore } from '../store';

export const useCurrentLocationWeather = () => {
  const {permissionsStore, weatherStore} = useStore();

  const requestWeather = useCallback(async () => {
    weatherStore.turnOnLoading();
    const location = await getCurrentLocation();
    weatherStore.loadWeatherByLongLat({
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  }, []);

  useEffect(() => {
    autorun(() => {
      if (permissionsStore.location === 'granted') {
        requestWeather();
      }
    });
  }, []);
};
