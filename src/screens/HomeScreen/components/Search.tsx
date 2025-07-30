import { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useStore } from '../../../store';

export const Search = () => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  const {weatherStore} = useStore();

  const onChangeText = (q: string) => {
    setQuery(q);
  };

  const onPress = () => {
    setQuery('');
    inputRef.current?.clear();
  };

  const onSearch = () => {
    if (query.length) {
      weatherStore.loadWeatherByCity({city: query});
      setQuery('');
      inputRef.current?.clear();
    }
  };
  return (
    <View style={styles.searchContainer}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={'#5b6c80'}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        returnKeyType={'search'}
        inputMode="search"
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#1e2b3d',
    flex: 1,
    padding: 10,
    borderRadius: 10,
    color: '#FFF',
  },
  button: {
    marginLeft: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
  },
});
