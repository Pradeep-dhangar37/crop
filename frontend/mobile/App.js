import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './navigation/AuthStack';
import DashboardScreen from './screens/auth/home/DashboardScreen';
import NewsDetailScreen from './screens/auth/news/NewsDetail';
// import DashboardScreen from './screens/home/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
        <Stack.Screen name='NewsDetail' component={NewsDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
