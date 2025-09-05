export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  year: string;
  role: 'poster' | 'doer' | 'both';
  subjects: string[];
  skills: string[];
  interests: string[];
  rating: number;
  tasksCompleted: number;
  onTimePercentage: number;
  isVerified: boolean;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  user: User;
  achievements: Achievement[];
  weeklyProgress: WeeklyProgress;
  stats: UserStats;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUri: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  category: 'task' | 'rating' | 'streak' | 'special';
}

export interface WeeklyProgress {
  tasksCompleted: number;
  tasksGoal: number;
  goalsMet: number;
  goalsTotal: number;
  weekStart: Date;
  weekEnd: Date;
}

export interface UserStats {
  totalEarnings: number;
  totalSpent: number;
  averageRating: number;
  responseTime: number; // in minutes
  completionRate: number;
  streakDays: number;
  points: number;
  level: number;
}
