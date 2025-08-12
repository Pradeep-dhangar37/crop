import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WeatherDetailScreen() {
  const navigation = useNavigation();

  // Dummy forecast data for other days
  const forecastData = [
    { day: 'Tue', temp: '30°C', condition: '☀️' },
    { day: 'Wed', temp: '28°C', condition: '⛅' },
    { day: 'Thu', temp: '27°C', condition: '🌧️' },
    { day: 'Fri', temp: '31°C', condition: '☀️' },
    { day: 'Sat', temp: '29°C', condition: '🌦️' },
  ];

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>🌤️ Detailed Weather Analysis</Text>

        <View style={styles.detailBox}>
          <Text style={styles.label}>📍 Location: Indore</Text>
          <Text style={styles.label}>🌡️ Temperature: 31°C</Text>
          <Text style={styles.label}>☀️ Condition: Sunny</Text>
          <Text style={styles.label}>💧 Humidity: 50%</Text>
          <Text style={styles.label}>💨 Wind Speed: 12 km/h</Text>
          <Text style={styles.label}>🕒 Sunrise: 6:10 AM</Text>
          <Text style={styles.label}>🌇 Sunset: 6:45 PM</Text>
        </View>

        <Text style={styles.forecastHeading}>Upcoming Forecast</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastScroll}>
          {forecastData.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.day}>{item.day}</Text>
              <Text style={styles.condition}>{item.condition}</Text>
              <Text style={styles.temp}>{item.temp}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 30,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 20,
  },
  detailBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 10,
  },
  forecastHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 10,
  },
  forecastScroll: {
    flexGrow: 0,
  },
  card: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginRight: 15,
    width: 100,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  condition: {
    fontSize: 24,
    marginBottom: 5,
  },
  temp: {
    fontSize: 16,
    color: '#555',
  },
});