import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IMAGES } from '../../assets';
import { useAskLocationPermissions } from '../../hooks/useAskLocationPermissions';
import { useCurrentLocationWeather } from '../../hooks/useCurrentLocationWeather';
import { useNetworkState } from '../../hooks/useNetworkState';
import { useOfflineActions } from '../../hooks/useOfflineActions';
import { MainNavigatorParamList } from '../../navigation/MainNavigator';
import { useStore } from '../../store';

export const InitialScreen = observer(() => {
  useAskLocationPermissions();
  useCurrentLocationWeather();

  const networkState = useNetworkState();
  const {showOfflineToastIfNeeded, hideOfflineToastIfNeeded} =
    useOfflineActions();

  useEffect(() => {
    if (networkState.isConnected) {
      hideOfflineToastIfNeeded();
    } else {
      showOfflineToastIfNeeded();
    }
  }, [networkState?.isConnected]);

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorParamList>>();
  const {weatherStore} = useStore();
  const onPress = () => navigation.navigate('Home');

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <Image style={styles.logo} source={IMAGES.logo} />
        <Text style={styles.title}>Breeze</Text>
        <Text style={styles.description}>Weather App</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          disabled={weatherStore.locationLoading}>
          {weatherStore.locationLoading ? (
            <ActivityIndicator />
          ) : (
            <Image style={styles.image} source={IMAGES.arrowRight} />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09131f',
  },
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 60,
  },
  description: {
    color: '#5b6c80',
    fontSize: 25,
    marginBottom: 40,
  },
  button: {
    width: 40,
    height: 40,
  },
  image: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
});
