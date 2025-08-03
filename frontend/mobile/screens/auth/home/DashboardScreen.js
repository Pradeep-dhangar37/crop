import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';

export default function DashboardScreen({ route }) {
  const { mobile } = route.params || {};
  const userName = 'John Doe';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#A5D6A7" barStyle="dark-content" />
      
      {/* Top bar with profile */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.name}>{userName}</Text>
          <Image
            source={{
              uri: 'https://i.pravatar.cc/100?img=1',
            }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Rest of your dashboard content */}
      <View style={styles.body}>
        <Text style={styles.welcome}>📱 Welcome, {mobile}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#A5D6A7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginRight: 8,
    fontSize: 16,
    color: '#1B5E20',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    color: '#388E3C',
  },
});
