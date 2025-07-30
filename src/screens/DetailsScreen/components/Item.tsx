import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  info?: string | number;
};

export const Item = ({title, info}: Props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#1e2b3d',
    padding: 20,
    width: '45%',
    marginVertical: 10,
    borderRadius: 15,
  },
  title: {
    color: '#5c5b63',
    fontSize: 15,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  info: {
    color: '#fff',
    fontSize: 20,
  },
})