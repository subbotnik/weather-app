import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DetailsScreen } from '../screens/DetailsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { InitialScreen } from '../screens/InitialScreen';
import { UnifiedWeatherData } from '../utils/unifyWeatherData';

export type MainNavigatorParamList = {
  Initial: undefined;
  Home: undefined;
  Details: {
    item: UnifiedWeatherData;
  };
};

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Initial" component={InitialScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};
