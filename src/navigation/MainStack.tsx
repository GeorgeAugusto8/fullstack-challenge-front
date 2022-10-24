import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TabBar } from '../components';

const StackNavigator = createStackNavigator();

export default () => {
  return <NavigationContainer>
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Main" options={{ headerShown: false }} component={TabBar} />
    </StackNavigator.Navigator>
  </NavigationContainer>
}