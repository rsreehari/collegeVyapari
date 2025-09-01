import React, { useState, useCallback } from 'react';
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
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 16;
const CARD_PADDING = 20;

export default function ProfileScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#f8f9fa" barStyle="dark-content" />
            
            {/* Optimized Header - 44px min touch target */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
                        <Icon name="share" size={22} color="#1a1a1a" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
                        <Icon name="settings" size={22} color="#1a1a1a" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Profile Card - Improved Visual Hierarchy */}
                <View style={styles.profileCard}>
                    <View style={styles.profileImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                            }}
                            style={styles.profileImage}
                        />
                        <View style={styles.verifiedBadge}>
                            <Icon name="verified" size={16} color="#ffffff" />
                        </View>
                    </View>
                    
                    <Text style={styles.userName}>R Sreehari</Text>
                    <Text style={styles.userTitle}>Senior, Computer Science</Text>
                    <Text style={styles.userCollege}>National Institute of Technology</Text>
                    
                    <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                        <Icon name="edit" size={16} color="#3b82f6" />
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Performance Dashboard - Perfect Alignment */}
                <View style={styles.dashboardCard}>
                    <Text style={styles.sectionTitle}>Performance Dashboard</Text>
                    
                    <View style={styles.statsGrid}>
                        <View style={styles.statBox}>
                            <View style={styles.statIconWrapper}>
                                <Icon name="assignment" size={24} color="#3b82f6" />
                            </View>
                            <Text style={styles.statNumber}>125</Text>
                            <Text style={styles.statLabel}>Tasks Done</Text>
                        </View>
                        
                        <View style={styles.statBox}>
                            <View style={styles.statIconWrapper}>
                                <Icon name="star" size={24} color="#f59e0b" />
                            </View>
                            <Text style={styles.statNumber}>4.8</Text>
                            <Text style={styles.statLabel}>Peer Rating</Text>
                        </View>
                        
                        <View style={styles.statBox}>
                            <View style={styles.statIconWrapper}>
                                <Icon name="schedule" size={24} color="#10b981" />
                            </View>
                            <Text style={styles.statNumber}>95%</Text>
                            <Text style={styles.statLabel}>On-Time</Text>
                        </View>
                    </View>
                </View>

                {/* Action Grid - Perfect 44px Touch Targets */}
                <View style={styles.actionsContainer}>
                    <View style={styles.actionsRow}>
                        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                            <View style={styles.actionIconContainer}>
                                <Icon name="add-task" size={28} color="#3b82f6" />
                            </View>
                            <Text style={styles.actionTitle}>Post Task</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                            <View style={styles.actionIconContainer}>
                                <Icon name="search" size={28} color="#10b981" />
                            </View>
                            <Text style={styles.actionTitle}>Find Help</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.actionsRow}>
                        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                            <View style={styles.actionIconContainer}>
                                <Icon name="group" size={28} color="#f59e0b" />
                            </View>
                            <Text style={styles.actionTitle}>Study Group</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                            <View style={styles.actionIconContainer}>
                                <Icon name="book" size={28} color="#8b5cf6" />
                            </View>
                            <Text style={styles.actionTitle}>Subjects</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Weekly Progress - Enhanced UX */}
                <View style={styles.progressCard}>
                    <Text style={styles.sectionTitle}>Weekly Progress</Text>
                    
                    <View style={styles.progressItem}>
                        <View style={styles.progressHeader}>
                            <View style={styles.progressLabelContainer}>
                                <Icon name="assignment" size={18} color="#3b82f6" style={{marginRight: 8}} />
                                <Text style={styles.progressLabel}>Tasks Completed</Text>
                            </View>
                            <Text style={styles.progressValue}>15/20</Text>
                        </View>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: '75%', backgroundColor: '#3b82f6' }]} />
                        </View>
                        <Text style={styles.progressPercentage}>75% Complete</Text>
                    </View>

                    <View style={styles.progressItem}>
                        <View style={styles.progressHeader}>
                            <View style={styles.progressLabelContainer}>
                                <Icon name="flag" size={18} color="#10b981" style={{marginRight: 8}} />
                                <Text style={styles.progressLabel}>Goals Met</Text>
                            </View>
                            <Text style={styles.progressValue}>3/4</Text>
                        </View>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: '75%', backgroundColor: '#10b981' }]} />
                        </View>
                        <Text style={styles.progressPercentage}>75% Complete</Text>
                    </View>
                </View>

                {/* Achievements - Clear Visual Hierarchy */}
                <View style={styles.achievementsCard}>
                    <Text style={styles.sectionTitle}>Achievements</Text>
                    
                    <View style={styles.achievementsGrid}>
                        <View style={styles.achievementItem}>
                            <View style={[styles.achievementBadge, styles.achievementActive]}>
                                <Icon name="emoji-events" size={24} color="#f59e0b" />
                            </View>
                            <Text style={styles.achievementLabel}>Top Helper</Text>
                        </View>
                        
                        <View style={styles.achievementItem}>
                            <View style={styles.achievementBadge}>
                                <Icon name="school" size={24} color="#6b7280" />
                            </View>
                            <Text style={styles.achievementLabel}>Scholar</Text>
                        </View>
                        
                        <View style={styles.achievementItem}>
                            <View style={styles.achievementBadge}>
                                <Icon name="flash-on" size={24} color="#6b7280" />
                            </View>
                            <Text style={styles.achievementLabel}>Fast</Text>
                        </View>
                        
                        <View style={styles.achievementItem}>
                            <View style={[styles.achievementBadge, styles.achievementActive]}>
                                <Icon name="target" size={24} color="#10b981" />
                            </View>
                            <Text style={styles.achievementLabel}>Focused</Text>
                        </View>
                    </View>
                </View>

                {/* Settings Menu - Perfect Android UX */}
                <View style={styles.settingsCard}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    
                    <TouchableOpacity style={styles.settingsItem} activeOpacity={0.6}>
                        <View style={styles.settingsLeft}>
                            <View style={styles.settingsIconContainer}>
                                <Icon name="person" size={20} color="#3b82f6" />
                            </View>
                            <Text style={styles.settingsText}>Profile Settings</Text>
                        </View>
                        <Icon name="chevron-right" size={18} color="#9ca3af" />
                    </TouchableOpacity>

                    <View style={styles.settingsDivider} />

                    <TouchableOpacity style={styles.settingsItem} activeOpacity={0.6}>
                        <View style={styles.settingsLeft}>
                            <View style={styles.settingsIconContainer}>
                                <Icon name="notifications" size={20} color="#f59e0b" />
                            </View>
                            <Text style={styles.settingsText}>Notification Preferences</Text>
                        </View>
                        <Icon name="chevron-right" size={18} color="#9ca3af" />
                    </TouchableOpacity>

                    <View style={styles.settingsDivider} />

                    <TouchableOpacity style={styles.settingsItem} activeOpacity={0.6}>
                        <View style={styles.settingsLeft}>
                            <View style={styles.settingsIconContainer}>
                                <Icon name="school" size={20} color="#10b981" />
                            </View>
                            <Text style={styles.settingsText}>Subject Expertise</Text>
                        </View>
                        <Icon name="chevron-right" size={18} color="#9ca3af" />
                    </TouchableOpacity>

                    <View style={styles.settingsDivider} />

                    <TouchableOpacity style={[styles.settingsItem, styles.lastSettingsItem]} activeOpacity={0.6}>
                        <View style={styles.settingsLeft}>
                            <View style={styles.settingsIconContainer}>
                                <Icon name="security" size={20} color="#ef4444" />
                            </View>
                            <Text style={styles.settingsText}>Privacy & Security</Text>
                        </View>
                        <Icon name="chevron-right" size={18} color="#9ca3af" />
                    </TouchableOpacity>
                </View>

                {/* Bottom Safe Area */}
                <View style={styles.bottomSafeArea} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    
    // Optimized Header - Following Android Guidelines
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#f8f9fa',
        minHeight: 56, // Material Design standard
    },
    
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },

    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    shareButton: {
        width: 44, // Minimum touch target
        height: 44,
        borderRadius: 22,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginRight: 8,
    },
    
    settingsButton: {
        width: 44, // Minimum touch target
        height: 44,
        borderRadius: 22,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    
    settingsIcon: {
        fontSize: 22,
    },
    
    scrollView: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: CARD_MARGIN,
    },
    
    // Enhanced Profile Card
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 28,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
    
    profileImageContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
    },
    
    verifiedBadge: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#10b981',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#ffffff',
        elevation: 3,
    },
    
    verifiedIcon: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    userName: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 6,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    
    userTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4b5563',
        marginBottom: 4,
        textAlign: 'center',
    },
    
    userCollege: {
        fontSize: 14,
        fontWeight: '500',
        color: '#9ca3af',
        textAlign: 'center',
    },

    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 12,
    },

    editButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3b82f6',
        marginLeft: 6,
    },

    // Performance Dashboard - Grid Layout
    dashboardCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: CARD_PADDING,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 20,
        letterSpacing: -0.3,
    },

    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    statBox: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },

    statIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    statIcon: {
        fontSize: 24,
    },

    statNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 4,
        textAlign: 'center',
    },

    statLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 16,
    },

    // Action Cards - Perfect Touch Targets
    actionsContainer: {
        marginBottom: 20,
    },

    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    actionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: (width - (CARD_MARGIN * 2) - 12) / 2, // Perfect spacing
        minHeight: 120, // Consistent height
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },

    actionIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    actionIcon: {
        fontSize: 28,
    },

    actionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
    },

    // Enhanced Progress Card
    progressCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: CARD_PADDING,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },

    progressItem: {
        marginBottom: 24,
    },

    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    progressLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    progressIcon: {
        fontSize: 18,
        marginRight: 8,
    },

    progressLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },

    progressValue: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1a1a1a',
    },

    progressTrack: {
        height: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },

    progressFill: {
        height: '100%',
        borderRadius: 4,
    },

    progressPercentage: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6b7280',
        textAlign: 'right',
    },

    // Achievements Grid
    achievementsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: CARD_PADDING,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },

    achievementsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    achievementItem: {
        alignItems: 'center',
        flex: 1,
    },

    achievementBadge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },

    achievementActive: {
        backgroundColor: '#1f2937',
        borderColor: '#1f2937',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },

    achievementIcon: {
        fontSize: 24,
    },

    achievementLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6b7280',
        textAlign: 'center',
    },

    // Optimized Settings Menu
    settingsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },

    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
        minHeight: 64, // Optimal touch target
    },

    lastSettingsItem: {
        borderBottomWidth: 0,
    },

    settingsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    settingsIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

    settingsItemIcon: {
        fontSize: 20,
    },

    settingsText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        flex: 1,
    },

    settingsArrow: {
        fontSize: 18,
        color: '#9ca3af',
        fontWeight: '600',
    },

    settingsDivider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginLeft: 76, // Align with text
    },

    bottomSafeArea: {
        height: 80, // Space for bottom navigation
    },
});
