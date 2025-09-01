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
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#f8f9fa" barStyle="dark-content" />
            
            {/* Header with Brand Identity */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.brandLogo}>
                        <MaterialCommunityIcons name="school" size={24} color="#6366f1" />
                    </View>
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>
                <TouchableOpacity style={styles.settingsButton}>
                    <Feather name="settings" size={22} color="#6b7280" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* Enhanced Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                            }}
                            style={styles.profileImage}
                        />
                        <View style={styles.statusBadge}>
                            <MaterialCommunityIcons name="check-bold" size={16} color="#ffffff" />
                        </View>
                        <View style={styles.levelBadge}>
                            <FontAwesome name="star" size={12} color="#fbbf24" />
                            <Text style={styles.levelText}>Pro</Text>
                        </View>
                    </View>
                    
                    <Text style={styles.userName}>R Sreehari</Text>
                    <View style={styles.userDetailsRow}>
                        <MaterialCommunityIcons name="school-outline" size={16} color="#6b7280" />
                        <Text style={styles.userYear}>Senior, Computer Science</Text>
                    </View>
                    <View style={styles.userDetailsRow}>
                        <Ionicons name="location-outline" size={16} color="#6b7280" />
                        <Text style={styles.university}>Your College Name</Text>
                    </View>
                </View>

                {/* Performance Dashboard with Enhanced Icons */}
                <View style={styles.dashboardCard}>
                    <View style={styles.sectionHeader}>
                        <MaterialCommunityIcons name="chart-line" size={24} color="#3b82f6" />
                        <Text style={styles.sectionTitle}>Performance Dashboard</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <View style={styles.statIconContainer}>
                                <MaterialCommunityIcons name="check-circle" size={32} color="#10b981" />
                            </View>
                            <Text style={styles.statNumber}>125</Text>
                            <Text style={styles.statLabel}>Tasks Done</Text>
                        </View>
                        
                        <View style={styles.statDivider} />
                        
                        <View style={styles.statItem}>
                            <View style={styles.statIconContainer}>
                                <FontAwesome name="star" size={28} color="#fbbf24" />
                            </View>
                            <Text style={styles.statNumber}>4.8</Text>
                            <Text style={styles.statLabel}>Peer Rating</Text>
                        </View>
                        
                        <View style={styles.statDivider} />
                        
                        <View style={styles.statItem}>
                            <View style={styles.statIconContainer}>
                                <MaterialCommunityIcons name="clock-check" size={32} color="#8b5cf6" />
                            </View>
                            <Text style={styles.statNumber}>95%</Text>
                            <Text style={styles.statLabel}>On-Time</Text>
                        </View>
                    </View>
                </View>

                {/* Premium Action Buttons */}
                <View style={styles.actionsGrid}>
                    <TouchableOpacity style={styles.actionButton}>
                        <View style={[styles.actionIcon, { backgroundColor: '#eff6ff' }]}>
                            <MaterialCommunityIcons name="plus-circle" size={32} color="#3b82f6" />
                        </View>
                        <Text style={styles.actionText}>Post Task</Text>
                        <Text style={styles.actionSubtext}>Create new request</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={[styles.actionIcon, { backgroundColor: '#f0fdf4' }]}>
                            <Feather name="search" size={32} color="#10b981" />
                        </View>
                        <Text style={styles.actionText}>Find Help</Text>
                        <Text style={styles.actionSubtext}>Browse available tasks</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={[styles.actionIcon, { backgroundColor: '#faf5ff' }]}>
                            <MaterialCommunityIcons name="account-group" size={32} color="#8b5cf6" />
                        </View>
                        <Text style={styles.actionText}>Study Group</Text>
                        <Text style={styles.actionSubtext}>Join or create groups</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={[styles.actionIcon, { backgroundColor: '#fffbeb' }]}>
                            <MaterialCommunityIcons name="book-open-variant" size={32} color="#f59e0b" />
                        </View>
                        <Text style={styles.actionText}>Subjects</Text>
                        <Text style={styles.actionSubtext}>Manage expertise</Text>
                    </TouchableOpacity>
                </View>

                {/* Enhanced Weekly Progress */}
                <View style={styles.progressCard}>
                    <View style={styles.sectionHeader}>
                        <MaterialCommunityIcons name="trending-up" size={24} color="#10b981" />
                        <Text style={styles.sectionTitle}>Weekly Progress</Text>
                    </View>
                    
                    <View style={styles.progressItem}>
                        <View style={styles.progressHeader}>
                            <View style={styles.progressLabelRow}>
                                <MaterialCommunityIcons name="clipboard-check" size={18} color="#3b82f6" />
                                <Text style={styles.progressLabel}>Tasks Completed</Text>
                            </View>
                            <Text style={styles.progressValue}>15/20</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: '75%' }]} />
                        </View>
                    </View>

                    <View style={styles.progressItem}>
                        <View style={styles.progressHeader}>
                            <View style={styles.progressLabelRow}>
                                <MaterialCommunityIcons name="target" size={18} color="#10b981" />
                                <Text style={styles.progressLabel}>Goals Met</Text>
                            </View>
                            <Text style={styles.progressValue}>3/4</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBarGreen, { width: '75%' }]} />
                        </View>
                    </View>
                </View>

                {/* Premium Achievements */}
                <View style={styles.achievementsCard}>
                    <View style={styles.sectionHeader}>
                        <FontAwesome name="trophy" size={24} color="#fbbf24" />
                        <Text style={styles.sectionTitle}>Achievements</Text>
                    </View>
                    <View style={styles.achievementsGrid}>
                        <View style={styles.achievementItem}>
                            <View style={styles.achievementBadge}>
                                <FontAwesome name="trophy" size={28} color="#fbbf24" />
                            </View>
                            <Text style={styles.achievementName}>Top Helper</Text>
                        </View>
                        <View style={styles.achievementItem}>
                            <View style={styles.achievementBadgeInactive}>
                                <MaterialCommunityIcons name="book-multiple" size={28} color="#9ca3af" />
                            </View>
                            <Text style={styles.achievementNameInactive}>Scholar</Text>
                        </View>
                        <View style={styles.achievementItem}>
                            <View style={styles.achievementBadgeInactive}>
                                <MaterialCommunityIcons name="lightning-bolt" size={28} color="#9ca3af" />
                            </View>
                            <Text style={styles.achievementNameInactive}>Speed Star</Text>
                        </View>
                        <View style={styles.achievementItem}>
                            <View style={styles.achievementBadge}>
                                <MaterialCommunityIcons name="bullseye-arrow" size={28} color="#10b981" />
                            </View>
                            <Text style={styles.achievementName}>Goal Master</Text>
                        </View>
                    </View>
                </View>

                {/* Enhanced Settings Menu */}
                <View style={styles.settingsCard}>
                    <View style={styles.sectionHeader}>
                        <Feather name="settings" size={24} color="#6b7280" />
                        <Text style={styles.sectionTitle}>Settings</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <View style={styles.settingIconContainer}>
                                <Feather name="user" size={20} color="#3b82f6" />
                            </View>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingText}>Profile Settings</Text>
                                <Text style={styles.settingSubtext}>Manage your account</Text>
                            </View>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9ca3af" />
                    </TouchableOpacity>

                    <View style={styles.settingDivider} />

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <View style={styles.settingIconContainer}>
                                <Ionicons name="notifications-outline" size={20} color="#f59e0b" />
                            </View>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingText}>Notifications</Text>
                                <Text style={styles.settingSubtext}>Configure alerts</Text>
                            </View>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9ca3af" />
                    </TouchableOpacity>

                    <View style={styles.settingDivider} />

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <View style={styles.settingIconContainer}>
                                <MaterialCommunityIcons name="school-outline" size={20} color="#8b5cf6" />
                            </View>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingText}>Subject Expertise</Text>
                                <Text style={styles.settingSubtext}>Update your skills</Text>
                            </View>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9ca3af" />
                    </TouchableOpacity>

                    <View style={styles.settingDivider} />

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <View style={styles.settingIconContainer}>
                                <MaterialCommunityIcons name="shield-check-outline" size={20} color="#10b981" />
                            </View>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingText}>Privacy & Security</Text>
                                <Text style={styles.settingSubtext}>Manage permissions</Text>
                            </View>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                </View>

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
    
    // Enhanced Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#f8f9fa',
    },

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    brandLogo: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
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
    
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    
    // Enhanced Profile Card
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 28,
        alignItems: 'center',
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
    },
    
    profileImageContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    
    profileImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#f0f0f0',
        borderWidth: 4,
        borderColor: '#ffffff',
    },
    
    statusBadge: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#10b981',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#ffffff',
    },

    levelBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1f2937',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ffffff',
    },

    levelText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 2,
    },
    
    userName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
        textAlign: 'center',
    },
    
    userDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },

    userYear: {
        fontSize: 16,
        color: '#6b7280',
        marginLeft: 6,
        fontWeight: '500',
    },
    
    university: {
        fontSize: 14,
        color: '#9ca3af',
        marginLeft: 6,
    },

    // Enhanced Section Headers
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginLeft: 8,
    },

    // Enhanced Dashboard
    dashboardCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 28,
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
    },

    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    statItem: {
        alignItems: 'center',
        flex: 1,
    },

    statIconContainer: {
        marginBottom: 8,
    },

    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 6,
        textAlign: 'center',
    },

    statLabel: {
        fontSize: 13,
        color: '#6b7280',
        textAlign: 'center',
        fontWeight: '600',
    },

    statDivider: {
        width: 1,
        height: 60,
        backgroundColor: '#e5e7eb',
        marginHorizontal: 20,
    },

    // Enhanced Action Buttons
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },

    actionButton: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: (width - 52) / 2,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    actionIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    actionText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 4,
    },

    actionSubtext: {
        fontSize: 12,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 16,
    },

    // Enhanced Progress Card
    progressCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 28,
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
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

    progressLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    progressLabel: {
        fontSize: 15,
        color: '#374151',
        fontWeight: '600',
        marginLeft: 8,
    },

    progressValue: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },

    progressBarContainer: {
        height: 10,
        backgroundColor: '#e5e7eb',
        borderRadius: 5,
        overflow: 'hidden',
    },

    progressBar: {
        height: '100%',
        backgroundColor: '#3b82f6',
        borderRadius: 5,
    },

    progressBarGreen: {
        height: '100%',
        backgroundColor: '#10b981',
        borderRadius: 5,
    },

    // Enhanced Achievements
    achievementsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 28,
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
    },

    achievementsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    achievementItem: {
        alignItems: 'center',
    },

    achievementBadge: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#1f2937',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    achievementBadgeInactive: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },

    achievementName: {
        fontSize: 11,
        fontWeight: '600',
        color: '#1a1a1a',
        textAlign: 'center',
    },

    achievementNameInactive: {
        fontSize: 11,
        fontWeight: '500',
        color: '#9ca3af',
        textAlign: 'center',
    },

    // Enhanced Settings
    settingsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        paddingVertical: 12,
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
    },

    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 28,
        paddingVertical: 18,
        minHeight: 72,
    },

    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    settingIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

    settingTextContainer: {
        flex: 1,
    },

    settingText: {
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '600',
        marginBottom: 2,
    },

    settingSubtext: {
        fontSize: 13,
        color: '#6b7280',
        fontWeight: '500',
    },

    settingDivider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginLeft: 88,
        marginRight: 28,
    },
});
