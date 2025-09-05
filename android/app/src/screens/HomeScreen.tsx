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
} from 'react-native';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'academic', label: 'Academic', iconUri: 'https://img.icons8.com/ios-filled/40/4F46E5/school.png' },
  { id: 'delivery', label: 'Delivery', iconUri: 'https://img.icons8.com/ios-filled/40/D97706/delivery-dining.png' },
  { id: 'events', label: 'Events', iconUri: 'https://img.icons8.com/ios-filled/40/0891B2/event.png' },
  { id: 'practical', label: 'Practical', iconUri: 'https://img.icons8.com/ios-filled/40/7C2D92/tools.png' },
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

  // Filter recent tasks by searchText or category
  const filteredRecentTasks = RECENT_TASKS.filter(task =>
    task.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedCategory === 'all' || task.category === selectedCategory)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.appTitle}>College Vyapari</Text>
        <Text style={styles.tagLine}>"Where students meets hustles"</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks or helpers..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryBadge,
                  selectedCategory === cat.id && styles.categoryBadgeActive,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Image source={{ uri: cat.iconUri }} style={styles.categoryIcon} />
                <Text
                  style={[
                    styles.categoryLabel,
                    selectedCategory === cat.id && styles.categoryLabelActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Tasks */}
        <Text style={styles.sectionHeader}>Featured Tasks</Text>
        <FlatList
          horizontal
          data={FEATURED_TASKS}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.featuredCard}>
              <Text style={styles.featuredTitle}>{item.title}</Text>
              <Text style={styles.featuredBudget}>₹{item.budget}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingLeft: 20, paddingBottom: 10 }}
        />

        {/* Recent Tasks */}
        <Text style={styles.sectionHeader}>Recent Tasks</Text>
        <FlatList
          data={filteredRecentTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskBudget}>
                ₹{item.budget} {item.urgent ? '(Urgent)' : ''}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#2563EB' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  tagLine: {
    fontSize: 12,
    color: '#374151',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  searchContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 16,
    color: '#111827',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  categoryBadgeActive: {
    backgroundColor: '#2563EB',
  },
  categoryIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  categoryLabelActive: {
    color: '#fff',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  featuredCard: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: width * 0.6,
    justifyContent: 'center',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  featuredBudget: {
    fontSize: 16,
    fontWeight: '600',
    color: '#BBF7D0',
  },
  taskCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  taskBudget: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 4,
  },
});
