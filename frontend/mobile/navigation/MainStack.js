// navigation/AuthStack.js
// import DashboardScreen from '../screens/DashboardScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from "../screens/auth/home/DashboardScreen"
const Stack = createNativeStackNavigator();




export default function MainStack() {
    return (
      <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }