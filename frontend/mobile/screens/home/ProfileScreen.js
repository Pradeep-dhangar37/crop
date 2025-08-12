import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        style={styles.profileImage}
        source={{ uri: 'https://i.pravatar.cc/150?img=12' }} // Replace with user image if available
      />

      {/* User Name */}
      <Text style={styles.name}>John Doe</Text>

      {/* Email or other info */}
      <Text style={styles.email}>john.doe@example.com</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: 20,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: '#2E7D32',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2E7D32',
      marginBottom: 5,
    },
    email: {
      fontSize: 16,
      color: '#555',
      marginBottom: 30,
    },
    button: {
      backgroundColor: '#2E7D32',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      marginVertical: 10,
    },
    logoutButton: {
      backgroundColor: '#c62828',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  