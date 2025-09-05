import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
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
    Alert,
    Image
} from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 360;
const isTablet = width > 768;

type FormData = {
    title: string;
    description: string;
    subject: string;
    budget: string;
    deadline: string;
    category: string;
    priority: string;
};

type FormErrors = {
    title?: string;
    description?: string;
    subject?: string;
    budget?: string;
    deadline?: string;
    category?: string;
    priority?: string;
};

export default function PostTaskScreen() {
    const [formData, setFormData] = useState<FormData>({
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
    const [errors, setErrors] = useState<FormErrors>({});
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Simplified categories with minimal design
    const categories = [
        {
            id: 'academic',
            label: 'Academic',
            iconUri: 'https://img.icons8.com/ios-filled/20/6366F1/school.png',
            color: '#6366F1'
        },
        {
            id: 'assignment',
            label: 'Assignment',
            iconUri: 'https://img.icons8.com/ios-filled/20/10B981/assignment.png',
            color: '#10B981'
        },
        {
            id: 'notes',
            label: 'Notes',
            iconUri: 'https://img.icons8.com/ios-filled/20/F59E0B/note.png',
            color: '#F59E0B'
        },
        {
            id: 'practical',
            label: 'Practical',
            iconUri: 'https://img.icons8.com/ios-filled/20/8B5CF6/building.png',
            color: '#8B5CF6'
        },
        {
            id: 'delivery',
            label: 'Delivery',
            iconUri: 'https://img.icons8.com/ios-filled/20/F97316/delivery.png',
            color: '#F97316'
        },
        {
            id: 'events',
            label: 'Events',
            iconUri: 'https://img.icons8.com/ios-filled/20/06B6D4/event.png',
            color: '#06B6D4'
        }
    ];

    const priorities = [
        { id: 'low', label: 'Low', color: '#10B981' },
        { id: 'normal', label: 'Normal', color: '#F59E0B' },
        { id: 'high', label: 'Urgent', color: '#EF4444' }
    ];

    const validateForm = () => {
        const newErrors: FormErrors = {};

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

    const updateFormData = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            // Format date as DD/MM/YY
            const day = selectedDate.getDate().toString().padStart(2, '0');
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const year = selectedDate.getFullYear().toString().slice(-2);
            const formatted = `${day}/${month}/${year}`;
            updateFormData('deadline', formatted);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

            {/* Minimal Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/ios-glyphs/20/1F2937/left.png' }}
                        style={styles.headerIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Post Task</Text>
                <View style={styles.spacer} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Task Information - Compact */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Task Details</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={[styles.inputCompact, errors.title && styles.inputError]}
                            placeholder="What do you need help with?"
                            placeholderTextColor="#9CA3AF"
                            value={formData.title}
                            onChangeText={(text) => updateFormData('title', text)}
                            maxLength={80}
                        />
                        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.textAreaCompact, errors.description && styles.inputError]}
                            placeholder="Brief description of your task..."
                            placeholderTextColor="#9CA3AF"
                            value={formData.description}
                            onChangeText={(text) => updateFormData('description', text)}
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                            maxLength={200}
                        />
                        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                        <Text style={styles.characterCount}>{formData.description.length}/200</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={styles.halfWidth}>
                            <Text style={styles.label}>Subject</Text>
                            <TextInput
                                style={styles.inputCompact}
                                placeholder="e.g., Math"
                                placeholderTextColor="#9CA3AF"
                                value={formData.subject}
                                onChangeText={(text) => updateFormData('subject', text)}
                            />
                        </View>

                        <View style={styles.halfWidth}>
                            <Text style={styles.label}>Budget (₹)</Text>
                            <TextInput
                                style={[styles.inputCompact, errors.budget && styles.inputError]}
                                placeholder="Amount"
                                placeholderTextColor="#9CA3AF"
                                value={formData.budget}
                                onChangeText={(text) => updateFormData('budget', text)}
                                keyboardType="numeric"
                            />
                            {errors.budget && <Text style={styles.errorText}>{errors.budget}</Text>}
                        </View>
                    </View>
                </View>

                {/* Category Selection - Minimal Grid */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Category</Text>
                    
                    <View style={styles.categoryGrid}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.categoryCard,
                                    selectedCategory === category.id && [
                                        styles.categoryCardSelected,
                                        { borderColor: category.color }
                                    ]
                                ]}
                                onPress={() => {
                                    setSelectedCategory(category.id);
                                    updateFormData('category', category.id);
                                }}
                                activeOpacity={0.7}
                            >
                                <View style={[
                                    styles.categoryIconWrapper,
                                    { backgroundColor: selectedCategory === category.id ? category.color : '#F3F4F6' }
                                ]}>
                                    <Image
                                        source={{ 
                                            uri: selectedCategory === category.id ? 
                                                category.iconUri.replace(category.color.slice(1), 'FFFFFF') : 
                                                category.iconUri.replace(category.color.slice(1), '9CA3AF')
                                        }}
                                        style={styles.categoryIconSmall}
                                    />
                                </View>
                                <Text style={[
                                    styles.categoryLabel,
                                    selectedCategory === category.id && { color: category.color, fontWeight: '600' }
                                ]}>
                                    {category.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Priority & Deadline - Column, Centered, with Date Picker */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Priority & Deadline</Text>
                    <View style={styles.columnCenterContainer}>
                        <View style={styles.priorityContainerColumn}>
                            {priorities.map((priority) => (
                                <TouchableOpacity
                                    key={priority.id}
                                    style={[
                                        styles.priorityChip,
                                        selectedPriority === priority.id && [
                                            styles.priorityChipSelected,
                                            { backgroundColor: priority.color + '15', borderColor: priority.color }
                                        ]
                                    ]}
                                    onPress={() => {
                                        setSelectedPriority(priority.id);
                                        updateFormData('priority', priority.id);
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.priorityDot, { backgroundColor: priority.color }]} />
                                    <Text style={[
                                        styles.priorityLabel,
                                        selectedPriority === priority.id && { 
                                            color: priority.color,
                                            fontWeight: '600'
                                        }
                                    ]}>
                                        {priority.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.deadlineContainerColumn}>
                            <Text style={styles.label}>Deadline</Text>
                            <TouchableOpacity
                                style={[styles.inputCompact, { justifyContent: 'center' }]}
                                onPress={() => setShowDatePicker(true)}
                                activeOpacity={0.7}
                            >
                                <Text style={{ color: formData.deadline ? '#1F2937' : '#9CA3AF', fontSize: 15 }}>
                                    {formData.deadline || 'Select date'}
                                </Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={formData.deadline ? new Date(`20${formData.deadline.split('/')[2]}/${formData.deadline.split('/')[1]}/${formData.deadline.split('/')[0]}`) : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                            )}
                        </View>
                    </View>
                </View>

                {/* Action Button - Single CTA */}
                <TouchableOpacity
                    style={styles.submitButton}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Post Task</Text>
                </TouchableOpacity>

                {/* Save Draft - Minimal Link */}
                <TouchableOpacity
                    style={styles.draftLink}
                    activeOpacity={0.7}
                    onPress={resetForm}
                >
                    <Text style={styles.draftLinkText}>Save as Draft</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },

    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },

    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerTitle: {
        color: '#1F2937',
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 16,
    },

    spacer: {
        width: 36,
    },

    headerIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    section: {
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 16,
    },

    inputGroup: {
        marginBottom: 16,
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        marginBottom: 6,
    },

    inputCompact: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        color: '#1F2937',
        backgroundColor: '#FFFFFF',
        minHeight: 44,
    },

    inputError: {
        borderColor: '#EF4444',
        backgroundColor: '#FEF2F2',
    },

    textAreaCompact: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        color: '#1F2937',
        backgroundColor: '#FFFFFF',
        height: 80,
        textAlignVertical: 'top',
    },

    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
    },

    characterCount: {
        fontSize: 11,
        color: '#9CA3AF',
        textAlign: 'right',
        marginTop: 4,
    },

    rowContainer: {
        flexDirection: 'row',
        gap: 12,
    },

    halfWidth: {
        flex: 1,
    },

    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },

    categoryCard: {
        width: (width - 60) / 3, // 3 columns with proper spacing
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#F3F4F6',
    },

    categoryCardSelected: {
        backgroundColor: '#FAFAFA',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },

    categoryIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },

    categoryIconSmall: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },

    categoryLabel: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
        fontWeight: '500',
    },

    // Column-wise, centered containaer for priority & deadline
    columnCenterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
    },

    priorityContainerColumn: {
        width: '100%',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },

    deadlineContainerColumn: {
        width: '100%',
        alignItems: 'center',
    },

    priorityChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        minHeight: 36,
    },

    priorityChipSelected: {
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },

    priorityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },

    priorityLabel: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },

    submitButton: {
        backgroundColor: '#1F2937',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        elevation: 2,
        shadowColor: '#1F2937',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    draftLink: {
        alignItems: 'center',
        paddingVertical: 12,
        marginTop: 8,
    },

    draftLinkText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
});