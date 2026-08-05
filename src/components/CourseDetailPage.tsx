import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, Bookmark, User, Share2 } from 'lucide-react';
import { Course } from '../types';
import { StickyBottomBar } from './StickyBottomBar';

interface CourseDetailPageProps {
  course: Course;
  onBack: () => void;
  onOpenEnrollment: (course: Course) => void;
  onOpenConsultation?: () => void;
  onToggleHeart: (courseId: string) => void;
  isLiked?: boolean;
  onShare?: (course: Course) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
  onBack,
  onOpenEnrollment,
  onOpenConsultation,
  onToggleHeart,
  isLiked = false,
  onShare
}) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'instructor' | 'reviews'>('curriculum');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-8 pb-32">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-2xs">
          <div className="text-xs text-gray-500 font-semibold flex items-center gap-2">
            <button onClick={onBack} className="text-gray-500 hover:text-blue-600 font-semibold flex items-center gap-1 transition-colors">
              교육신청
            </button>
            <span>&gt;</span>
            <span className="text-gray-600 font-semibold">{course.categoryLabel}</span>
            <span>&gt;</span>
            <span className="text-blue-600 font-bold">{course.title}</span>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>목록으로 돌아가기</span>
          </button>
        </div>

        {/* Main Course Overview Card */}
        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-2xs space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Thumbnail Banner */}
            <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-gray-200 shadow-sm flex flex-col justify-between p-6 text-white">
              <div className={`absolute inset-0 bg-gradient-to-br ${course.thumbnailGradient}`} />
              
              <div className="relative z-10">
                <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-md mb-3 shadow-xs">
                  {course.subTitle || course.badgeTag}
                </span>
                <h1 className="text-2xl font-black text-white leading-tight drop-shadow-xs">
                  {course.title}
                </h1>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/20">
                <p className="text-xs text-cyan-100 font-bold">강사: {course.instructor}</p>
                <div className="mt-2 bg-black/40 text-[11px] text-gray-200 px-3 py-1 rounded font-mono inline-block">
                  수강 신청 & 결제 테스트 전용
                </div>
              </div>
            </div>

            {/* Right Course Specifications */}
            <div className="md:col-span-7 space-y-4 text-sm text-gray-800">
              <div className="flex items-baseline gap-3 pb-3 border-b border-gray-100">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">과 정 명 :</span>
                <span className="font-extrabold text-gray-900 text-lg md:text-xl leading-snug">{course.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">학습방법:</span>
                <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded font-bold text-xs border border-blue-100">온라인 교육</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">학습시간:</span>
                <span className="font-medium text-gray-700">{course.durationHours}시간 ({course.chaptersCount}차시)</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">학습기간:</span>
                <span className="font-medium text-gray-700">수강 신청일로부터 {course.validDays}일</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">수료기준:</span>
                <span className="text-emerald-700 font-bold">{course.completionRate}</span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <span className="font-extrabold text-gray-900 w-24 shrink-0">만족도:</span>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <strong className="text-gray-900 font-extrabold">100%</strong>
                  <span className="text-gray-400 font-medium">({course.reviewsCount}명 평가)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-600 pt-1">
                <span>수강생: <strong className="text-gray-900 font-bold">{course.studentsCount}명</strong></span>
                <span className="flex items-center gap-1 text-red-500 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-red-500" />
                  {course.heartCount}
                </span>
              </div>

              {/* Pricing Display */}
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between mt-2">
                <div>
                  <span className="text-xs text-gray-500 font-bold block">수강료</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-blue-600">{course.price.toLocaleString()}원</span>
                    <span className="text-gray-400 line-through text-xs font-medium">{course.originalPrice.toLocaleString()}원</span>
                    {course.discountRate > 0 && (
                      <span className="text-red-500 font-extrabold text-xs bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                        {course.discountRate}% 할인
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => onOpenEnrollment(course)}
                  className="flex-1 bg-[#2d3748] hover:bg-[#1a202c] text-white font-extrabold py-3.5 px-6 rounded-lg shadow-sm transition-all text-sm cursor-pointer"
                >
                  수강신청
                </button>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-lg font-bold text-sm transition-all border cursor-pointer ${
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
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isLiked
                      ? 'bg-red-50 border-red-300 text-red-500'
                      : 'bg-white border-gray-300 hover:border-red-400 text-gray-400'
                  }`}
                  title="좋아요"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {onShare && (
                  <button
                    onClick={() => onShare(course)}
                    className="p-3.5 rounded-lg border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-all cursor-pointer"
                    title="공유하기"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 pt-4">
            <div className="flex gap-8 text-base font-bold">
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`pb-3 transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'curriculum'
                    ? 'border-blue-600 text-blue-600 font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                학습목차
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`pb-3 transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'instructor'
                    ? 'border-blue-600 text-blue-600 font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                강사소개
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-blue-600 text-blue-600 font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                수강후기 ({course.reviewsCount}건)
              </button>
            </div>
          </div>

          {/* TAB CONTENT: Curriculum Table */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4 pt-2">
              <div className="overflow-hidden border border-gray-200 rounded-xl shadow-2xs">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d3748] text-white font-bold text-center text-xs">
                      <th className="py-3.5 px-4 w-20 border-r border-gray-600">NO</th>
                      <th className="py-3.5 px-4 text-left border-r border-gray-600">목차명</th>
                      <th className="py-3.5 px-4 w-28">학습시간</th>
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
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex items-start gap-5 pt-2">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shrink-0 border border-blue-200">
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
            <div className="space-y-4 pt-2">
              {course.reviews.map((review) => (
                <div key={review.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-800">{review.userName}</span>
                    <span className="text-[11px] text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 pt-1">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Sticky Bottom Bar for instant enrollment CTA */}
      <StickyBottomBar
        course={course}
        onOpenConsultation={() => onOpenConsultation?.()}
        onOpenEnrollment={onOpenEnrollment}
        alwaysShow={true}
      />
    </div>
  );
};
