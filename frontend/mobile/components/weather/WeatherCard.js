import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WeatherCard({ location = "Indore", temperature = "31°C", condition = "Sunny" }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('WeatherDetail')}
      activeOpacity={0.8}
    >
      <Text style={styles.heading}>🌤️ Weather</Text>
      <View style={styles.row}>
        <Text style={styles.label}>📍 Location:</Text>
        <Text style={styles.value}>{location}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>🌡️ Temperature:</Text>
        <Text style={styles.value}>{temperature}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>☀️ Condition:</Text>
        <Text style={styles.value}>{condition}</Text>
      </View>
      <Text style={styles.detailLink}>Tap for details ➤</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    marginTop: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
    color: '#555',
    width: 110,
  },
  value: {
    fontWeight: '500',
    color: '#1B5E20',
  },
  detailLink: {
    marginTop: 12,
    textAlign: 'right',
    color: '#4CAF50',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
