import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OtpScreen({ route, navigation }) {
  const { formData, otpFromServer, mobile } = route.params; // signup form data passed from previous screen
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      Alert.alert('❌ Error', 'Please enter a valid 4-digit OTP.');
      return;
    }

    setIsLoading(true);

    try {
      // Call backend API to verify OTP
      const response = await fetch('http://10.159.98.170:3000/api/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: mobile,
          otp: otp
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('✅ Success', 'Your account has been created successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.replace('Login')
          }
        ]);
      } else {
        Alert.alert('❌ Error', data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>🔐 Enter OTP</Text>
        <Text style={styles.subtitle}>We've sent a 4-digit OTP to {mobile}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={4}
          value={otp}
          onChangeText={setOtp}
        />

        <TouchableOpacity
          style={[styles.verifyBtn, isLoading && styles.disabledBtn]}
          onPress={handleVerifyOtp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.verifyText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.resendText}>Resend OTP</Text>
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
  verifyBtn: {
    backgroundColor: '#689F38',
    padding: 15,
    borderRadius: 12,
    width: '60%',
    alignItems: 'center'
  },
  disabledBtn: {
    backgroundColor: '#ccc'
  },
  verifyText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
  resendBtn: {
    marginTop: 20,
    padding: 10
  },
  resendText: {
    color: '#33691E',
    textDecorationLine: 'underline',
    fontSize: 14
  }
});
