import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyNews = [
  {
    id: '1',
    title: 'New Agricultural Reforms',
    summary: 'Government introduces new policy to help farmers.',
    image: 'https://t4.ftcdn.net/jpg/03/03/51/31/360_F_303513176_eV2YG7BvuZNeyPAUDBc1F2xOAS9leD19.jpg',
    content: 'Full article content goes here...',
    longDescription: `In a landmark move, the government has introduced agricultural reforms aimed at doubling farmers' income by 2030. These reforms focus on increasing minimum support prices, improving irrigation infrastructure, and ensuring timely delivery of seeds and fertilizers.

The policy also introduces tech-based solutions like satellite monitoring and soil health cards to increase productivity. Farmer unions have shown mixed responses, calling for clearer implementation timelines.

Economists say this could be a major step forward for food security and rural development if executed well.`,
    date: 'August 3, 2025'
  },
  {
    id: '2',
    title: 'Monsoon Forecast 2025',
    summary: 'Heavy rains expected across North India.',
    image: 'https://t4.ftcdn.net/jpg/03/03/51/31/360_F_303513176_eV2YG7BvuZNeyPAUDBc1F2xOAS9leD19.jpg',
    content: 'Full forecast details...',
    longDescription: `The Indian Meteorological Department has predicted an above-average monsoon in 2025, especially affecting northern and northeastern states.

Farmers are advised to prepare for water logging in low-lying areas. While the forecast brings hope for better crop yield, disaster management teams are on high alert in flood-prone zones.`,
    date: 'August 2, 2025'
  },
  {
    id: '1',
    title: 'New Agricultural Reforms',
    summary: 'Government introduces new policy to help farmers.',
    image: 'https://t4.ftcdn.net/jpg/03/03/51/31/360_F_303513176_eV2YG7BvuZNeyPAUDBc1F2xOAS9leD19.jpg',
    content: 'Full article content goes here...',
    longDescription: `In a landmark move, the government has introduced agricultural reforms aimed at doubling farmers' income by 2030. These reforms focus on increasing minimum support prices, improving irrigation infrastructure, and ensuring timely delivery of seeds and fertilizers.

The policy also introduces tech-based solutions like satellite monitoring and soil health cards to increase productivity. Farmer unions have shown mixed responses, calling for clearer implementation timelines.

Economists say this could be a major step forward for food security and rural development if executed well.`,
    date: 'August 3, 2025'
  },
  {
    id: '1',
    title: 'New Agricultural Reforms',
    summary: 'Government introduces new policy to help farmers.',
    image: 'https://t4.ftcdn.net/jpg/03/03/51/31/360_F_303513176_eV2YG7BvuZNeyPAUDBc1F2xOAS9leD19.jpg',
    content: 'Full article content goes here...',
    longDescription: `In a landmark move, the government has introduced agricultural reforms aimed at doubling farmers' income by 2030. These reforms focus on increasing minimum support prices, improving irrigation infrastructure, and ensuring timely delivery of seeds and fertilizers.

The policy also introduces tech-based solutions like satellite monitoring and soil health cards to increase productivity. Farmer unions have shown mixed responses, calling for clearer implementation timelines.

Economists say this could be a major step forward for food security and rural development if executed well.`,
    date: 'August 3, 2025'
  },
];


export default function NewsScreen({ navigation }) {
  return (
   <SafeAreaView style={styles.SafeAreaView}>
    <ScrollView>
     <View style={styles.container}>
      <Text style={styles.heading}>Latest News</Text>
      {dummyNews.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate('NewsDetail', {
              title: item.title,
              summary: item.summary,
              image: item.image,
              content: item.content,
              longDescription: item.longDescription, // ✅ added
              date: item.date,
            })
          }
          
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.summary}>{item.summary}</Text>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView:{
    flex: 1,
  },
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 180,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  summary: {
    marginHorizontal: 10,
    marginBottom: 10,
    color: '#555',
  },
});
