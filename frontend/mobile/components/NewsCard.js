// components/NewsCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NewsCard({ id, title, summary, image }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('NewsDetail', {
      id,
      title,
      summary,
      image,
      date: 'August 3, 2025',
      content: `Full detailed content of the article: ${title}...`, // Optional, can be replaced with actual content
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summary}>{summary}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  summary: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
