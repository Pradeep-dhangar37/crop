import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';

export default function FinancialOverviewScreen({ navigation }) {
  // Example crop profit data (added images for demonstration)
  const cropData = [
    { crop: 'Wheat', profit: 100, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Wheat_close-up.JPG/320px-Wheat_close-up.JPG' },
    { crop: 'Rice', profit: 12000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Rice_grains_%28IRRI%29.jpg/320px-Rice_grains_%28IRRI%29.jpg' },
    { crop: 'Corn', profit: 8000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Yellow_corn.jpg/320px-Yellow_corn.jpg' },
    { crop: 'Soybean', profit: 6000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Soybean.USDA.jpg/320px-Soybean.USDA.jpg' },
    { crop: 'Barley', profit: 4000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Barley_close_up.JPG/320px-Barley_close_up.JPG' },
  ];

  // Chart Data
  const chartData = {
    labels: cropData.map(item => item.crop),
    datasets: [
      {
        data: cropData.map(item => item.profit)
      }
    ]
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Financial Overview</Text>
        </View>

        {/* Estimated Total Profit */}
        <View style={styles.profitBox}>
          <Text style={styles.profitLabel}>Total Profit</Text>
          <Text style={styles.profitValue}>
            ₹ {cropData.reduce((acc, item) => acc + item.profit, 0)}
          </Text>
        </View>

        {/* Crop List */}
        <Text style={styles.chartTitle}>Crops Overview</Text>
        {cropData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cropRow}
            onPress={() => navigation.navigate("AddExpense", { cropName: item.crop })}
          >
            <Image source={{ uri: item.image }} style={styles.cropImage} />
            <Text style={styles.cropName}>{item.crop}</Text>
            <Text style={styles.cropProfit}>₹ {item.profit}</Text>
          </TouchableOpacity>
        ))}

        {/* Histogram */}
        <Text style={styles.chartTitle}>Profit by Crop</Text>
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 20}
          height={250}
          yAxisLabel="₹"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  profitBox: {
    backgroundColor: '#e0f2f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  profitLabel: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  profitValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2e7d32',
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  cropRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  cropImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  cropName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold'
  },
  cropProfit: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: 'bold'
  }
});
