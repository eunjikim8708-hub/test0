import React from 'react';
import { Star } from 'lucide-react';

export interface LiveReviewItem {
  id: string;
  rating: number;
  quoteTitle: string;
  comment: string;
  courseTitle: string;
  userName: string;
  userAvatarBg?: string;
}

const RECENT_REVIEWS: LiveReviewItem[] = [
  {
    id: 'rev-1',
    rating: 5,
    quoteTitle: '실무 단체 수강 도입 전에 강의 구조 파악하기 최고입니다',
    comment: '법무팀 직무 체결 및 검토 절차가 실무 사례 위주로 잘 정돈되어 있습니다.',
    courseTitle: '기업 법무 실무 계약 체결 및 검토 과정',
    userName: '전민제',
    userAvatarBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'rev-2',
    rating: 5,
    quoteTitle: '긴 문서에서 핵심 조항만 뽑아내는 팁이 실전적입니다',
    comment: '생성형 AI와 프롬프트 활용으로 문서 요약과 자동화 처리가 정말 쉬워졌어요.',
    courseTitle: '10배 빠른 성과를 만드는 AI 마케팅 실무 마스터',
    userName: '키스톤시큐리티',
    userAvatarBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'rev-3',
    rating: 5,
    quoteTitle: '개발 환경 세팅부터 막힘없이 따라갈 수 있습니다',
    comment: '비전공자도 부담 없이 실무 자동화 스크립트를 완성할 수 있는 최적의 강의입니다.',
    courseTitle: '파이썬 데이터 분석 & 실무 자동화',
    userName: '성훈나',
    userAvatarBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'rev-4',
    rating: 5,
    quoteTitle: '딕션도 좋으시고 핵심 실무 위주 설명이라 최고입니다!',
    comment: '실무에서 당장 쓰는 핵심 프레임워크만 콕 짚어주셔서 업무시간이 크게 단축되었어요.',
    courseTitle: '프롬프트 엔지니어링 비즈니스 활용',
    userName: '수철',
    userAvatarBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'rev-5',
    rating: 5,
    quoteTitle: '어렵지 않아서 혼자 독학하기에 너무 좋아요',
    comment: '실무 눈높이에 딱 맞춘 설명 덕분에 중간에 포기하지 않고 끝까지 완강했습니다!',
    courseTitle: '피그마 UI/UX 실전 프로토타이핑',
    userName: '김진헌',
    userAvatarBg: 'bg-amber-100 text-amber-800'
  }
];

interface RecentReviewsSectionProps {
  onSelectCourseByTitle?: (title: string) => void;
}

export const RecentReviewsSection: React.FC<RecentReviewsSectionProps> = ({
  onSelectCourseByTitle
}) => {
  return (
    <section className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-200 space-y-5">
      {/* Title Header matching prompt requirements */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span className="text-amber-500">⭐</span>
            <span>생생한 수강후기</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
            강의를 들을까 고민될 때 참고해보세요
          </p>
        </div>
      </div>

      {/* 5 Review Cards Grid (All Unified Yellow Review Cards, No Time Display) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-1">
        {RECENT_REVIEWS.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => onSelectCourseByTitle?.(item.courseTitle)}
              className="rounded-2xl p-4 flex flex-col justify-between bg-amber-50/40 border border-amber-200/80 hover:border-amber-400 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div>
                {/* Card Top Badge: 수강평 (Yellow Style) - No Time Ago */}
                <div className="flex items-center justify-between text-xs font-bold mb-2.5">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200/60">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>수강평</span>
                  </div>
                </div>

                {/* Stars Rating */}
                <div className="flex items-center gap-0.5 text-amber-400 mb-2">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Title */}
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 mb-1.5 group-hover:text-amber-900 transition-colors">
                  {item.quoteTitle}
                </h4>

                {/* Comment Detail */}
                <p className="text-[11px] text-slate-600 font-normal line-clamp-2 mb-3 leading-relaxed">
                  {item.comment}
                </p>
              </div>

              {/* Bottom Course Meta */}
              <div className="pt-2.5 border-t border-amber-200/60 mt-auto">
                <p className="text-[11px] text-slate-500 font-bold truncate mb-1.5 group-hover:text-amber-700 transition-colors" title={item.courseTitle}>
                  {item.courseTitle}
                </p>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 border border-amber-300 ${
                      item.userAvatarBg || 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.userName.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-slate-700 truncate">
                    {item.userName}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
