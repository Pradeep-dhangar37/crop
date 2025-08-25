import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";

const IP = Constants.expoConfig.extra.BASE_IP;
// import { BASE_IP } from "@env";


export default function AddCropScreen({ navigation }) {
  // const IP = process.env.BASE_IP;
  const [crops, setCrops] = useState([]);
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch crops from backend
  const fetchCrops = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error("No token found");
        setError("Authentication Error");
        setLoading(false);
        return;
      }
      // 10.143.125.170
      const res = await fetch(`http://${IP}:3000/api/crops`, {
       
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        // console.log("Crops data:", data);

        // Backend returns crop_id, crop_name, image_url, isSelected
        const formatted = data.crops.map(crop => ({
          id: crop.crop_id.toString(),
          name: crop.crop_name,
          image: crop.image_url
        }));
        setCrops(formatted);

        // Set initially selected crops based on backend response
        const initiallySelected = data.crops
          .filter(crop => crop.isSelected)
          .map(crop => ({
            id: crop.crop_id.toString(),
            name: crop.crop_name,
            image: crop.image_url
          }));
        setSelectedCrops(initiallySelected);
        setError(null);
      } else {
        const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
        console.error("Error fetching crops:", errorData.message);
        setError(errorData.message || "Failed to fetch crops");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Network Error - Please check your internet connection");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const toggleCrop = (crop) => {
    if (selectedCrops.some(item => item.id === crop.id)) {
      setSelectedCrops(selectedCrops.filter(item => item.id !== crop.id));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const removeCrop = (id) => {
    setSelectedCrops(selectedCrops.filter(item => item.id !== id));
  };

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    fetchCrops();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert("Authentication Error", "Please login again");
        setSubmitting(false);
        return;
      }

      const selectedCropIds = selectedCrops.map(crop => parseInt(crop.id));

      const response = await fetch(`http://${IP}:3000/api/crops/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          selectedCropIds: selectedCropIds
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Your crops have been updated successfully!", [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Dashboard')
          }
        ]);
      } else {
        Alert.alert("Error", data.message || "Failed to update crops");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Network Error", "Please check your internet connection and try again");
    } finally {
      setSubmitting(false);
    }
  };

  const renderCrop = ({ item }) => {
    const isSelected = selectedCrops.some(crop => crop.id === item.id);
    return (
      <TouchableOpacity
        style={[styles.cropItem, isSelected && styles.selectedCrop]}
        onPress={() => toggleCrop(item)}
      >
        <Image source={{ uri: item.image }} style={styles.cropImage} />
        <Text style={styles.cropName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderSelectedCrop = ({ item }) => (
    <View style={styles.selectedItem}>
      <Image source={{ uri: item.image }} style={styles.selectedImage} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeCrop(item.id)}
      >
        <AntDesign name="closecircle" size={18} color="red" />
      </TouchableOpacity>
      <Text style={styles.selectedCropName}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#004D40" />
          <Text style={styles.loadingText}>Loading crops...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={retryFetch}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Your Crops</Text>
          <Text style={styles.headerSubtitle}>
            {selectedCrops.length} of {crops.length} crops selected
          </Text>
        </View>

        {/* Selected Crops */}
        {selectedCrops.length > 0 && (
          <View style={styles.selectedContainer}>
            <FlatList
              data={selectedCrops}
              keyExtractor={(item) => item.id}
              renderItem={renderSelectedCrop}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        {/* Crop List */}
        <FlatList
          data={crops}
          keyExtractor={(item) => item.id}
          renderItem={renderCrop}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
        />

        {/* Add Button */}
        <TouchableOpacity
          style={[styles.addButton, submitting && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.addButtonText}>Save Selected Crops</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FFF8', marginTop: 30 },
  container: { flex: 1, padding: 16 },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#004D40'
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20
  },
  retryButton: {
    backgroundColor: '#004D40',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  selectedContainer: { marginBottom: 15 },
  selectedItem: { alignItems: 'center', marginRight: 20, position: 'relative', marginTop: 10 },
  selectedImage: { width: 60, height: 60, borderRadius: 30 },
  removeButton: { position: 'absolute', top: -5, right: -5, backgroundColor: '#fff', borderRadius: 12 },
  selectedCropName: { fontSize: 12, marginTop: 4, color: '#004D40' },

  listContainer: { paddingBottom: 80 },
  cropItem: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    padding: 10,
    backgroundColor: '#E0F2F1',
    borderRadius: 12,
  },
  selectedCrop: { borderWidth: 2, borderColor: '#004D40' },
  cropImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 6 },
  cropName: { fontSize: 14, fontWeight: '500', color: '#004D40' },

  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#004D40',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
