import React, { useState, useEffect } from 'react';
import { Course } from '../types';

interface StickyBottomBarProps {
  course: Course;
  onOpenConsultation: () => void;
  onOpenEnrollment: (course: Course) => void;
  alwaysShow?: boolean;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  course,
  onOpenConsultation,
  onOpenEnrollment,
  alwaysShow = false
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(alwaysShow);

  useEffect(() => {
    if (alwaysShow) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysShow]);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30 transition-transform duration-300 flex justify-center ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-6xl w-full px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side Info */}
        <div className="flex items-center gap-6 text-left w-full md:w-auto">
          <div className="hidden lg:block">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">SELECTED COURSE</p>
            <p className="text-sm font-bold text-gray-800 line-clamp-1 max-w-xs">
              {course.subTitle ? `${course.subTitle} ${course.title}` : course.title}
            </p>
          </div>
          <div className="hidden lg:block h-8 w-px bg-gray-200 mx-1"></div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-blue-600">
              {course.price.toLocaleString()}원
            </span>
            <span className="text-gray-400 line-through text-xs md:text-sm">
              {course.originalPrice.toLocaleString()}원
            </span>
            {course.discountRate > 0 && (
              <span className="text-red-500 font-bold text-xs bg-red-50 px-1.5 py-0.5 rounded">
                {course.discountRate}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Recommendation Hover Tooltip */}
          <div className="relative group hidden sm:block">
            <button className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 text-xs md:text-sm transition-colors">
              💡 추천
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-52 bg-gray-900 text-white text-xs p-2.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center leading-tight">
              이 과정과 함께 '{course.recommendedWith || '파이썬 입문'}'을(를) 많이 수강합니다.
            </div>
          </div>

          {/* 1:1 Consultation Request Button */}
          <button
            onClick={onOpenConsultation}
            className="flex-1 md:flex-none px-5 py-2.5 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors text-xs md:text-sm whitespace-nowrap"
          >
            1:1 상담신청
          </button>

          {/* Enrollment Button */}
          <button
            onClick={() => onOpenEnrollment(course)}
            className="flex-1 md:flex-none px-8 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-shadow shadow-md text-xs md:text-sm whitespace-nowrap"
          >
            지금 바로 수강하기
          </button>
        </div>
      </div>
    </div>
  );
};
