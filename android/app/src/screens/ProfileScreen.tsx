import React, { useState, useCallback } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
    RefreshControl,
    Dimensions,
    Animated,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows, Layout, CommonStyles } from '../styles/DesignSystem';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'R Sreehari',
        title: 'Senior, Computer Science',
        college: 'National Institute of Technology',
        tasksCompleted: 125,
        rating: 4.8,
        onTimePercentage: 95,
        points: 1850,
        level: 6,
        joinDate: '2023-08-15',
        skills: ['React Native', 'JavaScript', 'Python', 'Machine Learning'],
        achievements: ['Task Master', 'Early Bird', 'Helper Hero'],
    });

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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setProfileData(prev => ({
                ...prev,
                tasksCompleted: prev.tasksCompleted + 1
            }));
            setRefreshing(false);
        }, 2000);
    }, []);

    const menuItems = [
        { id: 'wallet', label: 'My Wallet', icon: '💰', color: Colors.success },
        { id: 'settings', label: 'Settings', icon: '⚙️', color: Colors.textSecondary },
        { id: 'help', label: 'Help & Support', icon: '❓', color: Colors.info },
        { id: 'about', label: 'About', icon: 'ℹ️', color: Colors.textSecondary },
        { id: 'logout', label: 'Logout', icon: '🚪', color: Colors.error },
    ];

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
                <Text style={styles.headerTitle}>👤 Profile</Text>
            </Animated.View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Profile Card */}
                <Animated.View 
                    style={[
                        styles.profileCard,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImage}>
                            <Text style={styles.profileInitial}>{profileData.name.charAt(0)}</Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedIcon}>✅</Text>
                        </View>
                    </View>
                    
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{profileData.name}</Text>
                        <Text style={styles.profileTitle}>{profileData.title}</Text>
                        <Text style={styles.profileCollege}>{profileData.college}</Text>
                        
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingIcon}>⭐</Text>
                            <Text style={styles.ratingText}>{profileData.rating}</Text>
                            <Text style={styles.ratingCount}>({profileData.tasksCompleted} reviews)</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Stats Cards */}
                <Animated.View 
                    style={[
                        styles.statsContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>📋</Text>
                            <Text style={styles.statValue}>{profileData.tasksCompleted}</Text>
                            <Text style={styles.statLabel}>Tasks Completed</Text>
                        </View>
                        
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>💰</Text>
                            <Text style={styles.statValue}>{profileData.points}</Text>
                            <Text style={styles.statLabel}>Points Earned</Text>
                        </View>
                        
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>🎯</Text>
                            <Text style={styles.statValue}>{profileData.onTimePercentage}%</Text>
                            <Text style={styles.statLabel}>On Time</Text>
                        </View>
                        
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>🏆</Text>
                            <Text style={styles.statValue}>L{profileData.level}</Text>
                            <Text style={styles.statLabel}>Level</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Skills Section */}
                <Animated.View 
                    style={[
                        styles.section,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.sectionTitle}>🛠️ Skills</Text>
                    <View style={styles.skillsContainer}>
                        {profileData.skills.map((skill, index) => (
                            <View key={index} style={styles.skillTag}>
                                <Text style={styles.skillText}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </Animated.View>

                {/* Achievements Section */}
                <Animated.View 
                    style={[
                        styles.section,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.sectionTitle}>🏆 Achievements</Text>
                    <View style={styles.achievementsContainer}>
                        {profileData.achievements.map((achievement, index) => (
                            <View key={index} style={styles.achievementCard}>
                                <Text style={styles.achievementIcon}>🏅</Text>
                                <Text style={styles.achievementText}>{achievement}</Text>
                            </View>
                        ))}
                    </View>
                </Animated.View>

                {/* Menu Items */}
                <Animated.View 
                    style={[
                        styles.menuContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {menuItems.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                            </View>
                            <Text style={styles.menuArrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </Animated.View>

                {/* Join Date */}
                <Animated.View 
                    style={[
                        styles.joinDateContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.joinDateText}>
                        Member since {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                        })}
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
    profileCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        alignItems: 'center',
        marginBottom: Spacing.xl,
        ...Shadows.md,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: Spacing.lg,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.interactive,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.lg,
    },
    profileInitial: {
        color: Colors.accent,
        fontSize: Typography.fontSize['3xl'],
        fontWeight: Typography.fontWeight.bold,
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Colors.success,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.accent,
    },
    verifiedIcon: {
        fontSize: Typography.fontSize.sm,
    },
    profileInfo: {
        alignItems: 'center',
    },
    profileName: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    profileTitle: {
        fontSize: Typography.fontSize.base,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
    },
    profileCollege: {
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        textAlign: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingIcon: {
        fontSize: Typography.fontSize.base,
        marginRight: Spacing.xs,
    },
    ratingText: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.warning,
        marginRight: Spacing.xs,
    },
    ratingCount: {
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
    },
    statsContainer: {
        marginBottom: Spacing.xl,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: Spacing.md,
    },
    statCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        alignItems: 'center',
        width: '48%',
        ...Shadows.sm,
    },
    statIcon: {
        fontSize: Typography.fontSize['2xl'],
        marginBottom: Spacing.sm,
    },
    statValue: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    statLabel: {
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
        textAlign: 'center',
        fontWeight: Typography.fontWeight.medium,
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
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    skillTag: {
        backgroundColor: Colors.surfaceSecondary,
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    skillText: {
        fontSize: Typography.fontSize.sm,
        color: Colors.textPrimary,
        fontWeight: Typography.fontWeight.medium,
    },
    achievementsContainer: {
        gap: Spacing.md,
    },
    achievementCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        ...Shadows.sm,
    },
    achievementIcon: {
        fontSize: Typography.fontSize.lg,
        marginRight: Spacing.lg,
    },
    achievementText: {
        fontSize: Typography.fontSize.base,
        color: Colors.textPrimary,
        fontWeight: Typography.fontWeight.medium,
    },
    menuContainer: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.xl,
        ...Shadows.sm,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.surfaceSecondary,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: Typography.fontSize.lg,
        marginRight: Spacing.lg,
    },
    menuLabel: {
        fontSize: Typography.fontSize.base,
        color: Colors.textPrimary,
        fontWeight: Typography.fontWeight.medium,
    },
    menuArrow: {
        fontSize: Typography.fontSize.xl,
        color: Colors.textSecondary,
        fontWeight: Typography.fontWeight.bold,
    },
    joinDateContainer: {
        alignItems: 'center',
        paddingVertical: Spacing.lg,
    },
    joinDateText: {
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
        fontStyle: 'italic',
    },
});