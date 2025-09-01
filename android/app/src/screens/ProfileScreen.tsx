import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#f8f9fa" barStyle="dark-content" />
            
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <Text style={styles.settingsIcon}>⚙️</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                            }}
                            style={styles.profileImage}
                        />
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusIcon}>✓</Text>
                        </View>
                    </View>
                    
                    <Text style={styles.userName}>R Sreehari</Text>
                    <Text style={styles.userYear}>Senior, Computer Science</Text>
                    <Text style={styles.university}>Your College Name</Text>
                </View>

                {/* Performance Dashboard */}
                <View style={styles.dashboardCard}>
                    <Text style={styles.sectionTitle}>Performance Dashboard</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>125</Text>
                            <Text style={styles.statLabel}>Tasks Done</Text>
                        </View>
                        <View style={styles.statItem}>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.statNumber}>4.8</Text>
                                <Text style={styles.starIcon}>⭐</Text>
                            </View>
                            <Text style={styles.statLabel}>Peer Rating</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>95%</Text>
                            <Text style={styles.statLabel}>On-Time</Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsGrid}>
                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Text style={styles.actionEmoji}>📝</Text>
                        </View>
                        <Text style={styles.actionText}>Post Task</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Text style={styles.actionEmoji}>🔍</Text>
                        </View>
                        <Text style={styles.actionText}>Find Help</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Text style={styles.actionEmoji}>👥</Text>
                        </View>
                        <Text style={styles.actionText}>Study Group</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Text style={styles.actionEmoji}>📚</Text>
                        </View>
                        <Text style={styles.actionText}>Subjects</Text>
                    </TouchableOpacity>
                </View>

                {/* Weekly Progress */}
                <View style={styles.progressCard}>
                    <Text style={styles.sectionTitle}>Weekly Progress</Text>
                    
                    <View style={styles.progressItem}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressLabel}>Tasks Completed</Text>
                            <Text style={styles.progressValue}>15/20</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: '75%' }]} />
                        </View>
                    </View>

                    <View style={styles.progressItem}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressLabel}>Goals Met</Text>
                            <Text style={styles.progressValue}>3/4</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBarGreen, { width: '75%' }]} />
                        </View>
                    </View>
                </View>

                {/* Achievements */}
                <View style={styles.achievementsCard}>
                    <Text style={styles.sectionTitle}>Achievements</Text>
                    <View style={styles.achievementsGrid}>
                        <View style={styles.achievementBadge}>
                            <Text style={styles.achievementIcon}>🏆</Text>
                        </View>
                        <View style={styles.achievementBadgeInactive}>
                            <Text style={styles.achievementIconInactive}>📚</Text>
                        </View>
                        <View style={styles.achievementBadgeInactive}>
                            <Text style={styles.achievementIconInactive}>⚡</Text>
                        </View>
                        <View style={styles.achievementBadge}>
                            <Text style={styles.achievementIcon}>🎯</Text>
                        </View>
                    </View>
                </View>

                {/* Settings Menu */}
                <View style={styles.settingsCard}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Profile Settings</Text>
                        <Text style={styles.settingArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Notification Preferences</Text>
                        <Text style={styles.settingArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingText}>Subject Expertise</Text>
                        <Text style={styles.settingArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.settingItem, styles.lastSettingItem]}>
                        <Text style={styles.settingText}>Privacy & Security</Text>
                        <Text style={styles.settingArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* Bottom spacing */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#f8f9fa',
    },
    
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    
    settingsButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    
    settingsIcon: {
        fontSize: 20,
    },
    
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    
    // Profile Card
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    
    profileImageContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
    },
    
    statusBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#6366f1',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#ffffff',
    },
    
    statusIcon: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    
    userYear: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 2,
    },
    
    university: {
        fontSize: 14,
        color: '#9ca3af',
    },

    // Dashboard Card
    dashboardCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 16,
    },

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    statItem: {
        alignItems: 'center',
        flex: 1,
    },

    statNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3b82f6',
        marginBottom: 4,
    },

    statLabel: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },

    starIcon: {
        fontSize: 20,
        marginLeft: 4,
    },

    // Action Buttons Grid
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },

    actionButton: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        width: '48%',
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    actionEmoji: {
        fontSize: 24,
    },

    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        textAlign: 'center',
    },

    // Progress Card
    progressCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    progressItem: {
        marginBottom: 20,
    },

    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    progressLabel: {
        fontSize: 14,
        color: '#6b7280',
    },

    progressValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
    },

    progressBarContainer: {
        height: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        overflow: 'hidden',
    },

    progressBar: {
        height: '100%',
        backgroundColor: '#3b82f6',
        borderRadius: 4,
    },

    progressBarGreen: {
        height: '100%',
        backgroundColor: '#10b981',
        borderRadius: 4,
    },

    // Achievements
    achievementsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    achievementsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    achievementBadge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1f2937',
        justifyContent: 'center',
        alignItems: 'center',
    },

    achievementBadgeInactive: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    achievementIcon: {
        fontSize: 24,
    },

    achievementIconInactive: {
        fontSize: 24,
        opacity: 0.4,
    },

    // Settings Card
    settingsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 0,
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
    },

    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },

    lastSettingItem: {
        borderBottomWidth: 0,
    },

    settingText: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '500',
    },

    settingArrow: {
        fontSize: 20,
        color: '#9ca3af',
        fontWeight: 'bold',
    },
});
