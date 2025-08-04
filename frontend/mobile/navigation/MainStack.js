// navigation/AuthStack.js
// import DashboardScreen from '../screens/DashboardScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from "../screens/auth/home/DashboardScreen"
import NewsDetail from '../screens/auth/news/NewsDetail';
const Stack = createNativeStackNavigator();




export default function MainStack() {
    return (
      <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewsDetail" component={NewsDetail}  options={{headerShown: false}}/>
      </Stack.Navigator>
    );
  }