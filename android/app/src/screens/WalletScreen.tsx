import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  taskId?: string;
  taskTitle?: string;
}

export default function WalletScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data - in real app, this would come from API
  const walletBalance = 1250;
  const totalEarnings = 15750;
  const totalSpent = 14500;
  const pendingAmount = 500;

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      amount: 750,
      description: 'Payment received for Data Structures Assignment',
      timestamp: new Date('2024-01-15'),
      status: 'completed',
      taskId: 'task_1',
      taskTitle: 'Data Structures Assignment',
    },
    {
      id: '2',
      type: 'debit',
      amount: 500,
      description: 'Payment made for Web Development Project',
      timestamp: new Date('2024-01-14'),
      status: 'completed',
      taskId: 'task_2',
      taskTitle: 'Web Development Project',
    },
    {
      id: '3',
      type: 'credit',
      amount: 300,
      description: 'Payment received for Math Tutoring',
      timestamp: new Date('2024-01-13'),
      status: 'completed',
      taskId: 'task_3',
      taskTitle: 'Math Tutoring',
    },
    {
      id: '4',
      type: 'credit',
      amount: 500,
      description: 'Payment received for Science Project',
      timestamp: new Date('2024-01-12'),
      status: 'pending',
      taskId: 'task_4',
      taskTitle: 'Science Project',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderTransaction = (transaction: Transaction) => {
    const isCredit = transaction.type === 'credit';
    const statusColor = {
      completed: '#10B981',
      pending: '#F59E0B',
      failed: '#EF4444',
    }[transaction.status];

    return (
      <View key={transaction.id} style={styles.transactionItem}>
        <View style={styles.transactionIcon}>
          <Image
            source={{
              uri: isCredit
                ? 'https://img.icons8.com/ios-filled/24/10B981/plus.png'
                : 'https://img.icons8.com/ios-filled/24/EF4444/minus.png'
            }}
            style={styles.transactionIconImage}
          />
        </View>
        
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionDescription} numberOfLines={2}>
            {transaction.description}
          </Text>
          <Text style={styles.transactionDate}>
            {transaction.timestamp.toLocaleDateString()} at{' '}
            {transaction.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          {transaction.taskTitle && (
            <Text style={styles.transactionTask}>{transaction.taskTitle}</Text>
          )}
        </View>
        
        <View style={styles.transactionAmount}>
          <Text style={[
            styles.transactionAmountText,
            { color: isCredit ? '#10B981' : '#EF4444' }
          ]}>
            {isCredit ? '+' : '-'}₹{transaction.amount}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{transaction.status}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderOverviewTab = () => (
    <View>
      {/* Balance Cards */}
      <View style={styles.balanceCards}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹{walletBalance}</Text>
          <TouchableOpacity style={styles.addMoneyButton}>
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Pending</Text>
          <Text style={styles.balanceAmount}>₹{pendingAmount}</Text>
          <Text style={styles.balanceSubtext}>Awaiting completion</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Transaction Summary</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/24/10B981/trending-up.png' }}
              style={styles.statIcon}
            />
            <Text style={styles.statValue}>₹{totalEarnings}</Text>
            <Text style={styles.statLabel}>Total Earned</Text>
          </View>
          
          <View style={styles.statItem}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/24/EF4444/trending-down.png' }}
              style={styles.statIcon}
            />
            <Text style={styles.statValue}>₹{totalSpent}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsCard}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/32/4F46E5/add.png' }}
              style={styles.quickActionIcon}
            />
            <Text style={styles.quickActionText}>Add Money</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/32/10B981/send.png' }}
              style={styles.quickActionIcon}
            />
            <Text style={styles.quickActionText}>Send Money</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/32/F59E0B/history.png' }}
              style={styles.quickActionIcon}
            />
            <Text style={styles.quickActionText}>History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/32/8B5CF6/settings.png' }}
              style={styles.quickActionIcon}
            />
            <Text style={styles.quickActionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderTransactionsTab = () => (
    <View>
      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {transactions.map(renderTransaction)}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet</Text>
        <Text style={styles.headerSubtitle}>Manage your payments and earnings</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'overview' && styles.tabActive
          ]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'overview' && styles.tabTextActive
          ]}>
            Overview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'transactions' && styles.tabActive
          ]}
          onPress={() => setSelectedTab('transactions')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'transactions' && styles.tabTextActive
          ]}>
            Transactions
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {selectedTab === 'overview' ? renderOverviewTab() : renderTransactionsTab()}
      </ScrollView>

      {/* Security Notice */}
      <View style={styles.securityNotice}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/20/10B981/security-checked.png' }}
          style={styles.securityIcon}
        />
        <Text style={styles.securityText}>
          Your wallet is secured with bank-level encryption
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#4F46E5',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  balanceCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  balanceSubtext: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  addMoneyButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addMoneyText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  quickActionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  quickActionIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
  transactionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionIconImage: {
    width: 24,
    height: 24,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  transactionTask: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  securityIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  securityText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '500',
  },
});
