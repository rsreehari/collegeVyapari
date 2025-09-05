import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { Task, TaskStatus } from '../types/task';

const { width } = Dimensions.get('window');

interface TaskCompletionScreenProps {
  task: Task;
  userRole: 'poster' | 'doer';
  onComplete: (completionData: TaskCompletionData) => void;
  onCancel: () => void;
}

interface TaskCompletionData {
  status: TaskStatus;
  completionProof?: string;
  notes?: string;
  rating?: number;
  review?: string;
}

export default function TaskCompletionScreen({
  task,
  userRole,
  onComplete,
  onCancel,
}: TaskCompletionScreenProps) {
  const [completionProof, setCompletionProof] = useState('');
  const [completionNotes, setCompletionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMarkComplete = async () => {
    if (userRole === 'doer') {
      // Task doer marking task as complete
      setIsSubmitting(true);
      
      try {
        await onComplete({
          status: 'completed',
          completionProof,
          notes: completionNotes,
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to mark task as complete');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Task poster confirming completion
      Alert.alert(
        'Confirm Completion',
        'Are you satisfied with the completed work?',
        [
          {
            text: 'Not Satisfied',
            style: 'destructive',
            onPress: () => {
              Alert.alert(
                'Report Issue',
                'Please describe the issue with the completed work',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Report',
                    onPress: () => {
                      onComplete({
                        status: 'disputed',
                        notes: 'Work quality not satisfactory',
                      });
                    },
                  },
                ]
              );
            },
          },
          {
            text: 'Satisfied',
            onPress: () => {
              onComplete({
                status: 'completed',
                notes: 'Work completed satisfactorily',
              });
            },
          },
        ]
      );
    }
  };

  const renderCompletionProof = () => {
    if (userRole === 'doer') {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completion Proof</Text>
          <Text style={styles.sectionSubtitle}>
            Provide evidence that the task has been completed
          </Text>
          
          <TouchableOpacity style={styles.proofButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/24/4F46E5/camera.png' }}
              style={styles.proofIcon}
            />
            <Text style={styles.proofButtonText}>Take Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.proofButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/24/10B981/file.png' }}
              style={styles.proofIcon}
            />
            <Text style={styles.proofButtonText}>Upload File</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.proofButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/24/F59E0B/link.png' }}
              style={styles.proofIcon}
            />
            <Text style={styles.proofButtonText}>Add Link</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderTaskDetails = () => {
    return (
      <View style={styles.taskCard}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
        
        <View style={styles.taskMeta}>
          <View style={styles.metaItem}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/16/6B7280/money.png' }}
              style={styles.metaIcon}
            />
            <Text style={styles.metaText}>₹{task.budget}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/16/6B7280/calendar.png' }}
              style={styles.metaIcon}
            />
            <Text style={styles.metaText}>
              Due: {new Date(task.deadline).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/16/6B7280/tag.png' }}
              style={styles.metaIcon}
            />
            <Text style={styles.metaText}>{task.category}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCompletionNotes = () => {
    if (userRole === 'doer') {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completion Notes</Text>
          <Text style={styles.sectionSubtitle}>
            Add any additional details about the completed work
          </Text>
          <TouchableOpacity style={styles.notesButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/20/4F46E5/edit.png' }}
              style={styles.notesIcon}
            />
            <Text style={styles.notesButtonText}>Add Notes</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderConfirmationSection = () => {
    if (userRole === 'poster') {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Review Completed Work</Text>
          <Text style={styles.sectionSubtitle}>
            Please review the completed work and confirm if you're satisfied
          </Text>
          
          <View style={styles.confirmationCard}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/48/10B981/checkmark.png' }}
              style={styles.confirmationIcon}
            />
            <Text style={styles.confirmationText}>
              The task helper has marked this task as completed
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {userRole === 'doer' ? 'Mark Task Complete' : 'Review Completion'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {userRole === 'doer' 
              ? 'Provide proof and details of your completed work'
              : 'Review the completed work and confirm satisfaction'
            }
          </Text>
        </View>

        {/* Task Details */}
        {renderTaskDetails()}

        {/* Completion Proof (for doers) */}
        {renderCompletionProof()}

        {/* Completion Notes (for doers) */}
        {renderCompletionNotes()}

        {/* Confirmation Section (for posters) */}
        {renderConfirmationSection()}

        {/* Guidelines */}
        <View style={styles.guidelinesCard}>
          <Text style={styles.guidelinesTitle}>📋 Completion Guidelines</Text>
          {userRole === 'doer' ? (
            <>
              <Text style={styles.guidelineText}>• Ensure all requirements are met</Text>
              <Text style={styles.guidelineText}>• Provide clear proof of completion</Text>
              <Text style={styles.guidelineText}>• Be honest about any limitations</Text>
              <Text style={styles.guidelineText}>• Communicate any issues promptly</Text>
            </>
          ) : (
            <>
              <Text style={styles.guidelineText}>• Review the work thoroughly</Text>
              <Text style={styles.guidelineText}>• Check if requirements are met</Text>
              <Text style={styles.guidelineText}>• Provide constructive feedback</Text>
              <Text style={styles.guidelineText}>• Rate and review fairly</Text>
            </>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.completeButton,
            isSubmitting && styles.completeButtonDisabled
          ]}
          onPress={handleMarkComplete}
          disabled={isSubmitting}
        >
          <Text style={styles.completeButtonText}>
            {isSubmitting 
              ? 'Processing...' 
              : userRole === 'doer' 
                ? 'Mark Complete' 
                : 'Confirm Completion'
            }
          </Text>
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
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  taskMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  metaIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  proofButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  proofIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  proofButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  notesButton: {
    backgroundColor: '#F8FAFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  notesIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  notesButtonText: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '500',
  },
  confirmationCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  confirmationIcon: {
    width: 48,
    height: 48,
    marginBottom: 12,
  },
  confirmationText: {
    fontSize: 16,
    color: '#065F46',
    fontWeight: '500',
    textAlign: 'center',
  },
  guidelinesCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: '#92400E',
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
  completeButton: {
    flex: 2,
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  completeButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  completeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
