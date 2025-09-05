import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { Colors, Typography, Spacing, CommonStyles } from '../styles/DesignSystem';

const { width, height } = Dimensions.get('window');

interface LoadingScreenProps {
  onFinish?: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the loading animation sequence
    const animationSequence = Animated.sequence([
      // Fade in and scale up the logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      
      // Slide in the Malayalam text
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      
      // Progress bar animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]);

    animationSequence.start(() => {
      // Animation finished, call onFinish after a short delay
      setTimeout(() => {
        onFinish?.();
      }, 500);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Background with subtle pattern */}
      <View style={styles.backgroundPattern} />
      
      {/* Main content */}
      <View style={styles.content}>
        {/* Logo Container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* App Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>CV</Text>
            </View>
          </View>
          
          {/* College Text */}
          <Text style={styles.collegeText}>College</Text>
          
          {/* Malayalam Text */}
          <Animated.View
            style={[
              styles.malayalamContainer,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.malayalamText}>വ്യാപാരി</Text>
          </Animated.View>
          
          {/* Tagline */}
          <Text style={styles.tagline}>WHERE STUDENTS MEET HUSTLES</Text>
        </Animated.View>
        
        {/* Loading Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.loadingText}>Loading your hustle journey...</Text>
        </View>
      </View>
      
      {/* Bottom decorative elements */}
      <View style={styles.bottomDecorations}>
        <View style={styles.decorationDot} />
        <View style={styles.decorationDot} />
        <View style={styles.decorationDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    opacity: 0.05,
  },
  
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing['6xl'],
  },
  
  iconContainer: {
    marginBottom: Spacing.xl,
  },
  
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  iconText: {
    color: Colors.accent,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 2,
  },
  
  collegeText: {
    color: Colors.accent,
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.extrabold,
    marginBottom: Spacing.sm,
    letterSpacing: 1,
  },
  
  malayalamContainer: {
    marginBottom: Spacing.md,
  },
  
  malayalamText: {
    color: Colors.secondary,
    fontSize: Typography.fontSize['5xl'],
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
  },
  
  tagline: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
    letterSpacing: 2,
    opacity: 0.8,
  },
  
  progressContainer: {
    width: width * 0.7,
    alignItems: 'center',
  },
  
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 2,
  },
  
  loadingText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    opacity: 0.7,
  },
  
  bottomDecorations: {
    position: 'absolute',
    bottom: Spacing['4xl'],
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  decorationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    marginHorizontal: Spacing.sm,
    opacity: 0.6,
  },
});
