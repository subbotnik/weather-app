import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List } from './components/List';
import { Search } from './components/Search';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <Search />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <List />
        </TouchableWithoutFeedback>
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
    paddingHorizontal: 20,
  },
});
