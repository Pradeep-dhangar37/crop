import React from 'react';
// import BottomTabNavigator from '../../../navigation/BottomTabNavigator';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';

export default function DashboardScreen({ route }) {
  const { mobile } = route.params || {};

  return <BottomTabNavigator mobile={mobile} />;
}
