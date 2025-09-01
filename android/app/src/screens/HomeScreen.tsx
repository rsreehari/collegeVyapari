// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyTasks = [
  { id: '1', title: 'Math Assignment', budget: 300 },
  { id: '2', title: 'Lab Report', budget: 500 },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.intro}>Welcome to College Vyapari</Text>
        <Text style={styles.tagLine}>"Where students meets hustles"</Text>
        <Text style={styles.header}>Available Tasks</Text>
        <FlatList
          data={dummyTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} activeOpacity={0.8}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>₹{item.budget}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#2E3A59' },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
    alignItems: 'center' },

  intro: {
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#111827',
  },

  tagLine: {
    fontFamily: 'lucida grande, tahoma, verdana, arial, sans-serif',
    fontSize: 11,
    color: '#141823',
    marginBottom: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },

  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981', 
  },
});
