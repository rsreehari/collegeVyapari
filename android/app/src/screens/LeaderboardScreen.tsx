import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import UserRatingCard from '../components/UserRatingCard';

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

  const categories = [
    { id: 'overall', label: 'Overall', icon: 'https://img.icons8.com/ios-filled/24/4F46E5/trophy.png' },
    { id: 'weekly', label: 'This Week', icon: 'https://img.icons8.com/ios-filled/24/10B981/calendar.png' },
    { id: 'monthly', label: 'This Month', icon: 'https://img.icons8.com/ios-filled/24/F59E0B/calendar.png' },
    { id: 'helpers', label: 'Top Helpers', icon: 'https://img.icons8.com/ios-filled/24/8B5CF6/handshake.png' },
    { id: 'earners', label: 'Top Earners', icon: 'https://img.icons8.com/ios-filled/24/EF4444/money.png' },
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
      tasksCompleted: 108,
      onTimePercentage: 90,
      points: 1820,
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

  const renderRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = ['#FFD700', '#C0C0C0', '#CD7F32']; // Gold, Silver, Bronze
      const icons = [
        'https://img.icons8.com/ios-filled/24/FFD700/trophy.png',
        'https://img.icons8.com/ios-filled/24/C0C0C0/trophy.png',
        'https://img.icons8.com/ios-filled/24/CD7F32/trophy.png',
      ];
      
      return (
        <View style={[styles.rankBadge, { backgroundColor: colors[rank - 1] }]}>
          <Image source={{ uri: icons[rank - 1] }} style={styles.rankIcon} />
        </View>
      );
    }
    
    return (
      <View style={styles.rankNumber}>
        <Text style={styles.rankText}>#{rank}</Text>
      </View>
    );
  };

  const renderChangeIndicator = (change: number) => {
    if (change === 0) return null;
    
    const isPositive = change > 0;
    return (
      <View style={[
        styles.changeIndicator,
        { backgroundColor: isPositive ? '#10B981' : '#EF4444' }
      ]}>
        <Image
          source={{
            uri: isPositive
              ? 'https://img.icons8.com/ios-filled/12/FFFFFF/up-arrow.png'
              : 'https://img.icons8.com/ios-filled/12/FFFFFF/down-arrow.png'
          }}
          style={styles.changeIcon}
        />
        <Text style={styles.changeText}>{Math.abs(change)}</Text>
      </View>
    );
  };

  const renderLeaderboardItem = (user: LeaderboardUser) => (
    <View key={user.id} style={styles.leaderboardItem}>
      <View style={styles.rankContainer}>
        {renderRankBadge(user.rank)}
        {renderChangeIndicator(user.weeklyChange)}
      </View>
      
      <View style={styles.userContainer}>
        <UserRatingCard
          user={user}
          size="medium"
          showDetails={true}
        />
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
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <Text style={styles.headerSubtitle}>Top performers in your college</Text>
      </View>

      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.categoryTabActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Image
              source={{ uri: category.icon }}
              style={[
                styles.categoryIcon,
                selectedCategory === category.id && styles.categoryIconActive
              ]}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Current User Rank */}
      <View style={styles.currentUserCard}>
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
      </View>

      {/* Leaderboard */}
      <ScrollView
        style={styles.leaderboardContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {leaderboardData.map(renderLeaderboardItem)}
        
        {/* Load More Button */}
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Achievement Banner */}
      <View style={styles.achievementBanner}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/32/F59E0B/trophy.png' }}
          style={styles.achievementIcon}
        />
        <View style={styles.achievementContent}>
          <Text style={styles.achievementTitle}>New Achievement!</Text>
          <Text style={styles.achievementDescription}>
            Complete 5 more tasks to unlock "Task Master" badge
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryTab: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryTabActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  categoryIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  categoryIconActive: {
    tintColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  currentUserCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  currentUserHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentUserTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  currentUserRank: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4F46E5',
  },
  currentUserStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  currentUserStat: {
    alignItems: 'center',
  },
  currentUserStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  currentUserStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  leaderboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  leaderboardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 40,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  rankIcon: {
    width: 20,
    height: 20,
  },
  rankNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  changeIcon: {
    width: 8,
    height: 8,
    marginRight: 2,
  },
  changeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  userContainer: {
    flex: 1,
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  statItem: {
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  loadMoreButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  loadMoreText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  achievementBanner: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  achievementIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#92400E',
  },
});
