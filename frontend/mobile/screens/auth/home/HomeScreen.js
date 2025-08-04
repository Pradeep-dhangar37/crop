import React from 'react';
import { View, Text, StyleSheet, Image, Platform, StatusBar } from 'react-native';

export default function HomeScreen({ mobile }) {
  const userName = 'John Doe';

  return (
    <View style={styles.container}>
      {/* Improved Top Bar */}
      <View style={styles.topBarWrapper}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Dashboard</Text>
          <View style={styles.profileContainer}>
            <Text style={styles.name}>{userName}</Text>
            <Image
              source={{ uri: 'https://t4.ftcdn.net/jpg/03/03/51/31/360_F_303513176_eV2YG7BvuZNeyPAUDBc1F2xOAS9leD19.jpg' }}
              style={styles.avatar}
            />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.welcome}>📱 Welcome, {mobile || 'User'}!</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8F5E9',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    topBarWrapper: {
      backgroundColor: '#A5D6A7',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingBottom: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#2E7D32',
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    name: {
      marginRight: 10,
      fontSize: 17,
      color: '#1B5E20',
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: '#388E3C',
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcome: {
      fontSize: 20,
      color: '#388E3C',
      fontWeight: '500',
    },
  });
  