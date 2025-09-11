import React, { useState, useMemo } from 'react';
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
// Import vector icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'view-grid', iconType: 'MaterialCommunityIcons', color: Colors.interactive },
  { id: 'academic', label: 'Academic', icon: 'school', iconType: 'MaterialIcons', color: Colors.interactive },
  { id: 'delivery', label: 'Delivery', icon: 'truck-delivery', iconType: 'MaterialCommunityIcons', color: Colors.warning },
  { id: 'events', label: 'Events', icon: 'calendar-star', iconType: 'MaterialCommunityIcons', color: Colors.info },
  { id: 'practical', label: 'Practical', icon: 'tools', iconType: 'Entypo', color: Colors.success },
  { id: 'tutoring', label: 'Tutoring', icon: 'chalkboard-teacher', iconType: 'FontAwesome5', color: '#8B5CF6' },
  { id: 'research', label: 'Research', icon: 'science', iconType: 'MaterialIcons', color: '#EF4444' },
];

const FEATURED_TASKS = [
  { id: '1', title: 'Math Tutoring Help', budget: 500, category: 'Academic' },
  { id: '2', title: 'Campus Book Delivery', budget: 100, category: 'Delivery' },
];

const RECENT_TASKS = [
  { id: '3', title: 'Science Project Assistance', budget: 700, urgent: true, category: 'Academic' },
  { id: '4', title: 'Event Photography', budget: 1500, urgent: false, category: 'Events' },
  { id: '5', title: 'Lab Equipment Setup', budget: 300, urgent: false, category: 'Practical' },
  { id: '6', title: 'Research Paper Help', budget: 800, urgent: true, category: 'Research' },
];

// Icon Component Helper
const IconComponent = ({ iconType, name, size, color }) => {
  switch (iconType) {
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={size} color={color} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={name} size={size} color={color} />;
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} />;
    case 'Feather':
      return <Feather name={name} size={size} color={color} />;
    case 'AntDesign':
      return <AntDesign name={name} size={size} color={color} />;
    default:
      return <MaterialIcons name="help" size={size} color={color} />;
  }
};

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  // Filter recent tasks by searchText and category
  const filteredRecentTasks = useMemo(() => {
    return RECENT_TASKS.filter(task =>
      task.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedCategory === 'all' || task.category === selectedCategory)
    );
  }, [searchText, selectedCategory]);

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
          <View style={[
            styles.searchInputContainer,
            focusedInput && styles.searchInputContainerFocused
          ]}>
            <Feather name="search" size={18} color={Colors.textSecondary} style={styles.searchIconStyle} />
            <TextInput
              style={styles.searchInput}
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
                <View style={styles.categoryIconContainer}>
                  <IconComponent 
                    iconType={cat.iconType} 
                    name={cat.icon} 
                    size={24} 
                    color={selectedCategory === cat.id ? cat.color : Colors.textSecondary} 
                  />
                </View>
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
                  <MaterialIcons name="local-fire-department" size={16} color={Colors.error} />
                </View>
                <Text style={styles.featuredTitle}>{item.title}</Text>
                <Text style={styles.featuredBudget}>₹{item.budget}</Text>
                <View style={styles.featuredFooter}>
                  <View style={styles.featuredTimeContainer}>
                    <Feather name="clock" size={12} color={Colors.textSecondary} />
                    <Text style={styles.featuredTime}>2 hours ago</Text>
                  </View>
                  <View style={styles.featuredApplicantsContainer}>
                    <MaterialIcons name="people" size={12} color={Colors.interactive} />
                    <Text style={styles.featuredApplicants}>12 applicants</Text>
                  </View>
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
          {filteredRecentTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="search-off" size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyStateText}>No tasks found</Text>
              <Text style={styles.emptyStateSubtext}>Try adjusting your search or category filter</Text>
            </View>
          ) : (
            filteredRecentTasks.map((item) => (
              <TouchableOpacity key={item.id} style={styles.taskCard}>
                <View style={styles.taskCardHeader}>
                  <View style={styles.taskCategoryBadge}>
                    <Text style={styles.taskCategoryText}>{item.category}</Text>
                  </View>
                  {item.urgent && (
                    <View style={styles.urgentBadge}>
                      <MaterialIcons name="priority-high" size={12} color={Colors.accent} />
                      <Text style={styles.urgentText}>URGENT</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <View style={styles.taskFooter}>
                  <Text style={styles.taskBudget}>₹{item.budget}</Text>
                  <View style={styles.taskTimeContainer}>
                    <Feather name="clock" size={12} color={Colors.textSecondary} />
                    <Text style={styles.taskTime}>2 hours ago</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
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
              <View style={styles.quickActionIconContainer}>
                <MaterialIcons name="post-add" size={24} color={Colors.interactive} />
              </View>
              <Text style={styles.quickActionText}>Post Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIconContainer}>
                <MaterialIcons name="account-balance-wallet" size={24} color={Colors.success} />
              </View>
              <Text style={styles.quickActionText}>My Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIconContainer}>
                <MaterialIcons name="leaderboard" size={24} color={Colors.warning} />
              </View>
              <Text style={styles.quickActionText}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIconContainer}>
                <MaterialIcons name="assignment" size={24} color={Colors.info} />
              </View>
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
  searchInputContainerFocused: {
    borderColor: Colors.borderFocus,
    ...Shadows.md,
  },
  searchIconStyle: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
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
  categoryIconContainer: {
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
  featuredTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  featuredApplicantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredApplicants: {
    fontSize: Typography.fontSize.xs,
    color: Colors.interactive,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.xs,
  },
  recentSection: {
    marginBottom: Spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['4xl'],
  },
  emptyStateText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptyStateSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textTertiary,
    textAlign: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  urgentText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.accent,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: Spacing.xs,
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
  taskTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
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
  quickActionIconContainer: {
    marginBottom: Spacing.sm,
  },
  quickActionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
});
