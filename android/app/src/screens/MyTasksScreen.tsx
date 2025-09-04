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
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;
const isTablet = width > 768;

export default function MyTasksScreen() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedFilter, setSelectedFilter] = useState('all');

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
    { id: 'all', label: 'All', iconUri: 'https://img.icons8.com/ios-filled/16/6B7280/apps.png' },
    { id: 'Academic', label: 'Academic', iconUri: 'https://img.icons8.com/ios-filled/16/4F46E5/school.png' },
    { id: 'Delivery', label: 'Delivery', iconUri: 'https://img.icons8.com/ios-filled/16/D97706/delivery-dining.png' },
    { id: 'Events', label: 'Events', iconUri: 'https://img.icons8.com/ios-filled/16/0891B2/event.png' },
    { id: 'Practical', label: 'Practical', iconUri: 'https://img.icons8.com/ios-filled/16/7C2D92/build.png' },
  ];

  const getStatusDetails = (status) => {
    const statusMap = {
      'In Progress': {
        color: '#D97706',
        bgColor: '#FEF3C7',
        iconUri: 'https://img.icons8.com/ios-filled/12/D97706/hourglass-empty.png',
      },
      'Finding Helper': {
        color: '#6B7280',
        bgColor: '#F3F4F6',
        iconUri: 'https://img.icons8.com/ios-filled/12/6B7280/search.png',
      },
      Assigned: {
        color: '#059669',
        bgColor: '#D1FAE5',
        iconUri: 'https://img.icons8.com/ios-filled/12/059669/person-pin.png',
      },
      Completed: {
        color: '#10B981',
        bgColor: '#ECFDF5',
        iconUri: 'https://img.icons8.com/ios-filled/12/10B981/check-circle.png',
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
      <StatusBar backgroundColor="#2E3A59" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <Image source={{ uri: 'https://img.icons8.com/ios-filled/24/2E3A59/left.png' }} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <TouchableOpacity style={styles.searchButton} activeOpacity={0.7}>
          <Image source={{ uri: 'https://img.icons8.com/ios-filled/24/2E3A59/search--v1.png' }} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: '#4F46E515' }]}>
              <Image source={{ uri: 'https://img.icons8.com/ios-filled/18/4F46E5/assignment.png' }} style={styles.statIcon} />
            </View>
            <Text style={styles.statNumber}>{tasks.active.length}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: '#10B98115' }]}>
              <Image source={{ uri: 'https://img.icons8.com/ios-filled/18/10B981/check-circle.png' }} style={styles.statIcon} />
            </View>
            <Text style={styles.statNumber}>{tasks.completed.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: '#05966915' }]}>
              <Image source={{ uri: 'https://img.icons8.com/ios-filled/18/059669/cash-in-hand.png' }} style={styles.statIcon} />
            </View>
            <Text style={styles.statNumber}>₹5.1K</Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: '#F59E0B15' }]}>
              <Image source={{ uri: 'https://img.icons8.com/ios-filled/18/F59E0B/star.png' }} style={styles.statIcon} />
            </View>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/16/FFFFFF/schedule.png' }}
            style={[styles.tabIcon, activeTab === 'active' ? {} : { tintColor: '#6B7280' }]}
          />
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active ({tasks.active.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/18/FFFFFF/done-all.png' }}
            style={[styles.tabIcon, activeTab === 'completed' ? {} : { tintColor: '#6B7280' }]}
          />
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed ({tasks.completed.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[styles.filterChip, selectedFilter === filter.id && styles.filterChipSelected]}
            onPress={() => setSelectedFilter(filter.id)}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: filter.iconUri }}
              style={[styles.filterIcon, selectedFilter === filter.id ? { tintColor: '#FFFFFF' } : {}]}
            />
            <Text style={[styles.filterChipText, selectedFilter === filter.id && styles.filterChipTextSelected]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          renderItem={renderTaskCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyStateIcon}>
            <Image
              source={{
                uri:
                  activeTab === 'active'
                    ? 'https://img.icons8.com/ios-filled/48/D1D5DB/assignment.png'
                    : 'https://img.icons8.com/ios-filled/48/D1D5DB/checkmark--v1.png',
              }}
              style={{ width: 48, height: 48, resizeMode: 'contain' }}
            />
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
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/20/FFFFFF/plus-math.png' }}
              style={{ width: 20, height: 20, marginRight: 6 }}
            />
            <Text style={styles.emptyStateButtonText}>Post New Task</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#1E293B',
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  statNumber: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: isSmallScreen ? 11 : 12,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#2E3A59',
    elevation: 2,
    shadowColor: '#2E3A59',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  filterContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  filterChipSelected: {
    backgroundColor: '#2E3A59',
    borderColor: '#2E3A59',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  filterIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    borderLeftWidth: 4,
    position: 'relative',
  },
  priorityBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  taskHeader: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitleSection: {
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  categoryIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 4,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
    alignSelf: 'flex-start',
    maxWidth: 120,
    flexShrink: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginRight: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  skillText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  moreSkills: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
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
    gap: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  budgetText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#059669',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  urgentTime: {
    color: '#EF4444',
    fontWeight: '700',
  },
  responsesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  responsesText: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#F59E0B',
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  secondaryButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E3A59',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    gap: 6,
  },
  primaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footerIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  footerIconWhite: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  assigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 6,
  },
  assigneeIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  assigneeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyStateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E3A59',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
