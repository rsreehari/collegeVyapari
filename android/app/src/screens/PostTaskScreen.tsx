import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    Dimensions,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 360;
const isTablet = width > 768;

export default function PostTaskScreen() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        budget: '',
        deadline: '',
        category: 'academic',
        priority: 'normal'
    });

    const [selectedCategory, setSelectedCategory] = useState('academic');
    const [selectedPriority, setSelectedPriority] = useState('normal');
    const [errors, setErrors] = useState({});

    // Improved categories with better icons and descriptions
    const categories = [
        { 
            id: 'academic', 
            label: 'Academic Help', 
            icon: 'school', 
            color: '#4F46E5',
            description: 'Study materials, tutoring'
        },
        { 
            id: 'assignment', 
            label: 'Assignment', 
            icon: 'assignment', 
            color: '#059669',
            description: 'Homework, projects'
        },
        { 
            id: 'notes', 
            label: 'Notes & Research', 
            icon: 'note-alt', 
            color: '#DC2626',
            description: 'Class notes, research help'
        },
        { 
            id: 'practical', 
            label: 'Practical Work', 
            icon: 'build', 
            color: '#7C2D92',
            description: 'Lab work, coding'
        },
        { 
            id: 'delivery', 
            label: 'Campus Delivery', 
            icon: 'local-shipping', 
            color: '#D97706',
            description: 'Food, books, supplies'
        },
        { 
            id: 'events', 
            label: 'Event Help', 
            icon: 'event', 
            color: '#0891B2',
            description: 'Photography, setup'
        }
    ];

    const priorities = [
        { id: 'low', label: 'Low Priority', color: '#059669' },
        { id: 'normal', label: 'Normal', color: '#D97706' },
        { id: 'high', label: 'Urgent', color: '#DC2626' }
    ];

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
        if (
            formData.budget &&
            (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0)
        ) {
            newErrors.budget = 'Budget must be a positive number';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            Alert.alert(
                'Success!',
                'Your task has been posted successfully.',
                [{ text: 'OK', onPress: resetForm }]
            );
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            subject: '',
            budget: '',
            deadline: '',
            category: 'academic',
            priority: 'normal'
        });
        setSelectedCategory('academic');
        setSelectedPriority('normal');
        setErrors({});
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#2E3A59" barStyle="light-content" />
            
            {/* Light Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
                    <Icon name="arrow-back" size={24} color="#2E3A59" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Post New Task</Text>
                <TouchableOpacity style={styles.helpButton} activeOpacity={0.7}>
                    <Icon name="help-outline" size={24} color="#2E3A59" />
                </TouchableOpacity>
            </View>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Task Information Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Icon name="edit" size={20} color="#2E3A59" />
                        <Text style={styles.cardTitle}>Task Details</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Task Title *</Text>
                        <TextInput
                            style={[styles.input, errors.title && styles.inputError]}
                            placeholder="What do you need help with?"
                            placeholderTextColor="#9CA3AF"
                            value={formData.title}
                            onChangeText={(text) => updateFormData('title', text)}
                            maxLength={80}
                        />
                        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
                        <Text style={styles.characterCount}>{formData.title.length}/80</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Description *</Text>
                        <TextInput
                            style={[styles.textArea, errors.description && styles.inputError]}
                            placeholder="Provide detailed information about your task..."
                            placeholderTextColor="#9CA3AF"
                            value={formData.description}
                            onChangeText={(text) => updateFormData('description', text)}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            maxLength={300}
                        />
                        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                        <Text style={styles.characterCount}>{formData.description.length}/300</Text>
                    </View>

                    <View style={[styles.inputGroup, styles.lastInputGroup]}>
                        <Text style={styles.label}>Subject/Course</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Mathematics, Computer Science"
                            placeholderTextColor="#9CA3AF"
                            value={formData.subject}
                            onChangeText={(text) => updateFormData('subject', text)}
                        />
                    </View>
                </View>

                {/* Improved Category Selection Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Icon name="category" size={20} color="#2E3A59" />
                        <Text style={styles.cardTitle}>Select Category</Text>
                    </View>
                    <Text style={styles.categorySubtitle}>Choose the type of task you need help with</Text>

                    <View style={styles.categoryContainer}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.categoryItem,
                                    selectedCategory === category.id && [
                                        styles.categoryItemSelected,
                                        { borderLeftColor: category.color }
                                    ]
                                ]}
                                onPress={() => {
                                    setSelectedCategory(category.id);
                                    updateFormData('category', category.id);
                                }}
                                activeOpacity={0.7}
                            >
                                <View style={styles.categoryContent}>
                                    <View style={[
                                        styles.categoryIconContainer,
                                        { backgroundColor: category.color + '15' }
                                    ]}>
                                        <Icon 
                                            name={category.icon} 
                                            size={22} 
                                            color={category.color} 
                                        />
                                    </View>
                                    
                                    <View style={styles.categoryTextContainer}>
                                        <Text style={[
                                            styles.categoryTitle,
                                            selectedCategory === category.id && styles.categoryTitleSelected
                                        ]}>
                                            {category.label}
                                        </Text>
                                        <Text style={styles.categoryDescription}>
                                            {category.description}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.categorySelector}>
                                    {selectedCategory === category.id ? (
                                        <View style={[styles.radioSelected, { backgroundColor: category.color }]}>
                                            <Icon name="check" size={14} color="#FFFFFF" />
                                        </View>
                                    ) : (
                                        <View style={styles.radioUnselected} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Budget & Timeline Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Icon name="attach-money" size={20} color="#2E3A59" />
                        <Text style={styles.cardTitle}>Budget & Timeline</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={styles.halfWidth}>
                            <Text style={styles.label}>Budget (₹) *</Text>
                            <TextInput
                                style={[styles.input, errors.budget && styles.inputError]}
                                placeholder="Amount"
                                placeholderTextColor="#9CA3AF"
                                value={formData.budget}
                                onChangeText={(text) => updateFormData('budget', text)}
                                keyboardType="numeric"
                            />
                            {errors.budget && <Text style={styles.errorText}>{errors.budget}</Text>}
                        </View>

                        <View style={styles.halfWidth}>
                            <Text style={styles.label}>Deadline</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="DD/MM/YYYY"
                                placeholderTextColor="#9CA3AF"
                                value={formData.deadline}
                                onChangeText={(text) => updateFormData('deadline', text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Priority Selection Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Icon name="priority-high" size={20} color="#2E3A59" />
                        <Text style={styles.cardTitle}>Priority Level</Text>
                    </View>

                    <View style={styles.priorityContainer}>
                        {priorities.map((priority) => (
                            <TouchableOpacity
                                key={priority.id}
                                style={[
                                    styles.priorityOption,
                                    selectedPriority === priority.id && styles.prioritySelected
                                ]}
                                onPress={() => {
                                    setSelectedPriority(priority.id);
                                    updateFormData('priority', priority.id);
                                }}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.priorityDot, { backgroundColor: priority.color }]} />
                                <Text style={[
                                    styles.priorityText,
                                    selectedPriority === priority.id && styles.priorityTextSelected
                                ]}>
                                    {priority.label}
                                </Text>
                                {selectedPriority === priority.id && (
                                    <Icon name="check-circle" size={20} color={priority.color} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionContainer}>
                    <TouchableOpacity 
                        style={styles.draftButton} 
                        activeOpacity={0.8}
                        onPress={resetForm}
                    >
                        <Icon name="save" size={18} color="#6B7280" />
                        <Text style={styles.draftButtonText}>Save Draft</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.submitButton} 
                        activeOpacity={0.8}
                        onPress={handleSubmit}
                    >
                        <Icon name="send" size={18} color="#FFFFFF" />
                        <Text style={styles.submitButtonText}>Post Task</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
    },

    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerTitle: {
        color: '#1F2937',
        fontSize: isTablet ? 22 : 20,
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 16,
    },

    helpButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        padding: isTablet ? 24 : 16,
        paddingBottom: 32,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: isTablet ? 24 : 20,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    cardTitle: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: '700',
        color: '#1F2937',
        marginLeft: 10,
    },

    inputGroup: {
        marginBottom: 20,
    },

    lastInputGroup: {
        marginBottom: 0,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1F2937',
        backgroundColor: '#FAFAFA',
        minHeight: 52,
    },

    inputError: {
        borderColor: '#EF4444',
        backgroundColor: '#FEF2F2',
    },

    textArea: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1F2937',
        backgroundColor: '#FAFAFA',
        height: isSmallScreen ? 100 : 120,
        textAlignVertical: 'top',
    },

    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 6,
        fontWeight: '500',
    },

    characterCount: {
        fontSize: 12,
        color: '#9CA3AF',
        textAlign: 'right',
        marginTop: 4,
    },

    // Improved Category Styles
    categorySubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 16,
        marginTop: -12,
    },

    categoryContainer: {
        gap: 12,
    },

    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderLeftWidth: 4,
        borderLeftColor: 'transparent',
    },

    categoryItemSelected: {
        backgroundColor: '#F8FAFF',
        borderColor: '#E0E7FF',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },

    categoryContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    categoryIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

    categoryTextContainer: {
        flex: 1,
    },

    categoryTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 2,
    },

    categoryTitleSelected: {
        color: '#1F2937',
    },

    categoryDescription: {
        fontSize: 13,
        color: '#9CA3AF',
        lineHeight: 18,
    },

    categorySelector: {
        marginLeft: 12,
    },

    radioSelected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    radioUnselected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        backgroundColor: '#FFFFFF',
    },

    rowContainer: {
        flexDirection: isTablet ? 'row' : 'row',
        justifyContent: 'space-between',
        gap: 12,
    },

    halfWidth: {
        flex: 1,
    },

    priorityContainer: {
        gap: 12,
    },

    priorityOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: 'transparent',
        minHeight: 56,
    },

    prioritySelected: {
        backgroundColor: '#EEF2FF',
        borderColor: '#4F46E5',
    },

    priorityDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
    },

    priorityText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280',
        flex: 1,
    },

    priorityTextSelected: {
        color: '#1F2937',
    },

    actionContainer: {
        flexDirection: isSmallScreen ? 'column' : 'row',
        gap: 12,
        marginTop: 8,
    },

    draftButton: {
        flex: isSmallScreen ? undefined : 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        elevation: 1,
        minHeight: 52,
    },

    draftButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280',
        marginLeft: 8,
    },

    submitButton: {
        flex: isSmallScreen ? undefined : 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E3A59',
        borderRadius: 12,
        paddingVertical: 16,
        elevation: 3,
        shadowColor: '#2E3A59',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        minHeight: 52,
    },

    submitButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginLeft: 8,
    },
});
