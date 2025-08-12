import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const dummyCrops = [
  { id: '1', name: 'Wheat', image: 'https://cdn-icons-png.flaticon.com/512/415/415682.png' },
  { id: '2', name: 'Rice', image: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' },
  { id: '3', name: 'Corn', image: 'https://cdn-icons-png.flaticon.com/512/415/415740.png' },
  { id: '4', name: 'Tomato', image: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' },
];

export default function AddCropScreen({ navigation }) {
  const [selectedCrops, setSelectedCrops] = useState([]);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
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
          data={dummyCrops}
          keyExtractor={(item) => item.id}
          renderItem={renderCrop}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
        />

        {/* Add Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FFF8',  marginTop: 30},
  container: { flex: 1, padding: 16 },

  selectedContainer: { marginBottom: 15 },
  selectedItem: { alignItems: 'center', marginRight: 20, position: 'relative', marginTop: 10},
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
  addButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
