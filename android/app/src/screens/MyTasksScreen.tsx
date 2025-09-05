import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
  FlatList,
  Animated,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows, Layout, CommonStyles } from '../styles/DesignSystem';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;
const isTablet = width > 768;

export default function MyTasksScreen() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  // Task data
  const [tasks] = useState({
    active: [
      {
        id: 1,
        title: 'Data Structures Assignment',
        description: 'Need help with implementing binary trees and graph algorithms in C++',
        category: 'Academic',
        categoryIconUri: 'https://img.icons8.com/ios-filled/16/4F46E5/school.png',
        budget: 750,
        deadline: '2024-09-05',
        timeLeft: '3 days',
        status: 'In Progress',
        responses: 12,
        categoryColor: '#4F46E5',
        priority: 'high',
        postedDate: '2024-09-01',
        skills: ['C++', 'Algorithms', 'Data Structures'],
      },
      {
        id: 2,
        title: 'Web Development Project',
        description: 'Build a responsive e-commerce website using React and Node.js',
        category: 'Practical',
        categoryIconUri: 'https://img.icons8.com/ios-filled/16/7C2D92/code.png',
        budget: 2500,
        deadline: '2024-09-10',
        timeLeft: '8 days',
        status: 'Finding Helper',
        responses: 5,
        categoryColor: '#7C2D92',
        priority: 'normal',
        postedDate: '2024-08-30',
        skills: ['React', 'Node.js', 'CSS'],
      },
      {
        id: 3,
        title: 'Campus Food Delivery',
        description: 'Pick up dinner from hostel mess and deliver to library',
        category: 'Delivery',
        categoryIconUri: 'https://img.icons8.com/ios-filled/16/D97706/delivery-dining.png',
        budget: 80,
        deadline: '2024-09-03',
        timeLeft: '2 hours',
        status: 'Assigned',
        responses: 3,
        categoryColor: '#D97706',
        priority: 'urgent',
        postedDate: '2024-09-02',
        assignedTo: 'Rahul Kumar',
      },
    ],
    completed: [
      {
        id: 4,
        title: 'Machine Learning Notes',
        description: 'Complete notes for ML algorithms and implementations',
        category: 'Notes',
        categoryIconUri: 'https://img.icons8.com/ios-filled/16/DC2626/note.png',
        budget: 600,
        completedDate: '2024-08-28',
        status: 'Completed',
        rating: 4.8,
        categoryColor: '#DC2626',
        completedBy: 'Priya Sharma',
      },
      {
        id: 5,
        title: 'College Fest Photography',
        description: 'Event coverage for annual college festival',
        category: 'Events',
        categoryIconUri: 'https://img.icons8.com/ios-filled/16/0891B2/camera-alt.png',
        budget: 1200,
        completedDate: '2024-08-25',
        status: 'Completed',
        rating: 5.0,
        categoryColor: '#0891B2',
        completedBy: 'Arjun Patel',
      },
    ],
  });

  const filters = [
    { id: 'all', label: 'All', icon: '📋', color: Colors.textSecondary },
    { id: 'Academic', label: 'Academic', icon: '📚', color: Colors.interactive },
    { id: 'Delivery', label: 'Delivery', icon: '🚚', color: Colors.warning },
    { id: 'Events', label: 'Events', icon: '🎉', color: Colors.info },
    { id: 'Practical', label: 'Practical', icon: '🔧', color: Colors.success },
  ];

  const getStatusDetails = (status) => {
    const statusMap = {
      'In Progress': {
        color: Colors.warning,
        bgColor: '#FEF3C7',
        icon: '⏳',
      },
      'Finding Helper': {
        color: Colors.textSecondary,
        bgColor: Colors.surfaceSecondary,
        icon: '🔍',
      },
      Assigned: {
        color: Colors.success,
        bgColor: '#D1FAE5',
        icon: '👤',
      },
      Completed: {
        color: Colors.success,
        bgColor: '#ECFDF5',
        icon: '✅',
      },
    };
    return statusMap[status] || statusMap['Finding Helper'];
  };

  const getPriorityDetails = (priority) => {
    const priorityMap = {
      urgent: { color: '#EF4444', label: 'Urgent', bgColor: '#FEE2E2' },
      high: { color: '#F59E0B', label: 'High', bgColor: '#FEF3C7' },
      normal: { color: '#10B981', label: 'Normal', bgColor: '#D1FAE5' },
      low: { color: '#6B7280', label: 'Low', bgColor: '#F3F4F6' },
    };
    return priorityMap[priority] || priorityMap['normal'];
  };

  const formatTimeLeft = (timeLeft) => {
    if (timeLeft.includes('hours')) return { text: timeLeft, urgent: true };
    if (timeLeft.includes('day') && parseInt(timeLeft) <= 3) return { text: timeLeft, urgent: true };
    return { text: timeLeft, urgent: false };
  };

  const filteredTasks = tasks[activeTab].filter(
    (task) => selectedFilter === 'all' || task.category === selectedFilter
  );

  const renderTaskCard = ({ item: task }) => {
    const statusDetails = getStatusDetails(task.status);
    const priorityDetails = getPriorityDetails(task.priority);

    return (
      <TouchableOpacity
        style={[styles.taskCard, { borderLeftColor: task.categoryColor }]}
        activeOpacity={0.7}
        onPress={() => handleTaskPress(task)}
      >
        {task.priority && (
          <View style={[styles.priorityBadge, { backgroundColor: priorityDetails.bgColor }]}>
            <Text style={[styles.priorityText, { color: priorityDetails.color }]}>{priorityDetails.label}</Text>
          </View>
        )}

        <View style={styles.taskHeader}>
          <View style={styles.taskTitleSection}>
            <View style={styles.categoryBadge}>
              <Image source={{ uri: task.categoryIconUri }} style={styles.categoryIcon} />
              <Text style={[styles.categoryText, { color: task.categoryColor }]}>{task.category}</Text>
            </View>
            <Text style={styles.taskTitle} numberOfLines={2}>
              {task.title}
            </Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: statusDetails.bgColor }]}>
            <Image source={{ uri: statusDetails.iconUri }} style={styles.statusIcon} />
            <Text style={[styles.statusText, { color: statusDetails.color }]}>{task.status}</Text>
          </View>
        </View>

        <Text style={styles.taskDescription} numberOfLines={2}>
          {task.description}
        </Text>

        {task.skills && (
          <View style={styles.skillsContainer}>
            {task.skills.slice(0, 3).map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
            {task.skills.length > 3 && <Text style={styles.moreSkills}>+{task.skills.length - 3} more</Text>}
          </View>
        )}

        <View style={styles.taskFooter}>
          <View style={styles.metaInfo}>
            <View style={styles.budgetContainer}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/16/059669/cash-in-hand.png' }}
                style={styles.footerIcon}
              />
              <Text style={styles.budgetText}>₹{task.budget}</Text>
            </View>

            {task.timeLeft && (
              <View style={styles.timeContainer}>
                <Image
                  source={{
                    uri: formatTimeLeft(task.timeLeft).urgent
                      ? 'https://img.icons8.com/ios-filled/16/EF4444/alarm.png'
                      : 'https://img.icons8.com/ios-filled/16/6B7280/alarm.png',
                  }}
                  style={styles.footerIcon}
                />
                <Text style={[styles.timeText, formatTimeLeft(task.timeLeft).urgent && styles.urgentTime]}>
                  {task.timeLeft}
                </Text>
              </View>
            )}

            {task.responses && (
              <View style={styles.responsesContainer}>
                <Image
                  source={{ uri: 'https://img.icons8.com/ios-filled/16/4F46E5/conference-call.png' }}
                  style={styles.footerIcon}
                />
                <Text style={styles.responsesText}>{task.responses}</Text>
              </View>
            )}

            {task.rating && (
              <View style={styles.ratingContainer}>
                <Image source={{ uri: 'https://img.icons8.com/ios-filled/16/F59E0B/star.png' }} style={styles.footerIcon} />
                <Text style={styles.ratingText}>{task.rating}</Text>
              </View>
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7} onPress={() => handleViewTask(task)}>
              <Image source={{ uri: 'https://img.icons8.com/ios-filled/16/6B7280/visible.png' }} style={styles.footerIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.7} onPress={() => handleMessageTask(task)}>
              <Image source={{ uri: 'https://img.icons8.com/ios-filled/16/FFFFFF/speech-bubble.png' }} style={styles.footerIconWhite} />
              <Text style={styles.primaryButtonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {(task.assignedTo || task.completedBy) && (
          <View style={styles.assigneeContainer}>
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/14/6B7280/user.png' }} style={styles.assigneeIcon} />
            <Text style={styles.assigneeText}>
              {task.assignedTo ? `Assigned to: ${task.assignedTo}` : `Completed by: ${task.completedBy}`}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const handleTaskPress = (task) => Alert.alert('Task Details', `View details for: ${task.title}`);

  const handleViewTask = (task) => Alert.alert('View Task', `Opening details for: ${task.title}`);

  const handleMessageTask = (task) => Alert.alert('Messages', `Opening chat for: ${task.title}`);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

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
        <Text style={styles.headerTitle}>My Tasks</Text>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <Animated.View 
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>📋</Text>
              </View>
              <Text style={styles.statNumber}>{tasks.active.length}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>✅</Text>
              </View>
              <Text style={styles.statNumber}>{tasks.completed.length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>💰</Text>
              </View>
              <Text style={styles.statNumber}>₹5.1K</Text>
              <Text style={styles.statLabel}>Total Value</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>⭐</Text>
              </View>
              <Text style={styles.statNumber}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </Animated.View>

        {/* Tab Navigation */}
        <Animated.View 
          style={[
            styles.tabContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => setActiveTab('active')}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>⏳</Text>
            <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
              Active ({tasks.active.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>✅</Text>
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed ({tasks.completed.length})
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Filter Options */}
        <Animated.View 
          style={[
            styles.filterContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[styles.filterChip, selectedFilter === filter.id && styles.filterChipSelected]}
                onPress={() => setSelectedFilter(filter.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.filterIcon}>{filter.icon}</Text>
                <Text style={[styles.filterChipText, selectedFilter === filter.id && styles.filterChipTextSelected]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <Animated.View 
            style={[
              styles.listContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {filteredTasks.map((task) => {
              const statusDetails = getStatusDetails(task.status);
              const priorityDetails = getPriorityDetails(task.priority);

              return (
                <TouchableOpacity
                  key={task.id}
                  style={[styles.taskCard, { borderLeftColor: task.categoryColor }]}
                  activeOpacity={0.7}
                  onPress={() => handleTaskPress(task)}
                >
                  {task.priority && (
                    <View style={[styles.priorityBadge, { backgroundColor: priorityDetails.bgColor }]}>
                      <Text style={[styles.priorityText, { color: priorityDetails.color }]}>{priorityDetails.label}</Text>
                    </View>
                  )}

                  <View style={styles.taskHeader}>
                    <View style={styles.taskTitleSection}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryIcon}>{task.category === 'Academic' ? '📚' : task.category === 'Delivery' ? '🚚' : task.category === 'Events' ? '🎉' : '🔧'}</Text>
                        <Text style={[styles.categoryText, { color: task.categoryColor }]}>{task.category}</Text>
                      </View>
                      <Text style={styles.taskTitle} numberOfLines={2}>
                        {task.title}
                      </Text>
                    </View>

                    <View style={[styles.statusBadge, { backgroundColor: statusDetails.bgColor }]}>
                      <Text style={styles.statusIcon}>{statusDetails.icon}</Text>
                      <Text style={[styles.statusText, { color: statusDetails.color }]}>{task.status}</Text>
                    </View>
                  </View>

                  <Text style={styles.taskDescription} numberOfLines={2}>
                    {task.description}
                  </Text>

                  {task.skills && (
                    <View style={styles.skillsContainer}>
                      {task.skills.slice(0, 3).map((skill, index) => (
                        <View key={index} style={styles.skillTag}>
                          <Text style={styles.skillText}>{skill}</Text>
                        </View>
                      ))}
                      {task.skills.length > 3 && <Text style={styles.moreSkills}>+{task.skills.length - 3} more</Text>}
                    </View>
                  )}

                  <View style={styles.taskFooter}>
                    <View style={styles.metaInfo}>
                      <View style={styles.budgetContainer}>
                        <Text style={styles.footerIcon}>💰</Text>
                        <Text style={styles.budgetText}>₹{task.budget}</Text>
                      </View>

                      {task.timeLeft && (
                        <View style={styles.timeContainer}>
                          <Text style={styles.footerIcon}>⏰</Text>
                          <Text style={[styles.timeText, formatTimeLeft(task.timeLeft).urgent && styles.urgentTime]}>
                            {task.timeLeft}
                          </Text>
                        </View>
                      )}

                      {task.responses && (
                        <View style={styles.responsesContainer}>
                          <Text style={styles.footerIcon}>👥</Text>
                          <Text style={styles.responsesText}>{task.responses}</Text>
                        </View>
                      )}

                      {task.rating && (
                        <View style={styles.ratingContainer}>
                          <Text style={styles.footerIcon}>⭐</Text>
                          <Text style={styles.ratingText}>{task.rating}</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.actionButtons}>
                      <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7} onPress={() => handleViewTask(task)}>
                        <Text style={styles.footerIcon}>👁️</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.primaryButton} activeOpacity={0.7} onPress={() => handleMessageTask(task)}>
                        <Text style={styles.footerIconWhite}>💬</Text>
                        <Text style={styles.primaryButtonText}>Chat</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {(task.assignedTo || task.completedBy) && (
                    <View style={styles.assigneeContainer}>
                      <Text style={styles.assigneeIcon}>👤</Text>
                      <Text style={styles.assigneeText}>
                        {task.assignedTo ? `Assigned to: ${task.assignedTo}` : `Completed by: ${task.completedBy}`}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        ) : (
          <Animated.View 
            style={[
              styles.emptyState,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.emptyStateIcon}>
              <Text style={styles.emptyStateIconText}>
                {activeTab === 'active' ? '📋' : '✅'}
              </Text>
            </View>
            <Text style={styles.emptyStateTitle}>
              {activeTab === 'active' ? 'No Active Tasks' : 'No Completed Tasks Yet'}
            </Text>
            <Text style={styles.emptyStateText}>
              {activeTab === 'active'
                ? 'Ready to get some help? Post your first task!'
                : 'Your completed tasks will appear here once you finish them.'}
            </Text>
            <TouchableOpacity style={styles.emptyStateButton} activeOpacity={0.7}>
              <Text style={styles.emptyStateButtonIcon}>➕</Text>
              <Text style={styles.emptyStateButtonText}>Post New Task</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
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
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.screenPadding,
  },
  statsContainer: {
    marginBottom: Spacing.xl,
  },
  statsCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Shadows.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statIcon: {
    fontSize: Typography.fontSize.lg,
  },
  statNumber: {
    fontSize: isSmallScreen ? Typography.fontSize.base : Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.extrabold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: isSmallScreen ? Typography.fontSize.xs : Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSecondary,
    marginBottom: Spacing.xl,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xs,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  activeTab: {
    backgroundColor: Colors.interactive,
    ...Shadows.sm,
  },
  tabText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.accent,
  },
  tabIcon: {
    fontSize: Typography.fontSize.base,
  },
  filterContainer: {
    marginBottom: Spacing.lg,
  },
  filterContent: {
    paddingHorizontal: 0,
    gap: Spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  filterChipSelected: {
    backgroundColor: Colors.interactive,
    borderColor: Colors.interactive,
  },
  filterChipText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textSecondary,
  },
  filterChipTextSelected: {
    color: Colors.accent,
  },
  filterIcon: {
    fontSize: Typography.fontSize.base,
  },
  listContainer: {
    paddingBottom: Spacing['6xl'],
  },
  taskCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadows.md,
    borderLeftWidth: 4,
    position: 'relative',
  },
  priorityBadge: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  priorityText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.extrabold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  taskHeader: {
    marginBottom: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitleSection: {
    flex: 1,
    marginRight: Spacing.md,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  categoryIcon: {
    fontSize: Typography.fontSize.sm,
  },
  taskTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.lg,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
    alignSelf: 'flex-start',
    maxWidth: 120,
    flexShrink: 1,
  },
  statusText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  statusIcon: {
    fontSize: Typography.fontSize.sm,
  },
  taskDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.sm,
    marginBottom: Spacing.md,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  skillTag: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  skillText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
  },
  moreSkills: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.semibold,
    alignSelf: 'center',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
    flexWrap: 'wrap',
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  budgetText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.extrabold,
    color: Colors.success,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  timeText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.semibold,
  },
  urgentTime: {
    color: Colors.error,
    fontWeight: Typography.fontWeight.bold,
  },
  responsesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  responsesText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.interactive,
    fontWeight: Typography.fontWeight.semibold,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.warning,
    fontWeight: Typography.fontWeight.bold,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  secondaryButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.interactive,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  primaryButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.accent,
  },
  footerIcon: {
    fontSize: Typography.fontSize.base,
  },
  footerIconWhite: {
    fontSize: Typography.fontSize.base,
    color: Colors.accent,
  },
  assigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceSecondary,
    gap: Spacing.sm,
  },
  assigneeIcon: {
    fontSize: Typography.fontSize.sm,
  },
  assigneeText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.semibold,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing['3xl'],
    paddingVertical: Spacing['6xl'],
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  emptyStateIconText: {
    fontSize: Typography.fontSize['4xl'],
  },
  emptyStateTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    marginBottom: Spacing['3xl'],
  },
  emptyStateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.interactive,
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
  },
  emptyStateButtonIcon: {
    fontSize: Typography.fontSize.lg,
    color: Colors.accent,
  },
  emptyStateButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.accent,
  },
});
