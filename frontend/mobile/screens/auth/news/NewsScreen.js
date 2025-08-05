import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { newsData } from '../../../data/newsData';
import NewsCard from '../../../components/NewsCard';

const categories = ['All', 'Environment', 'Technology', 'Policy', 'Market'];

export default function NewsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNews =
    selectedCategory === 'All'
      ? newsData
      : newsData.filter((item) => item.category === selectedCategory);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      {/* Category Top Bar */}
      <View style={styles.topBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>{selectedCategory}</Text>

          {filteredNews.length === 0 ? (
            <Text style={styles.noDataText}>No news found for "{selectedCategory}".</Text>
          ) : (
            filteredNews.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={item.title}
                summary={item.summary}
                image={item.image}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryButton: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  container: {
    padding: 6,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingLeft: 10,
    paddingTop: 5,
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});
