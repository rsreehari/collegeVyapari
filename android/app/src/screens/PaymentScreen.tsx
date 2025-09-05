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
  TextInput,
} from 'react-native';

const { width } = Dimensions.get('window');

interface PaymentScreenProps {
  amount: number;
  taskTitle: string;
  recipientName: string;
  recipientUpiId: string;
  onPaymentSuccess: (paymentData: PaymentData) => void;
  onPaymentCancel: () => void;
}

interface PaymentData {
  transactionId: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  upiTransactionId?: string;
  timestamp: Date;
}

export default function PaymentScreen({
  amount,
  taskTitle,
  recipientName,
  recipientUpiId,
  onPaymentSuccess,
  onPaymentCancel,
}: PaymentScreenProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentNotes, setPaymentNotes] = useState('');

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      description: 'Pay using UPI apps like Google Pay, PhonePe, Paytm',
      icon: 'https://img.icons8.com/ios-filled/40/4F46E5/mobile-payment.png',
      color: '#4F46E5',
    },
    {
      id: 'wallet',
      name: 'College Wallet',
      description: 'Pay using your College Vyapari wallet balance',
      icon: 'https://img.icons8.com/ios-filled/40/10B981/wallet.png',
      color: '#10B981',
    },
    {
      id: 'card',
      name: 'Card',
      description: 'Pay using debit/credit card',
      icon: 'https://img.icons8.com/ios-filled/40/F59E0B/credit-card.png',
      color: '#F59E0B',
    },
  ];

  const upiApps = [
    { name: 'Google Pay', icon: 'https://img.icons8.com/ios-filled/32/4285F4/google-pay.png' },
    { name: 'PhonePe', icon: 'https://img.icons8.com/ios-filled/32/5B9BD5/phonepe.png' },
    { name: 'Paytm', icon: 'https://img.icons8.com/ios-filled/32/00A8CC/paytm.png' },
    { name: 'BHIM', icon: 'https://img.icons8.com/ios-filled/32/000000/bhim.png' },
  ];

  const handlePayment = async () => {
    if (selectedPaymentMethod === 'upi' && !upiId) {
      Alert.alert('UPI ID Required', 'Please enter your UPI ID');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate UPI payment process
      await simulateUPIPayment();
      
      const paymentData: PaymentData = {
        transactionId: generateTransactionId(),
        amount,
        status: 'success',
        upiTransactionId: `UPI${Date.now()}`,
        timestamp: new Date(),
      };

      onPaymentSuccess(paymentData);
    } catch (error) {
      Alert.alert('Payment Failed', 'Payment could not be processed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateUPIPayment = () => {
    return new Promise((resolve, reject) => {
      // Simulate payment processing time
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve('Payment successful');
        } else {
          reject('Payment failed');
        }
      }, 3000);
    });
  };

  const generateTransactionId = () => {
    return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const renderPaymentMethod = (method: any) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethodCard,
        selectedPaymentMethod === method.id && styles.paymentMethodCardSelected,
        { borderColor: selectedPaymentMethod === method.id ? method.color : '#E5E7EB' }
      ]}
      onPress={() => setSelectedPaymentMethod(method.id)}
    >
      <Image source={{ uri: method.icon }} style={styles.paymentMethodIcon} />
      <View style={styles.paymentMethodInfo}>
        <Text style={styles.paymentMethodName}>{method.name}</Text>
        <Text style={styles.paymentMethodDescription}>{method.description}</Text>
      </View>
      <View style={[
        styles.radioButton,
        selectedPaymentMethod === method.id && styles.radioButtonSelected,
        { borderColor: selectedPaymentMethod === method.id ? method.color : '#E5E7EB' }
      ]}>
        {selectedPaymentMethod === method.id && (
          <View style={[styles.radioButtonInner, { backgroundColor: method.color }]} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderUPISection = () => {
    if (selectedPaymentMethod !== 'upi') return null;

    return (
      <View style={styles.upiSection}>
        <Text style={styles.sectionTitle}>Select UPI App</Text>
        <View style={styles.upiAppsGrid}>
          {upiApps.map((app) => (
            <TouchableOpacity key={app.name} style={styles.upiAppButton}>
              <Image source={{ uri: app.icon }} style={styles.upiAppIcon} />
              <Text style={styles.upiAppName}>{app.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Enter UPI ID</Text>
        <TextInput
          style={styles.upiInput}
          placeholder="yourname@upi"
          value={upiId}
          onChangeText={setUpiId}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    );
  };

  const renderWalletSection = () => {
    if (selectedPaymentMethod !== 'wallet') return null;

    return (
      <View style={styles.walletSection}>
        <View style={styles.walletBalanceCard}>
          <Text style={styles.walletBalanceLabel}>Available Balance</Text>
          <Text style={styles.walletBalanceAmount}>₹1,250</Text>
        </View>
        <Text style={styles.walletNote}>
          You have sufficient balance to complete this payment
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Payment</Text>
          <Text style={styles.headerSubtitle}>Complete your payment securely</Text>
        </View>

        {/* Payment Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Task</Text>
            <Text style={styles.summaryValue}>{taskTitle}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Pay to</Text>
            <Text style={styles.summaryValue}>{recipientName}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>UPI ID</Text>
            <Text style={styles.summaryValue}>{recipientUpiId}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryTotalLabel}>Total Amount</Text>
            <Text style={styles.summaryTotalValue}>₹{amount}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Payment Method</Text>
          {paymentMethods.map(renderPaymentMethod)}
        </View>

        {/* UPI Section */}
        {renderUPISection()}

        {/* Wallet Section */}
        {renderWalletSection()}

        {/* Payment Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any notes about this payment..."
            value={paymentNotes}
            onChangeText={setPaymentNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Security Features */}
        <View style={styles.securityCard}>
          <Text style={styles.securityTitle}>🔒 Secure Payment</Text>
          <Text style={styles.securityText}>• Your payment is encrypted and secure</Text>
          <Text style={styles.securityText}>• We don't store your payment details</Text>
          <Text style={styles.securityText}>• 24/7 fraud protection</Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.cancelButton} onPress={onPaymentCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.payButton,
            isProcessing && styles.payButtonDisabled
          ]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={styles.payButtonText}>
            {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
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
  summaryCard: {
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 8,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4F46E5',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  paymentMethodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  paymentMethodCardSelected: {
    backgroundColor: '#F8FAFF',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4F46E5',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  upiSection: {
    marginBottom: 24,
  },
  upiAppsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  upiAppButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  upiAppIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  upiAppName: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  upiInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  walletSection: {
    marginBottom: 24,
  },
  walletBalanceCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  walletBalanceLabel: {
    fontSize: 14,
    color: '#065F46',
    marginBottom: 8,
  },
  walletBalanceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#065F46',
  },
  walletNote: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  notesInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  securityCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    color: '#1E40AF',
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
  payButton: {
    flex: 2,
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  payButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
