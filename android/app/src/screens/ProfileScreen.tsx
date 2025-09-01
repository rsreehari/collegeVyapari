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
            
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <Text style={styles.settingsIcon}>⚙️</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
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
                    <Text style={styles.userYear}>2nd Year, Computer Science</Text>
                    <Text style={styles.university}>College of engineering karunagappally</Text>
                </View>
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
});
