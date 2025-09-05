export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  budget: number;
  deadline: Date;
  postedBy: string; // User ID
  assignedTo?: string; // User ID
  status: TaskStatus;
  skills: string[];
  subjects: string[];
  location?: string;
  requirements?: string[];
  attachments?: TaskAttachment[];
  responses: TaskResponse[];
  reviews: TaskReview[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export type TaskCategory = 
  | 'academic' 
  | 'assignment' 
  | 'notes' 
  | 'practical' 
  | 'delivery' 
  | 'events'
  | 'project'
  | 'tutoring'
  | 'research';

export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';

export type TaskStatus = 
  | 'open' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled' 
  | 'disputed'
  | 'expired';

export interface TaskResponse {
  id: string;
  userId: string;
  message: string;
  proposedBudget?: number;
  estimatedTime?: string;
  createdAt: Date;
  isAccepted: boolean;
}

export interface TaskReview {
  id: string;
  taskId: string;
  reviewerId: string; // User who wrote the review
  revieweeId: string; // User being reviewed
  rating: number; // 1-5 stars
  comment: string;
  createdAt: Date;
}

export interface TaskAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUri: string;
  uploadedAt: Date;
}

export interface TaskFilter {
  category?: TaskCategory;
  priority?: TaskPriority;
  status?: TaskStatus;
  minBudget?: number;
  maxBudget?: number;
  skills?: string[];
  subjects?: string[];
  location?: string;
  postedBy?: string;
  assignedTo?: string;
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  averageRating: number;
  totalEarnings: number;
  averageCompletionTime: number; // in hours
}
