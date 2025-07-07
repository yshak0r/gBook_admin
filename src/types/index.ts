export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'graduate' | 'guest' | 'admin';
  isActive: boolean;
  campus?: string;
  college?: string;
  department?: string;
  graduationYear?: number;
  profilePicture?: string;
  bio?: string;
  socialLinks?: SocialLink[];
  createdAt: string;
  updatedAt: string;
  stats?: {
    postsCount: number;
    likesReceived: number;
    commentsReceived: number;
    profileViews: number;
  };
}

export interface SocialLink {
  platform: string;
  username: string;
  url: string;
}

export interface Post {
  id: string;
  userId: string;
  type: 'lastword' | 'question';
  content: string;
  questionId?: string;
  question?: Question;
  user: User;
  isActive: boolean;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'lastword' | 'profile' | 'post';
  category?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  category?: string;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Campus {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  collegesCount: number;
  studentsCount: number;
  colleges?: College[];
  createdAt: string;
  updatedAt: string;
}

export interface College {
  id: string;
  name: string;
  campusId: string;
  campus?: Campus;
  description?: string;
  isActive: boolean;
  departmentsCount: number;
  studentsCount: number;
  departments?: Department[];
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  collegeId: string;
  college?: College;
  description?: string;
  isActive: boolean;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporter: User;
  reportedUserId: string;
  reportedUser: User;
  type: 'inappropriate_content' | 'harassment' | 'fake_profile' | 'spam' | 'other';
  reason: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  totalUsers: number;
  totalGraduates: number;
  totalGuests: number;
  totalPosts: number;
  pendingReports: number;
  activeUsers: number;
  newUsersToday: number;
  topCampuses: Array<{
    name: string;
    userCount: number;
  }>;
  userGrowth: Array<{
    date: string;
    users: number;
  }>;
  postActivity: Array<{
    date: string;
    posts: number;
  }>;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'super_admin';
  isActive: boolean;
  lastLogin?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}