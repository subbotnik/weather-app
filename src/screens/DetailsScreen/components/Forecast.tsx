import { IMAGES } from "@/src/assets";
import { UnifiedWeatherData } from "@/src/utils/unifyWeatherData";
import { Image, StyleSheet, Text, View } from "react-native";

export const Forecast = ({item}: {item: UnifiedWeatherData}) => {
  return (
    <>
      {item.daily?.length ? <>
        <Text style={styles.forecast}>{`Forecast`}</Text>
        {
          item.daily.map((day, index) => {
            let dayName = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const today = new Date();
            const dayDate = new Date(day.dt * 1000);
            const isToday = today.toDateString() === dayDate.toDateString();
            if (isToday) {
              dayName = 'Today';
            }
            const forecastImage = IMAGES[`image${day.weather[0].icon.slice(0, 2)}` as keyof typeof IMAGES];
            return (
              <View key={index} style={styles.forecastRow}>
                <Text style={styles.dayName}>{dayName}</Text>
                <Text style={styles.forecastTemp}>{`min: ${Math.round(day.temp.min)}° | max: ${Math.round(day.temp.max)}°`}</Text>
                <Image style={styles.forecastImage} source={forecastImage} />
              </View>
            )
          })
        }
      </> : null}
    </>
  )
}

const styles = StyleSheet.create({
  forecast: {
    color: '#fff',
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  forecastTemp: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  dayName: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    width: 50,
  },
  forecastImage: {
    width: 20,
    height: 20,
  },
});