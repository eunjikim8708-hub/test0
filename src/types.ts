export interface Course {
  id: string;
  title: string;
  subTitle?: string;
  category: 'ai' | 'dev' | 'pm' | 'legal' | 'job_legal' | 'ethics' | 'leadership';
  categoryLabel: string;
  badgeTag: string;
  thumbnailGradient: string;
  thumbnailBgColor?: string;
  instructor: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  studentsCount: number;
  heartCount: number;
  reviewsCount: number;
  rating: number;
  durationHours: number;
  chaptersCount: number;
  validDays: number;
  completionRate: string;
  description: string;
  curriculum: {
    no: number;
    title: string;
    duration: string;
  }[];
  reviews: {
    id: string;
    userName: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  tags: string[];
  recommendedWith?: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  interestField: string;
  targetGoal: string;
  recommendedCourseTitle: string;
  couponCode: string;
  submittedAt: string;
  type: 'quiz_lead' | 'consultation_request';
  companyName?: string;
  message?: string;
  status: '신규접수' | '쿠폰발급' | '상담대기' | '상담완료';
}

export interface Coupon {
  code: string;
  discountPercent: number;
  title: string;
  used: boolean;
}

export interface PersonaCourse {
  title: string;
  tag: string;
  cat: string;
  rating: number;
  reviewCount: string;
  difficulty: string;
  duration: string;
}

export interface PersonaInfo {
  title: string;
  subtitle: string;
  courses: PersonaCourse[];
}
