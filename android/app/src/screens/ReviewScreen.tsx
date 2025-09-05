import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface ReviewScreenProps {
  taskId: string;
  revieweeId: string;
  revieweeName: string;
  revieweeProfileImage?: string;
  onComplete: (rating: number, comment: string) => void;
  onCancel: () => void;
}

export default function ReviewScreen({
  taskId,
  revieweeId,
  revieweeName,
  revieweeProfileImage,
  onComplete,
  onCancel,
}: ReviewScreenProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const ratingCategories = [
    { id: 'quality', label: 'Quality of Work', icon: 'https://img.icons8.com/ios-filled/24/4F46E5/star.png' },
    { id: 'communication', label: 'Communication', icon: 'https://img.icons8.com/ios-filled/24/10B981/chat.png' },
    { id: 'timeliness', label: 'Timeliness', icon: 'https://img.icons8.com/ios-filled/24/F59E0B/clock.png' },
    { id: 'professionalism', label: 'Professionalism', icon: 'https://img.icons8.com/ios-filled/24/8B5CF6/user.png' },
  ];

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting');
      return;
    }
    
    if (comment.trim().length < 10) {
      Alert.alert('Comment Required', 'Please write at least 10 characters in your review');
      return;
    }

    onComplete(rating, comment);
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Image
              source={{
                uri: star <= rating
                  ? 'https://img.icons8.com/ios-filled/40/F59E0B/star.png'
                  : 'https://img.icons8.com/ios/40/9CA3AF/star.png'
              }}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getRatingText = () => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Select Rating';
    }
  };

  const getRatingColor = () => {
    switch (rating) {
      case 1: return '#EF4444';
      case 2: return '#F59E0B';
      case 3: return '#10B981';
      case 4: return '#3B82F6';
      case 5: return '#8B5CF6';
      default: return '#9CA3AF';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Rate & Review</Text>
          <Text style={styles.headerSubtitle}>Help others by sharing your experience</Text>
        </View>

        {/* Reviewee Info */}
        <View style={styles.revieweeCard}>
          <Image
            source={{
              uri: revieweeProfileImage || 'https://img.icons8.com/ios-filled/60/9CA3AF/user.png'
            }}
            style={styles.revieweeImage}
          />
          <View style={styles.revieweeInfo}>
            <Text style={styles.revieweeName}>{revieweeName}</Text>
            <Text style={styles.revieweeRole}>Task Helper</Text>
          </View>
        </View>

        {/* Rating Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How was your experience?</Text>
          {renderStars()}
          <Text style={[styles.ratingText, { color: getRatingColor() }]}>
            {getRatingText()}
          </Text>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What stood out most?</Text>
          <View style={styles.categoriesGrid}>
            {ratingCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipSelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Image source={{ uri: category.icon }} style={styles.categoryIcon} />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextSelected
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Comment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Write a detailed review</Text>
          <Text style={styles.sectionSubtitle}>
            Share specific details about your experience to help other students
          </Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Describe your experience in detail..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.characterCount}>
            {comment.length}/500 characters
          </Text>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Review Tips</Text>
          <Text style={styles.tipText}>• Be specific about what went well</Text>
          <Text style={styles.tipText}>• Mention any areas for improvement</Text>
          <Text style={styles.tipText}>• Keep it constructive and helpful</Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Skip Review</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.submitButton,
            (rating === 0 || comment.trim().length < 10) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={rating === 0 || comment.trim().length < 10}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  revieweeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  revieweeImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  revieweeInfo: {
    flex: 1,
  },
  revieweeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  revieweeRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
  },
  star: {
    width: 40,
    height: 40,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  categoryIcon: {
    width: 20,
    height: 20,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  commentInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 8,
  },
  tipsCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 4,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
