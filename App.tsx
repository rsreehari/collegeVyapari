// Main entry point for CollegeVyapari React Native app
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider, useUser } from './android/app/src/context/UserContext';
import AppNavigator from './android/app/src/navigation/AppNavigator';
import OnboardingScreen from './android/app/src/screens/OnboardingScreen';
import LoginScreen from './android/app/src/screens/LoginScreen';
import LoadingScreen from './android/app/src/screens/LoadingScreen';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from './android/app/src/styles/DesignSystem';

function AppContent() {
  const { user, isOnboardingComplete, isLoading } = useUser();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <LoadingScreen onFinish={() => setShowSplash(false)} />;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.interactive} />
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
    backgroundColor: Colors.background,
  },
});