import React from 'react';
import { View, Text, StyleSheet, Image, Platform, StatusBar, TouchableOpacity } from 'react-native';
import WeatherCard from '../../components/weather/WeatherCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ mobile, navigation }) {
  const userName = 'John Doe';
  const estimatedProfit = '₹ 25,000';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <WeatherCard />

        {/* Grid Section */}
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridBox} onPress={() => navigation.navigate('AddCrop')}>
            <Text style={styles.gridTitle}>Add Crops</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridBox}>
            <Text style={styles.gridTitle}>Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridBox}>
            <Text style={styles.gridTitle}>Expenses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridBox}>
            <Text style={styles.gridTitle}>Profit</Text>
          </TouchableOpacity>

          {/* Profit Estimate Box */}
          <TouchableOpacity style={styles.gridBoxFull} onPress={()=> navigation.navigate('FinancialOverview')}>
            <Text style={styles.profitValue}>{estimatedProfit}</Text>
            <Text style={styles.gridTitle}>Estimate your Field Profit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FFF8', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FFF8',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  gridBox: {
    backgroundColor: '#E0F2F1',
    width: '45%',
    height: 100,
    borderRadius: 16,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  gridBoxFull: {
    backgroundColor: '#E0F2F1',
    width: '95%',
    height: 100,
    borderRadius: 16,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  gridTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004D40',
  },
  profitValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
});
