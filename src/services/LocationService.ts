import * as Location from 'expo-location';

export const requestLocationPermissions = async () => {
  const {status} = await Location.requestForegroundPermissionsAsync();

  return status;
};

export const getCurrentLocation = async () => {
  const location = await Location.getCurrentPositionAsync({});

  return location;
};
