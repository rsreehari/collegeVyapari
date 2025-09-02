// Main entry point for CollegeVyapari React Native app
import React from 'react';
import AppNavigator from './android/app/src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return(
   <NavigationContainer>
     <AppNavigator />
   </NavigationContainer> 
  )
}