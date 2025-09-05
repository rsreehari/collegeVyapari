import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '../types/user';
import { Task } from '../types/task';

interface UserContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isOnboardingComplete: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: (userData: any) => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => void;
  refreshUserProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in and onboarding is complete
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // In a real app, you'd check AsyncStorage or make an API call
      // For now, we'll simulate checking stored user data
      const storedUser = await getStoredUser();
      if (storedUser) {
        setUser(storedUser);
        setIsOnboardingComplete(true);
        await loadUserProfile(storedUser.id);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStoredUser = async (): Promise<User | null> => {
    // Simulate getting user from storage
    // In a real app, you'd use AsyncStorage or similar
    return null;
  };

  const loadUserProfile = async (userId: string) => {
    try {
      // Simulate loading user profile
      const mockProfile: UserProfile = {
        user: user!,
        achievements: [
          {
            id: '1',
            title: 'Top Helper',
            description: 'Completed 50+ tasks',
            iconUri: 'https://img.icons8.com/ios-filled/48/f59e0b/trophy.png',
            isUnlocked: true,
            unlockedAt: new Date(),
            category: 'task',
          },
          {
            id: '2',
            title: 'Focused',
            description: 'Maintained 95%+ on-time completion',
            iconUri: 'https://img.icons8.com/ios-filled/48/10b981/target.png',
            isUnlocked: true,
            unlockedAt: new Date(),
            category: 'rating',
          },
        ],
        weeklyProgress: {
          tasksCompleted: 15,
          tasksGoal: 20,
          goalsMet: 3,
          goalsTotal: 4,
          weekStart: new Date(),
          weekEnd: new Date(),
        },
        stats: {
          totalEarnings: 12500,
          totalSpent: 3500,
          averageRating: 4.8,
          responseTime: 15,
          completionRate: 95,
          streakDays: 12,
          points: 2450,
          level: 5,
        },
      };
      setUserProfile(mockProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call for login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from API
      const mockUser: User = {
        id: '1',
        name: 'R Sreehari',
        email: email,
        college: 'National Institute of Technology',
        year: '3rd Year',
        role: 'both',
        subjects: ['Computer Science', 'Mathematics'],
        skills: ['Programming', 'Web Development', 'Data Analysis'],
        interests: ['Technology', 'Startups'],
        rating: 4.8,
        tasksCompleted: 125,
        onTimePercentage: 95,
        isVerified: true,
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setUser(mockUser);
      setIsOnboardingComplete(true);
      await loadUserProfile(mockUser.id);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserProfile(null);
    setIsOnboardingComplete(false);
    // In a real app, you'd also clear stored tokens/data
  };

  const completeOnboarding = async (userData: any) => {
    setIsLoading(true);
    try {
      // Simulate API call to create user account
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || 'New User',
        email: userData.email,
        college: userData.college,
        year: userData.year,
        role: userData.role,
        subjects: userData.subjects || [],
        skills: userData.skills || [],
        interests: userData.interests || [],
        rating: 0,
        tasksCompleted: 0,
        onTimePercentage: 0,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setUser(newUser);
      setIsOnboardingComplete(true);
      await loadUserProfile(newUser.id);
    } catch (error) {
      console.error('Onboarding error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates, updatedAt: new Date() };
      setUser(updatedUser);
      
      if (userProfile) {
        setUserProfile({ ...userProfile, user: updatedUser });
      }
    }
  };

  const refreshUserProfile = async () => {
    if (user) {
      await loadUserProfile(user.id);
    }
  };

  const value: UserContextType = {
    user,
    userProfile,
    isOnboardingComplete,
    isLoading,
    login,
    logout,
    completeOnboarding,
    updateUserProfile,
    refreshUserProfile,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
