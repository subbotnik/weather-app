import { NavigationContainer } from '@react-navigation/native';

import { MainNavigator } from './MainNavigator';

export const Router = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};
