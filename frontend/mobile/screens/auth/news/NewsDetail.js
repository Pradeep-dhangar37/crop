import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewsDetail({ route }) {
  const { title, summary, image, content, date, longDescription } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.summary}>{summary}</Text>
          <Text style={styles.content}>{content}</Text>
          <Text style={styles.longDescription}>{longDescription}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 220,
  },
  contentContainer: {
    padding: 16,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summary: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 16,
    color: '#555',
  },
  content: {
    fontSize: 16,
    marginBottom: 12,
    color: '#444',
  },
  longDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
});
