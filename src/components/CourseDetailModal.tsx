import React, { useState } from 'react';
import { X, Star, Heart, Bookmark, CheckCircle, Clock, BookOpen, User } from 'lucide-react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenEnrollment: (course: Course) => void;
  onToggleHeart: (courseId: string) => void;
  isLiked?: boolean;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onOpenEnrollment,
  onToggleHeart,
  isLiked = false
}) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'instructor' | 'reviews'>('curriculum');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 my-8 border border-gray-100">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl leading-none p-2 rounded-full hover:bg-gray-100 transition-colors z-30"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8 space-y-8">
          {/* Breadcrumb matching Screenshot 3 */}
          <div className="text-xs text-gray-500 font-semibold flex items-center gap-2 border-b border-gray-100 pb-3">
            <span>교육신청</span>
            <span>&gt;</span>
            <span className="text-blue-600 font-bold">{course.categoryLabel}</span>
          </div>

          {/* Top Course Spec Section (Matches Screenshot 3 exact layout) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Thumbnail Banner */}
            <div className="md:col-span-5 relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-gray-200 shadow-xs flex flex-col justify-between p-6 text-white">
              <div className={`absolute inset-0 bg-gradient-to-br ${course.thumbnailGradient}`} />
              
              <div className="relative z-10">
                <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded mb-3">
                  {course.subTitle || course.badgeTag}
                </span>
                <h2 className="text-xl font-black text-white leading-tight drop-shadow-xs">
                  {course.title}
                </h2>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/20">
                <p className="text-xs text-cyan-100 font-semibold">강사: {course.instructor}</p>
                <div className="mt-2 bg-black/40 text-[11px] text-gray-200 px-3 py-1 rounded font-mono inline-block">
                  수강 신청 & 결제 테스트 전용
                </div>
              </div>
            </div>

            {/* Right Course Metadata Specifications */}
            <div className="md:col-span-7 space-y-3.5 text-sm text-gray-800">
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">과 정 명 :</span>
                <span className="font-bold text-gray-900 text-base">{course.title}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">학습방법:</span>
                <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded font-semibold text-xs">온라인 교육</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">학습시간:</span>
                <span>{course.durationHours}시간 ({course.chaptersCount}차시)</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">학습기간:</span>
                <span>수강 신청일로 부터 {course.validDays}일</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">수료기준:</span>
                <span className="text-emerald-700 font-semibold">{course.completionRate}</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">만족도:</span>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <strong className="text-gray-900">100%</strong>
                  <span className="text-gray-400">({course.reviewsCount}명)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-600 pt-1">
                <span>수강생: <strong className="text-gray-900">{course.studentsCount}명</strong></span>
                <span className="flex items-center gap-1 text-red-500 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-red-500" />
                  {course.heartCount}
                </span>
              </div>

              {/* Action Buttons matching Screenshot 3 styling */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => onOpenEnrollment(course)}
                  className="flex-1 bg-[#2d3748] hover:bg-[#1a202c] text-white font-bold py-3.5 px-6 rounded-md shadow-sm transition-all text-sm"
                >
                  수강신청
                </button>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-md font-bold text-sm transition-all border ${
                    isBookmarked
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-[#6c757d] hover:bg-[#5a6268] text-white border-transparent'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>관심</span>
                </button>

                <button
                  onClick={() => onToggleHeart(course.id)}
                  className={`p-3.5 rounded-md border transition-all ${
                    isLiked
                      ? 'bg-red-50 border-red-300 text-red-500'
                      : 'bg-white border-gray-300 hover:border-red-400 text-gray-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs matching Screenshot 3 */}
          <div className="border-b border-gray-200">
            <div className="flex gap-8 text-sm font-bold">
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`pb-3 transition-colors border-b-2 ${
                  activeTab === 'curriculum'
                    ? 'border-gray-900 text-gray-900 font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                학습목차
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`pb-3 transition-colors border-b-2 ${
                  activeTab === 'instructor'
                    ? 'border-gray-900 text-gray-900 font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                강사소개
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 transition-colors border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-gray-900 text-gray-900 font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                수강후기 ({course.reviewsCount}건)
              </button>
            </div>
          </div>

          {/* TAB CONTENT: Curriculum Table matching Screenshot 3 */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d3748] text-white font-bold text-center text-xs">
                      <th className="py-3 px-4 w-20 border-r border-gray-600">NO</th>
                      <th className="py-3 px-4 text-left border-r border-gray-600">목차명</th>
                      <th className="py-3 px-4 w-28">학습시간</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {course.curriculum.map((chapter) => (
                      <tr key={chapter.no} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3.5 px-4 text-center font-bold text-gray-600 bg-gray-50/50">
                          {chapter.no}차시
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-gray-800">
                          {chapter.title}
                        </td>
                        <td className="py-3.5 px-4 text-center text-gray-500 font-mono text-xs">
                          {chapter.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Instructor */}
          {activeTab === 'instructor' && (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex items-start gap-5">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shrink-0">
                <User className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-extrabold text-lg text-gray-900">{course.instructor}</h4>
                <p className="text-xs text-blue-600 font-bold">원앤스엔씨 EDU 전속 전문 강사진</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  현업 10년 이상의 실무 노하우를 바탕으로 최신 비즈니스 트렌드 및 실무 적용 프레임워크를 강의합니다.
                </p>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {course.reviews.map((review) => (
                <div key={review.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-800">{review.userName}</span>
                    <span className="text-[11px] text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 pt-1">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
