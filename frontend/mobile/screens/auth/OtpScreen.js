import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OtpScreen({ route, navigation }) {
  const { formData } = route.params; // signup form data passed from previous screen
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = () => {
    // In a real app, you’d verify OTP with backend
    if (otp === '1234') { 
      Alert.alert('✅ Success', 'Your account has been created!');
      console.log('Final Signup Data:', formData);
      navigation.replace('Login'); // go to login after signup
    } else {
      Alert.alert('❌ Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>🔐 Enter OTP</Text>
        <Text style={styles.subtitle}>We’ve sent a 4-digit OTP to your mobile number.</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={4}
          value={otp}
          onChangeText={setOtp}
        />

        <TouchableOpacity style={styles.verifyBtn} onPress={handleVerifyOtp}>
          <Text style={styles.verifyText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F1F8E9' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#33691E', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  input: {
    width: '60%',
    borderWidth: 2,
    borderColor: '#AED581',
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  verifyBtn: { backgroundColor: '#689F38', padding: 15, borderRadius: 12, width: '60%' },
  verifyText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
});
