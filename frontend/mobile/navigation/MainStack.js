import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens after login
import DashboardScreen from "../screens/auth/home/DashboardScreen";
import NewsDetailScreen from "../screens/auth/news/NewsDetail";
import WeatherDetailScreen from "../screens/auth/weather/WeatherDetailScreen";
import AddCropScreen from '../screens/auth/crop/AddCropScreen';
import FinancialOverviewScreen from '../screens/auth/crop/FinancialOverviewScreen';
import AddExpenseScreen from '../screens/auth/crop/AddExpenseScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="WeatherDetail" component={WeatherDetailScreen} />
      <Stack.Screen name="AddCrop" component={AddCropScreen}/>
      <Stack.Screen name='FinancialOverview' component={FinancialOverviewScreen}/>
      <Stack.Screen name='AddExpense' component={AddExpenseScreen}/>
    </Stack.Navigator>
  );
}
