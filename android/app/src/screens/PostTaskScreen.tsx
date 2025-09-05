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
    Animated,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows, Layout, CommonStyles } from '../styles/DesignSystem';

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
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Categories with emojis and colors
    const categories = [
        {
            id: 'academic',
            label: 'Academic',
            icon: '📚',
            color: Colors.interactive
        },
        {
            id: 'assignment',
            label: 'Assignment',
            icon: '📝',
            color: Colors.success
        },
        {
            id: 'notes',
            label: 'Notes',
            icon: '📄',
            color: Colors.warning
        },
        {
            id: 'practical',
            label: 'Practical',
            icon: '🔧',
            color: '#8B5CF6'
        },
        {
            id: 'delivery',
            label: 'Delivery',
            icon: '🚚',
            color: '#F97316'
        },
        {
            id: 'events',
            label: 'Events',
            icon: '🎉',
            color: Colors.info
        }
    ];

    const priorities = [
        { id: 'low', label: 'Low', color: Colors.success, icon: '🟢' },
        { id: 'normal', label: 'Normal', color: Colors.warning, icon: '🟡' },
        { id: 'high', label: 'Urgent', color: Colors.error, icon: '🔴' }
    ];

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
        if (formData.budget && isNaN(Number(formData.budget))) newErrors.budget = 'Budget must be a number';
        if (formData.budget && Number(formData.budget) < 10) newErrors.budget = 'Minimum budget is ₹10';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateFormData = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString('en-GB');
            updateFormData('deadline', formattedDate);
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert(
                'Success! 🎉',
                'Your task has been posted successfully! Students can now apply to help you.',
                [{ text: 'OK', onPress: () => resetForm() }]
            );
        }, 2000);
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
                <Text style={styles.headerTitle}>Post New Task</Text>
            </Animated.View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Task Information */}
                <Animated.View 
                    style={[
                        styles.section,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.sectionTitle}>📝 Task Details</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={[styles.input, errors.title && styles.inputError]}
                            placeholder="What do you need help with?"
                            placeholderTextColor={Colors.textTertiary}
                            value={formData.title}
                            onChangeText={(text) => updateFormData('title', text)}
                            maxLength={80}
                        />
                        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.textArea, errors.description && styles.inputError]}
                            placeholder="Brief description of your task..."
                            placeholderTextColor={Colors.textTertiary}
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
                                style={styles.input}
                                placeholder="e.g., Math"
                                placeholderTextColor={Colors.textTertiary}
                                value={formData.subject}
                                onChangeText={(text) => updateFormData('subject', text)}
                            />
                        </View>

                        <View style={styles.halfWidth}>
                            <Text style={styles.label}>Budget (₹)</Text>
                            <TextInput
                                style={[styles.input, errors.budget && styles.inputError]}
                                placeholder="Amount"
                                placeholderTextColor={Colors.textTertiary}
                                value={formData.budget}
                                onChangeText={(text) => updateFormData('budget', text)}
                                keyboardType="numeric"
                            />
                            {errors.budget && <Text style={styles.errorText}>{errors.budget}</Text>}
                        </View>
                    </View>
                </Animated.View>

                {/* Category Selection */}
                <Animated.View 
                    style={[
                        styles.section,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.sectionTitle}>🏷️ Category</Text>
                    
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
                                    { backgroundColor: selectedCategory === category.id ? category.color : Colors.surfaceSecondary }
                                ]}>
                                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                                </View>
                                <Text style={[
                                    styles.categoryLabel,
                                    selectedCategory === category.id && { color: category.color }
                                ]}>
                                    {category.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>

                {/* Priority Selection */}
                <Animated.View 
                    style={[
                        styles.section,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.sectionTitle}>⚡ Priority</Text>
                    
                    <View style={styles.priorityContainer}>
                        {priorities.map((priority) => (
                            <TouchableOpacity
                                key={priority.id}
                                style={[
                                    styles.priorityCard,
                                    selectedPriority === priority.id && [
                                        styles.priorityCardSelected,
                                        { borderColor: priority.color }
                                    ]
                                ]}
                                onPress={() => {
                                    setSelectedPriority(priority.id);
                                    updateFormData('priority', priority.id);
                                }}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.priorityIcon}>{priority.icon}</Text>
                                <Text style={[
                                    styles.priorityLabel,
                                    selectedPriority === priority.id && { color: priority.color }
                                ]}>
                                    {priority.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>

                {/* Deadline Selection */}
                <Animated.View 
                    style={[
                        styles.section,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.sectionTitle}>📅 Deadline</Text>
                    
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDatePicker(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.dateButtonText}>
                            {formData.deadline ? formData.deadline : 'Select deadline'}
                        </Text>
                        <Text style={styles.dateButtonIcon}>📅</Text>
                    </TouchableOpacity>
                    
                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </Animated.View>

                {/* Submit Button */}
                <Animated.View 
                    style={[
                        styles.submitSection,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.submitButtonText}>
                            {isSubmitting ? 'Posting Task...' : '🚀 Post Task'}
                        </Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.submitNote}>
                        💡 Your task will be visible to verified students in your college
                    </Text>
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Layout.screenPadding,
        paddingBottom: Spacing['6xl'],
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.lg,
    },
    inputGroup: {
        marginBottom: Spacing.lg,
    },
    label: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    input: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        color: Colors.textPrimary,
        fontSize: Typography.fontSize.base,
        ...Layout.inputPadding,
    },
    inputError: {
        borderColor: Colors.error,
    },
    textArea: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        color: Colors.textPrimary,
        fontSize: Typography.fontSize.base,
        ...Layout.inputPadding,
        minHeight: 80,
    },
    errorText: {
        fontSize: Typography.fontSize.sm,
        color: Colors.error,
        marginTop: Spacing.xs,
    },
    characterCount: {
        fontSize: Typography.fontSize.xs,
        color: Colors.textSecondary,
        textAlign: 'right',
        marginTop: Spacing.xs,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.md,
    },
    halfWidth: {
        flex: 1,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: Spacing.md,
    },
    categoryCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        alignItems: 'center',
        width: '30%',
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadows.sm,
    },
    categoryCardSelected: {
        backgroundColor: Colors.surfaceSecondary,
        ...Shadows.md,
    },
    categoryIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    categoryIcon: {
        fontSize: Typography.fontSize.lg,
    },
    categoryLabel: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.md,
    },
    priorityCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadows.sm,
    },
    priorityCardSelected: {
        backgroundColor: Colors.surfaceSecondary,
        ...Shadows.md,
    },
    priorityIcon: {
        fontSize: Typography.fontSize.lg,
        marginBottom: Spacing.sm,
    },
    priorityLabel: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    dateButton: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Shadows.sm,
    },
    dateButtonText: {
        fontSize: Typography.fontSize.base,
        color: Colors.textPrimary,
        fontWeight: Typography.fontWeight.medium,
    },
    dateButtonIcon: {
        fontSize: Typography.fontSize.lg,
    },
    submitSection: {
        marginTop: Spacing.xl,
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: Colors.interactive,
        borderRadius: BorderRadius.lg,
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing['3xl'],
        alignItems: 'center',
        marginBottom: Spacing.lg,
        ...Shadows.md,
    },
    submitButtonDisabled: {
        backgroundColor: Colors.interactiveDisabled,
    },
    submitButtonText: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.accent,
    },
    submitNote: {
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
    },
});