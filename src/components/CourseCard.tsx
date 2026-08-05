import React from 'react';
import { Heart, Share2 } from 'lucide-react';
import { Course } from '../types';

export interface TopRankBadge {
  label: string;
  subLabel?: string;
  icon?: string;
  gradient?: string;
}

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
  onToggleHeart: (courseId: string, e: React.MouseEvent) => void;
  isLiked?: boolean;
  onShare?: (course: Course, e: React.MouseEvent) => void;
  topRankBadge?: TopRankBadge;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelectCourse,
  onToggleHeart,
  isLiked = false,
  onShare,
  topRankBadge
}) => {
  // Extract or formulate badge text lines over the thumbnail bottom-left
  const thumbnailBadge1 = course.categoryLabel || course.badgeTag?.replace('#', '').trim();
  const thumbnailBadge2 = course.subTitle ? course.subTitle.replace(/\[|\]/g, '') : `${course.instructor.split('|')[0]} 마스터`;

  // Determine meta line text: "평생소장 | 약 15시간 | 누구나"
  const validPeriodText = course.validDays >= 365 ? '평생소장' : `${course.validDays}일 수강`;
  const durationText = `약 ${course.durationHours || 15}시간`;
  const targetAudienceText = '누구나';

  return (
    <div
      onClick={() => onSelectCourse(course)}
      className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden relative"
    >
      {/* TOP RANK BADGE HEADER (For Bestseller / Ranking Criteria) */}
      {topRankBadge && (
        <div className={`w-full bg-gradient-to-r ${topRankBadge.gradient || 'from-amber-500 to-amber-600'} text-white font-black px-3.5 py-2 text-xs flex items-center justify-between shadow-xs border-b border-black/10 z-10 shrink-0`}>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{topRankBadge.icon || '👑'}</span>
            <span className="tracking-tight">{topRankBadge.label}</span>
          </div>
          {topRankBadge.subLabel && (
            <span className="bg-black/25 text-white text-[10px] px-2 py-0.5 rounded-md font-extrabold shrink-0">
              {topRankBadge.subLabel}
            </span>
          )}
        </div>
      )}

      {/* 1. THUMBNAIL AREA */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 select-none">
        {/* Background Thumbnail Gradient & Pattern */}
        <div className={`absolute inset-0 bg-gradient-to-br ${course.thumbnailGradient} opacity-95 group-hover:scale-105 transition-transform duration-500`} />

        {/* Abstract Light Accents */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

        {/* THUMBNAIL BOTTOM-LEFT BADGES */}
        <div className="absolute bottom-3 left-3 z-10 flex flex-col items-start gap-1 max-w-[85%] pointer-events-none">
          {thumbnailBadge1 && (
            <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md border border-white/10 truncate max-w-full">
              {thumbnailBadge1}
            </span>
          )}
          {thumbnailBadge2 && (
            <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md border border-white/10 truncate max-w-full">
              {thumbnailBadge2}
            </span>
          )}
        </div>

        {/* THUMBNAIL TOP-RIGHT CONTROLS: Heart Count Pill + Share Button */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          {/* Heart Count Pill */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleHeart(course.id, e);
            }}
            title="좋아요"
            className={`bg-black/50 hover:bg-black/70 backdrop-blur-md text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors border border-white/20 ${
              isLiked ? 'text-red-400' : 'text-white'
            }`}
          >
            <span>{course.heartCount > 10 ? `${course.heartCount}+` : course.heartCount}</span>
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>

          {/* Share Button (Explicitly Maintained as requested) */}
          {onShare && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShare(course, e);
              }}
              title="과정 공유하기"
              className="w-7 h-7 bg-black/50 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center transition-colors shadow-xs backdrop-blur-md cursor-pointer border border-white/20"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. CARD CONTENT BODY */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug mb-1.5 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {course.title}
          </h4>

          {/* Meta Line: 평생소장 | 약 15시간 | 누구나 */}
          <p className="text-xs text-slate-400 font-medium mb-2.5 flex items-center gap-1.5 flex-wrap">
            <span>{validPeriodText}</span>
            <span className="text-slate-300">|</span>
            <span>{durationText}</span>
            <span className="text-slate-300">|</span>
            <span>{targetAudienceText}</span>
          </p>

          {/* Price Line: 51% 219,000원 */}
          <div className="flex items-baseline gap-1.5 mt-1 mb-2.5">
            {course.discountRate > 0 && (
              <span className="text-[#ff2752] font-black text-base md:text-lg">
                {course.discountRate}%
              </span>
            )}
            <span className="text-slate-900 font-black text-base md:text-lg">
              {course.price.toLocaleString()}원
            </span>
            {course.originalPrice > course.price && (
              <span className="text-slate-400 line-through text-xs font-normal ml-1">
                {course.originalPrice.toLocaleString()}원
              </span>
            )}
          </div>
        </div>

        {/* Bottom Badge Pills: NEW / 오프라인 / 평생소장 */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
          <span className="bg-amber-100/70 text-amber-800 border border-amber-200/60 text-[10px] font-extrabold px-2 py-0.5 rounded">
            NEW
          </span>
          {course.title.includes('오프라인') ? (
            <span className="bg-slate-100 text-slate-600 border border-slate-200/60 text-[10px] font-bold px-2 py-0.5 rounded">
              오프라인
            </span>
          ) : (
            <span className="bg-blue-50 text-blue-600 border border-blue-200/60 text-[10px] font-bold px-2 py-0.5 rounded">
              온라인
            </span>
          )}
          {course.validDays >= 365 && (
            <span className="bg-indigo-50 text-indigo-600 border border-indigo-200/60 text-[10px] font-bold px-2 py-0.5 rounded">
              평생소장
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
