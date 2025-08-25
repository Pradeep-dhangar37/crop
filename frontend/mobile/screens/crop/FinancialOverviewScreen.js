import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";

const IP = Constants.expoConfig.extra.BASE_IP;

export default function FinancialOverviewScreen({ navigation }) {
  // const IP = process.env.BASE_IP;
  const [cropData, setCropData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFinancialData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError("Authentication Error - Please login again");
        setLoading(false);
        return;
      }

      const res = await fetch(`http://${IP}:3000/api/crops/profit`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        const formatted = data.crops.map(crop => ({
          crop: crop.crop_name,
          profit: crop.profit,
          image: crop.image_url,
          crop_id: crop.crop_id, // <--- important
        }));
        setCropData(formatted);
        setTotalProfit(data.totalProfit);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch financial data");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network Error - Please check your internet connection");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#004D40" />
          <Text style={styles.loadingText}>Loading financial overview...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchFinancialData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const chartData = {
    labels: cropData.map(item => item.crop),
    datasets: [{ data: cropData.map(item => item.profit) }],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Financial Overview</Text>
        </View>

        <View style={styles.profitBox}>
          <Text style={styles.profitLabel}>Total Profit</Text>
          <Text style={styles.profitValue}>₹ {totalProfit}</Text>
        </View>

        <View style={styles.cropOverview}>
          <Text style={styles.chartTitle}>Crops Overview</Text>
          {cropData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cropRow}
              onPress={() => navigation.navigate("AddExpense", { cropName: item.crop, cropId: item.crop_id })}
            >
              <Image source={{ uri: item.image }} style={styles.cropImage} />
              <Text style={styles.cropName}>{item.crop}</Text>
              <Text
                style={[
                  styles.cropProfit,
                  { color: item.profit >= 0 ? "#2e7d32" : "#d32f2f" },
                ]}
              >
                ₹ {item.profit}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

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
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  profitBox: {
    backgroundColor: '#e0f2f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  profitLabel: { fontSize: 16, color: '#555', textAlign: 'center' },
  profitValue: {
    fontSize: 24, fontWeight: 'bold', marginTop: 5,
    color: '#2e7d32', textAlign: 'center',
  },
  chartTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  cropOverview: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
  },
  cropRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  cropImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  cropName: { flex: 1, fontSize: 16, fontWeight: 'bold' },
  cropProfit: { fontSize: 16, fontWeight: 'bold' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#004D40' },
  errorText: { fontSize: 16, color: '#d32f2f', textAlign: 'center', marginBottom: 20 },
  retryButton: {
    backgroundColor: '#004D40',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
