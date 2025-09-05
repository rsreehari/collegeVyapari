import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows, Layout, CommonStyles } from '../styles/DesignSystem';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'academic', label: 'Academic', icon: '📚', color: Colors.interactive },
  { id: 'delivery', label: 'Delivery', icon: '🚚', color: Colors.warning },
  { id: 'events', label: 'Events', icon: '🎉', color: Colors.info },
  { id: 'practical', label: 'Practical', icon: '🔧', color: Colors.success },
  { id: 'tutoring', label: 'Tutoring', icon: '👨‍🏫', color: '#8B5CF6' },
  { id: 'research', label: 'Research', icon: '🔬', color: '#EF4444' },
];

const FEATURED_TASKS = [
  { id: '1', title: 'Math Tutoring Help', budget: 500, category: 'Academic' },
  { id: '2', title: 'Campus Book Delivery', budget: 100, category: 'Delivery' },
];

const RECENT_TASKS = [
  { id: '3', title: 'Science Project Assistance', budget: 700, urgent: true },
  { id: '4', title: 'Event Photography', budget: 1500, urgent: false },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('academic');
  const [searchText, setSearchText] = useState('');
  const [focusedInput, setFocusedInput] = useState(false);

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

  // Filter recent tasks by searchText or category
  const filteredRecentTasks = RECENT_TASKS.filter(task =>
    task.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedCategory === 'all' || task.category === selectedCategory)
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
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <Animated.View 
          style={[
            styles.searchContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[
                styles.searchInput,
                focusedInput && styles.searchInputFocused
              ]}
              placeholder="Search tasks or helpers..."
              placeholderTextColor={Colors.textTertiary}
              value={searchText}
              onChangeText={setSearchText}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
            />
          </View>
        </Animated.View>

        {/* Categories */}
        <Animated.View 
          style={[
            styles.categoriesContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === cat.id && styles.categoryCardActive,
                  { borderColor: selectedCategory === cat.id ? cat.color : Colors.border }
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={[
                  styles.categoryLabel,
                  selectedCategory === cat.id && styles.categoryLabelActive,
                  { color: selectedCategory === cat.id ? cat.color : Colors.textPrimary }
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Featured Tasks */}
        <Animated.View 
          style={[
            styles.featuredSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Featured Tasks</Text>
          <FlatList
            horizontal
            data={FEATURED_TASKS}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.featuredCard}>
                <View style={styles.featuredCardHeader}>
                  <Text style={styles.featuredCategory}>{item.category}</Text>
                  <Text style={styles.featuredUrgent}>🔥</Text>
                </View>
                <Text style={styles.featuredTitle}>{item.title}</Text>
                <Text style={styles.featuredBudget}>₹{item.budget}</Text>
                <View style={styles.featuredFooter}>
                  <Text style={styles.featuredTime}>2 hours ago</Text>
                  <Text style={styles.featuredApplicants}>12 applicants</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.featuredListContent}
          />
        </Animated.View>

        {/* Recent Tasks */}
        <Animated.View 
          style={[
            styles.recentSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Recent Tasks</Text>
          {filteredRecentTasks.map((item) => (
            <TouchableOpacity key={item.id} style={styles.taskCard}>
              <View style={styles.taskCardHeader}>
                <View style={styles.taskCategoryBadge}>
                  <Text style={styles.taskCategoryText}>{item.category}</Text>
                </View>
                {item.urgent && (
                  <View style={styles.urgentBadge}>
                    <Text style={styles.urgentText}>URGENT</Text>
                  </View>
                )}
              </View>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <View style={styles.taskFooter}>
                <Text style={styles.taskBudget}>₹{item.budget}</Text>
                <Text style={styles.taskTime}>2 hours ago</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View 
          style={[
            styles.quickActionsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>📝</Text>
              <Text style={styles.quickActionText}>Post Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>💰</Text>
              <Text style={styles.quickActionText}>My Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>🏆</Text>
              <Text style={styles.quickActionText}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionText}>My Tasks</Text>
            </TouchableOpacity>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: Layout.screenPadding,
  },
  searchContainer: {
    marginBottom: Spacing.xl,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  searchIcon: {
    fontSize: Typography.fontSize.lg,
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  searchInputFocused: {
    borderColor: Colors.borderFocus,
  },
  categoriesContainer: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  categoriesScroll: {
    marginBottom: Spacing.sm,
  },
  categoryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginRight: Spacing.md,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  categoryCardActive: {
    backgroundColor: Colors.surfaceSecondary,
    ...Shadows.md,
  },
  categoryIcon: {
    fontSize: Typography.fontSize['2xl'],
    marginBottom: Spacing.sm,
  },
  categoryLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
  },
  categoryLabelActive: {
    fontWeight: Typography.fontWeight.bold,
  },
  featuredSection: {
    marginBottom: Spacing.xl,
  },
  featuredListContent: {
    paddingLeft: 0,
  },
  featuredCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginRight: Spacing.md,
    width: width * 0.7,
    ...Shadows.md,
  },
  featuredCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  featuredCategory: {
    fontSize: Typography.fontSize.xs,
    color: Colors.interactive,
    fontWeight: Typography.fontWeight.semibold,
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  featuredUrgent: {
    fontSize: Typography.fontSize.sm,
  },
  featuredTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  featuredBudget: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success,
    marginBottom: Spacing.md,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  featuredApplicants: {
    fontSize: Typography.fontSize.xs,
    color: Colors.interactive,
    fontWeight: Typography.fontWeight.medium,
  },
  recentSection: {
    marginBottom: Spacing.xl,
  },
  taskCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  taskCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  taskCategoryBadge: {
    backgroundColor: Colors.interactive,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  taskCategoryText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.accent,
    fontWeight: Typography.fontWeight.semibold,
  },
  urgentBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  urgentText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.accent,
    fontWeight: Typography.fontWeight.bold,
  },
  taskTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskBudget: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success,
  },
  taskTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  quickActionsSection: {
    marginBottom: Spacing['6xl'],
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    width: '48%',
    marginBottom: Spacing.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  quickActionIcon: {
    fontSize: Typography.fontSize['2xl'],
    marginBottom: Spacing.sm,
  },
  quickActionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
});
