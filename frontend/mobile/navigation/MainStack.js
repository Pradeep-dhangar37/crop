import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens after login
import DashboardScreen from "../screens/home/DashboardScreen";
import NewsDetailScreen from "../screens/news/NewsDetail";
import WeatherDetailScreen from "../screens/weather/WeatherDetailScreen";
import AddCropScreen from '../screens/crop/AddCropScreen';
import FinancialOverviewScreen from '../screens/crop/FinancialOverviewScreen';
import AddExpenseScreen from '../screens/crop/AddExpenseScreen';

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
