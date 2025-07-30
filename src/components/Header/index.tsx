import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { IMAGES } from '../../assets';

export const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigation.goBack}>
        <Image style={styles.back} source={IMAGES.arrowLeft} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  back: {
    width: 40,
    height: 40,
  },
});
