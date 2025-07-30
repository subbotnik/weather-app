import { autorun } from 'mobx';
import { useCallback, useEffect } from 'react';

import { requestLocationPermissions } from '../services/LocationService';
import { useStore } from '../store';

export const useAskLocationPermissions = () => {
  const {permissionsStore} = useStore();

  const requestPermissions = useCallback(async () => {
    try {
      const status = await requestLocationPermissions();

      permissionsStore.setPermissions({status});
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    autorun(() => {
      if (!permissionsStore.location) {
        requestPermissions();
      }
    });
  }, []);
};
