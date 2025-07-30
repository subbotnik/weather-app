import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useToast } from 'react-native-toast-notifications';
import { IMAGES } from '../../../assets';
import { MainNavigatorParamList } from '../../../navigation/MainNavigator';
import { useStore } from '../../../store';
import { UnifiedWeatherData } from '../../../utils/unifyWeatherData';

export const List = observer(() => {
  const {weatherStore} = useStore();
  const {error} = weatherStore;
  const toast = useToast();

  if (error) {
    toast.show(error, {
      type: 'danger',
      duration: 3000,
      animationType: 'slide-in',
    });

    setTimeout(() => {
      weatherStore.cleanError();
    }, 3000);
  }

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorParamList>>();

  const onPress = (item: UnifiedWeatherData) =>
    navigation.navigate('Details', {item});

  const onLongPress = (item: UnifiedWeatherData) => {
    Alert.alert(
      'Remove City',
      `Are you sure you want to remove ${item.city}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => weatherStore.removeCity({city: item.city}),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  }

  const renderItem = ({item}: {item: UnifiedWeatherData}) => {
    const image = IMAGES[`image${item.imageName}` as keyof typeof IMAGES];

    return (
      <TouchableWithoutFeedback onPress={() => onPress(item)} onLongPress={() => onLongPress(item)}>
        <View style={styles.item}>
          <Image source={image} style={styles.image} />
          <View style={styles.locationInfo}>
            <Text style={styles.city}>{item.city}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.temp}>{`${item.temp}°`}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <FlatList
      style={styles.flatlist}
      data={weatherStore.weather}
      renderItem={renderItem}
      ListFooterComponent={
        weatherStore.cityLoading ? <ActivityIndicator /> : null
      }
    />
  );
});

const styles = StyleSheet.create({
  flatlist: {
    paddingTop: 20,
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#1e2b3d',
    borderRadius: 10,
    marginBottom: 15,
  },
  imageContainer: {
    width: 50,
  },
  image: {
    width: 50,
    height: 50,
  },
  time: {
    color: '#5f666a',
  },
  city: {
    color: '#fff',
    fontSize: 20,
  },
  tempContainer: {
    width: 70,
    alignItems: 'flex-end',
  },
  temp: {
    color: '#fff',
    fontSize: 30,
  },
  locationInfo: {
    marginLeft: 20,
    flexGrow: 1,
  },
});
