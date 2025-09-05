import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

interface UserRatingCardProps {
  user: {
    id: string;
    name: string;
    rating: number;
    tasksCompleted: number;
    onTimePercentage: number;
    profileImage?: string;
  };
  showDetails?: boolean;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export default function UserRatingCard({
  user,
  showDetails = true,
  onPress,
  size = 'medium',
}: UserRatingCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image
          key={i}
          source={{ uri: 'https://img.icons8.com/ios-filled/16/F59E0B/star.png' }}
          style={styles.star}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Image
          key="half"
          source={{ uri: 'https://img.icons8.com/ios-filled/16/F59E0B/star-half-empty.png' }}
          style={styles.star}
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Image
          key={`empty-${i}`}
          source={{ uri: 'https://img.icons8.com/ios/16/9CA3AF/star.png' }}
          style={styles.star}
        />
      );
    }

    return stars;
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          image: styles.smallImage,
          name: styles.smallName,
          rating: styles.smallRating,
          details: styles.smallDetails,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          image: styles.largeImage,
          name: styles.largeName,
          rating: styles.largeRating,
          details: styles.largeDetails,
        };
      default:
        return {
          container: styles.mediumContainer,
          image: styles.mediumImage,
          name: styles.mediumName,
          rating: styles.mediumRating,
          details: styles.mediumDetails,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const CardContent = () => (
    <View style={[styles.card, sizeStyles.container]}>
      <Image
        source={{
          uri: user.profileImage || 'https://img.icons8.com/ios-filled/60/9CA3AF/user.png'
        }}
        style={sizeStyles.image}
      />
      
      <View style={styles.userInfo}>
        <Text style={sizeStyles.name} numberOfLines={1}>
          {user.name}
        </Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(user.rating)}
          </View>
          <Text style={sizeStyles.rating}>
            {user.rating.toFixed(1)}
          </Text>
        </View>

        {showDetails && (
          <View style={sizeStyles.details}>
            <View style={styles.statItem}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/12/6B7280/task.png' }}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>{user.tasksCompleted} tasks</Text>
            </View>
            
            <View style={styles.statItem}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/12/6B7280/clock.png' }}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>{user.onTimePercentage}% on-time</Text>
            </View>
          </View>
        )}
      </View>

      {showDetails && (
        <View style={styles.verifiedBadge}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/16/10B981/verified-account.png' }}
            style={styles.verifiedIcon}
          />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  smallContainer: {
    padding: 8,
  },
  mediumContainer: {
    padding: 12,
  },
  largeContainer: {
    padding: 16,
  },
  smallImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  mediumImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  largeImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  smallName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  mediumName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  largeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 6,
  },
  star: {
    width: 12,
    height: 12,
    marginRight: 1,
  },
  smallRating: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  mediumRating: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  largeRating: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  smallDetails: {
    flexDirection: 'row',
    gap: 8,
  },
  mediumDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  largeDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    width: 16,
    height: 16,
  },
});
