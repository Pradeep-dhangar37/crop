import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUser } from '../../context/UserContext';
// import { BASE_IP } from "@env";


export default function LoginScreen({ navigation }) {
  const IP = process.env.BASE_IP;
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();

  const handleLogin = async () => {
    if (!mobile || !password) {
      Alert.alert('Missing Fields', 'Please enter both mobile number and password');
      return;
    }

    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      Alert.alert('Invalid Mobile', 'Enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);

    try {
      // Call backend API for login
      const response = await fetch(`http://${IP}:3000/api/users/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: mobile,
          password: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data and token using context
        const success = await login(data.user, data.token);
        if (success) {
          console.log('Login successful:', data);
          // Navigation will be handled automatically by the context
        } else {
          Alert.alert('Error', 'Failed to save login data');
        }
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid mobile number or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>🔑 लॉगिन करें</Text>

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={setMobile}
          value={mobile}
        />

        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#33691E"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginBtn, isLoading && styles.disabledBtn]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#E8F5E9' },
  container: {
    padding: 24,
    backgroundColor: '#E8F5E9',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 26, marginBottom: 30, color: '#2E7D32', fontWeight: 'bold' },
  input: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#A5D6A7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  inputWithIcon: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A5D6A7',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  passwordInput: { flex: 1, paddingVertical: 12, paddingHorizontal: 5 },
  loginBtn: {
    width: '90%',
    backgroundColor: '#43A047',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  loginText: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
  linkText: {
    color: '#33691E',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
