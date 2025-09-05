// Main entry point for CollegeVyapari React Native app
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider, useUser } from './android/app/src/context/UserContext';
import AppNavigator from './android/app/src/navigation/AppNavigator';
import OnboardingScreen from './android/app/src/screens/OnboardingScreen';
import LoginScreen from './android/app/src/screens/LoginScreen';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

function AppContent() {
  const { user, isOnboardingComplete, isLoading } = useUser();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  if (!isOnboardingComplete) {
    return <OnboardingScreen />;
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
});