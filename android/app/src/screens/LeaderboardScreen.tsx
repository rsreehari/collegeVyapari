import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
  Animated,
} from 'react-native';
import UserRatingCard from '../components/UserRatingCard';
import { Colors, Typography, Spacing, BorderRadius, Shadows, Layout, CommonStyles } from '../styles/DesignSystem';

const { width } = Dimensions.get('window');

interface LeaderboardUser {
  id: string;
  name: string;
  college: string;
  rating: number;
  tasksCompleted: number;
  onTimePercentage: number;
  points: number;
  level: number;
  profileImage?: string;
  rank: number;
  weeklyChange: number; // positive or negative change in rank
}

export default function LeaderboardScreen() {
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [refreshing, setRefreshing] = useState(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const categories = [
    { id: 'overall', label: 'Overall', icon: '🏆', color: Colors.interactive },
    { id: 'weekly', label: 'This Week', icon: '📅', color: Colors.success },
    { id: 'monthly', label: 'This Month', icon: '📆', color: Colors.warning },
    { id: 'helpers', label: 'Top Helpers', icon: '🤝', color: '#8B5CF6' },
    { id: 'earners', label: 'Top Earners', icon: '💰', color: Colors.error },
  ];

  // Mock data - in real app, this would come from API
  const leaderboardData: LeaderboardUser[] = [
    {
      id: '1',
      name: 'R Sreehari',
      college: 'NIT',
      rating: 4.9,
      tasksCompleted: 156,
      onTimePercentage: 98,
      points: 2450,
      level: 8,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rank: 1,
      weeklyChange: 0,
    },
    {
      id: '2',
      name: 'Priya Sharma',
      college: 'IIT Delhi',
      rating: 4.8,
      tasksCompleted: 142,
      onTimePercentage: 96,
      points: 2280,
      level: 7,
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rank: 2,
      weeklyChange: 1,
    },
    {
      id: '3',
      name: 'Arjun Kumar',
      college: 'DU',
      rating: 4.7,
      tasksCompleted: 128,
      onTimePercentage: 94,
      points: 2100,
      level: 6,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rank: 3,
      weeklyChange: -1,
    },
    {
      id: '4',
      name: 'Sneha Patel',
      college: 'BITS',
      rating: 4.6,
      tasksCompleted: 115,
      onTimePercentage: 92,
      points: 1950,
      level: 6,
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rank: 4,
      weeklyChange: 2,
    },
    {
      id: '5',
      name: 'Vikram Singh',
      college: 'IIM',
      rating: 4.5,
      tasksCompleted: 98,
      onTimePercentage: 90,
      points: 1800,
      level: 5,
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rank: 5,
      weeklyChange: 0,
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return '📈';
    if (change < 0) return '📉';
    return '➡️';
  };

  const renderLeaderboardItem = (user: LeaderboardUser) => (
    <View key={user.id} style={styles.leaderboardItem}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankIcon}>{getRankIcon(user.rank)}</Text>
        <View style={styles.changeContainer}>
          <Text style={styles.changeIcon}>{getChangeIcon(user.weeklyChange)}</Text>
          <Text style={styles.changeText}>{Math.abs(user.weeklyChange)}</Text>
        </View>
      </View>
      
      <View style={styles.userInfo}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>{user.name.charAt(0)}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userCollege}>{user.college}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text style={styles.ratingText}>{user.rating}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>L{user.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoIconText}>CV</Text>
            </View>
          </View>
          <Text style={styles.appName}>College</Text>
          <Text style={styles.malayalamText}>വ്യാപാരി</Text>
          <Text style={styles.tagline}>WHERE STUDENTS MEET HUSTLES</Text>
        </View>
        <Text style={styles.headerTitle}>🏆 Leaderboard</Text>
        <Text style={styles.headerSubtitle}>Top performers in your college</Text>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Tabs */}
        <Animated.View 
          style={[
            styles.categoriesContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryTab,
                  selectedCategory === category.id && [
                    styles.categoryTabActive,
                    { borderColor: category.color }
                  ]
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && [
                      styles.categoryTextActive,
                      { color: category.color }
                    ]
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Current User Rank */}
        <Animated.View 
          style={[
            styles.currentUserCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.currentUserHeader}>
            <Text style={styles.currentUserTitle}>Your Rank</Text>
            <Text style={styles.currentUserRank}>#12</Text>
          </View>
          <View style={styles.currentUserStats}>
            <View style={styles.currentUserStat}>
              <Text style={styles.currentUserStatValue}>1,250</Text>
              <Text style={styles.currentUserStatLabel}>Points</Text>
            </View>
            <View style={styles.currentUserStat}>
              <Text style={styles.currentUserStatValue}>L5</Text>
              <Text style={styles.currentUserStatLabel}>Level</Text>
            </View>
            <View style={styles.currentUserStat}>
              <Text style={styles.currentUserStatValue}>+3</Text>
              <Text style={styles.currentUserStatLabel}>This Week</Text>
            </View>
          </View>
        </Animated.View>

        {/* Leaderboard */}
        <Animated.View 
          style={[
            styles.leaderboardContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {leaderboardData.map(renderLeaderboardItem)}
          
          {/* Load More Button */}
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>📈 Load More</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Achievement Banner */}
        <Animated.View 
          style={[
            styles.achievementBanner,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.achievementIcon}>🏆</Text>
          <View style={styles.achievementContent}>
            <Text style={styles.achievementTitle}>New Achievement!</Text>
            <Text style={styles.achievementDescription}>Complete 10 tasks this week</Text>
          </View>
          <TouchableOpacity style={styles.achievementButton}>
            <Text style={styles.achievementButtonText}>Claim</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Layout.screenPadding,
    borderBottomLeftRadius: BorderRadius['3xl'],
    borderBottomRightRadius: BorderRadius['3xl'],
    marginBottom: Spacing.xl,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logoContainer: {
    marginBottom: Spacing.lg,
  },
  logoIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
  },
  logoIconText: {
    color: Colors.accent,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 1,
  },
  appName: {
    color: Colors.accent,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.extrabold,
    marginBottom: Spacing.xs,
    letterSpacing: 1,
  },
  malayalamText: {
    color: Colors.secondary,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  tagline: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
    letterSpacing: 1,
    opacity: 0.8,
  },
  headerTitle: {
    color: Colors.accent,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.screenPadding,
  },
  categoriesContainer: {
    marginBottom: Spacing.xl,
  },
  categoriesContent: {
    paddingHorizontal: 0,
    gap: Spacing.sm,
  },
  categoryTab: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  categoryTabActive: {
    backgroundColor: Colors.surfaceSecondary,
    ...Shadows.md,
  },
  categoryIcon: {
    fontSize: Typography.fontSize.base,
    marginRight: Spacing.sm,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textSecondary,
  },
  categoryTextActive: {
    fontWeight: Typography.fontWeight.bold,
  },
  currentUserCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  currentUserHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  currentUserTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  currentUserRank: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.extrabold,
    color: Colors.interactive,
  },
  currentUserStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  currentUserStat: {
    alignItems: 'center',
  },
  currentUserStatValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  currentUserStatLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  leaderboardContainer: {
    marginBottom: Spacing.xl,
  },
  leaderboardItem: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.sm,
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  rankIcon: {
    fontSize: Typography.fontSize['2xl'],
    marginBottom: Spacing.xs,
  },
  changeContainer: {
    alignItems: 'center',
  },
  changeIcon: {
    fontSize: Typography.fontSize.sm,
  },
  changeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  userInfo: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.interactive,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  profileInitial: {
    color: Colors.accent,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  userCollege: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: Typography.fontSize.sm,
    marginRight: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.warning,
    fontWeight: Typography.fontWeight.semibold,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  loadMoreButton: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  loadMoreText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.interactive,
  },
  achievementBanner: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing['6xl'],
    ...Shadows.md,
  },
  achievementIcon: {
    fontSize: Typography.fontSize['2xl'],
    marginRight: Spacing.lg,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  achievementDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  achievementButton: {
    backgroundColor: Colors.interactive,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  achievementButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.accent,
  },
});