import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const languages = ['Hindi', 'English'];

export default function SignupScreen({navigation}) {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    password: '',
    // location: '',
    email: '',
    language: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.mobile || !form.password ||!form.language) {
      Alert.alert('Missing Fields', 'Please fill all required fields');
      return;
    }
  
    // Navigate to OTP Screen with form data
    navigation.navigate('Otp', { formData: form });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>👨‍🌾 किसान रजिस्ट्रेशन</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={(text) => handleChange('mobile', text)}
        />

        {/* Password Field with Eye Toggle Icon */}
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={(text) => handleChange('password', text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#33691E"
            />
          </TouchableOpacity>
        </View>

        {/* <TextInput
          style={styles.input}
          placeholder="Location (e.g., Village, District)"
          onChangeText={(text) => handleChange('location', text)}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Email (Optional)"
          keyboardType="email-address"
          onChangeText={(text) => handleChange('email', text)}
        />
        <Text style={styles.label}>Preferred Language</Text>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.languageButton,
              form.language === lang && styles.selectedLanguage,
            ]}
            onPress={() => handleChange('language', lang)}
          >
            <Text style={styles.languageText}>{lang}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F8E9',
  },
  linkText: {
    color: '#33691E',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },  
  container: {
    padding: 24,
    backgroundColor: '#F1F8E9',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#33691E',
    fontWeight: 'bold',
    width: '100%',
  },
  input: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#AED581',
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
    borderColor: '#AED581',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 6,
    fontWeight: '500',
    color: '#558B2F',
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  languageButton: {
    width: '90%',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#AED581',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  selectedLanguage: {
    backgroundColor: '#DCEDC8',
  },
  languageText: {
    textAlign: 'center',
    color: '#33691E',
    fontWeight: '500',
  },
  submitBtn: {
    width: '90%',
    backgroundColor: '#689F38',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
