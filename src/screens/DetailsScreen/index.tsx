import { RouteProp, useRoute } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { screenWidth } from '@/src/utils/screen';
import { IMAGES } from '../../assets';
import { Header } from '../../components/Header';
import { MainNavigatorParamList } from '../../navigation/MainNavigator';
import { Forecast } from './components/Forecast';
import { Item } from './components/Item';

export const DetailsScreen = () => {
  const route = useRoute<RouteProp<MainNavigatorParamList, 'Details'>>();

  const {item} = route.params;

  const image = IMAGES[`image${item.imageName}` as keyof typeof IMAGES];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <Header />
        <ScrollView contentContainerStyle={{alignItems: 'center', width: screenWidth, paddingHorizontal: 20,}}>
          <Text style={styles.city}>{item.city}</Text>
          <Image style={styles.image} source={image} />
          <Text style={styles.temp}>{`Now: ${item.temp}°`}</Text>
          <View style={styles.row}>
            <Item title={'uv index'} info={item.uvIndex ?? '--/--'} />
            <Item title={'wind'} info={`${item.wind} km/h`} />
          </View>
          <View style={styles.row}>
            <Item title={'humidity'} info={`${item.humidity} %`} />
            <Item title={'visibility'} info={`${item.visibility} km`} />
          </View>
          <Forecast item={item} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09131f',
  },
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
  },
  city: {
    fontSize: 25,
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  temp: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
