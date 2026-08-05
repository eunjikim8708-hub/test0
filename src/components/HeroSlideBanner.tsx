import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  FileText,
  ArrowRight,
  BookOpen,
  Building2,
  Award,
  GraduationCap
} from 'lucide-react';

interface SlideItem {
  id: number;
  badge: string;
  badgeBg?: string;
  title: string;
  subtitle: string;
  btn1Text: string;
  btn1Action: () => void;
  btn1Icon?: React.ElementType;
  btn2Text?: string;
  btn2Action?: () => void;
  btn2Icon?: React.ElementType;
  bgGradient: string;
  graphicIcon: React.ElementType;
}

interface HeroSlideBannerProps {
  onOpenConsultation: () => void;
  onOpenQuiz: () => void;
  onSelectTab: (tab: string) => void;
}

export const HeroSlideBanner: React.FC<HeroSlideBannerProps> = ({
  onOpenConsultation,
  onOpenQuiz,
  onSelectTab
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  const slides: SlideItem[] = [
    {
      id: 1,
      badge: '기업 단체수강 특별 혜택',
      title: '5인 이상 단체수강 시\n최대 30% 추가 할인\n+ 맞춤 커리큘럼 제공',
      subtitle: '법무팀 전체가 함께 성장하는 기업 교육 솔루션 — 기업 수요에 맞는 맞춤형 과정 설계와 전담 매니저를 지원합니다.',
      btn1Text: '단체수강 문의하기',
      btn1Action: onOpenConsultation,
      btn1Icon: PhoneCall,
      btn2Text: '도입 사례 보기',
      btn2Action: () => onSelectTab('courses'),
      btn2Icon: FileText,
      bgGradient: 'from-[#17062b] via-[#120422] to-[#0a0214]',
      graphicIcon: Users
    },
    {
      id: 2,
      badge: 'AI 30초 맞춤 과정 진단',
      title: '나에게 딱 맞는 IT·직무 강의는?\nAI 맞춤 진단 & 10% 쿠폰',
      subtitle: '30초간의 간단한 진단으로 나만의 맞춤 커리큘럼과 수강 결제 시 사용 가능한 10% 추가 할인 쿠폰을 받아보세요.',
      btn1Text: '맞춤 과정 진단받기',
      btn1Action: onOpenQuiz,
      btn1Icon: Sparkles,
      btn2Text: '전체 강좌 보기',
      btn2Action: () => onSelectTab('courses'),
      btn2Icon: BookOpen,
      bgGradient: 'from-[#0d1b3e] via-[#09132d] to-[#040817]',
      graphicIcon: Sparkles
    },
    {
      id: 3,
      badge: '2026 하반기 신규 교육과정',
      title: '현업 실무에 즉시 적용하는\nGenerative AI & 파이썬 마스터',
      subtitle: '최신 인공지능 트렌드와 데이터 분석 실무 프로젝트 — 검증된 전문 마스터의 차별화된 1:1 학습 멘토링 지원.',
      btn1Text: '신규 과정 살펴보기',
      btn1Action: () => onSelectTab('courses'),
      btn1Icon: GraduationCap,
      btn2Text: '단체/기업 문의',
      btn2Action: onOpenConsultation,
      btn2Icon: Building2,
      bgGradient: 'from-[#05232a] via-[#03181d] to-[#010c0e]',
      graphicIcon: GraduationCap
    },
    {
      id: 4,
      badge: '기업 법무·리걸 마인드 특화',
      title: '기업 법무 실무 계약 체결 및\n미국변호사 시험 종합 과정',
      subtitle: '국내 최고 수준의 기업 법무 전문 교육원 — 계약서 검토, 분쟁 예방, 미국법 기초부터 체계적으로 완성합니다.',
      btn1Text: '법무 과정 전체보기',
      btn1Action: () => onSelectTab('courses'),
      btn1Icon: Award,
      btn2Text: '무료 학습상담',
      btn2Action: onOpenConsultation,
      btn2Icon: PhoneCall,
      bgGradient: 'from-[#2b0818] via-[#1f0410] to-[#120108]',
      graphicIcon: Award
    }
  ];

  const totalSlides = slides.length;

  // Auto-play timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(currentProgress);
      }, 50);

      timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setProgress(0);
      }, SLIDE_DURATION);
    } else {
      setProgress(0);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentSlide, isPlaying, totalSlides]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  };

  const slide = slides[currentSlide];
  const GraphicIconComp = slide.graphicIcon;

  return (
    <div className="w-full relative bg-slate-950 overflow-hidden text-white select-none">
      {/* MAIN BANNER CAROUSEL AREA */}
      <div className={`w-full transition-all duration-700 bg-gradient-to-r ${slide.bgGradient} relative min-h-[300px] md:min-h-[360px] flex items-center`}>
        {/* Decorative Background Geometric Pattern (Dot grid + Large Chevron overlay like reference photo) */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden sm:block overflow-hidden">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1.5 font-mono text-purple-300 text-xs">
            {Array.from({ length: 14 }).map((_, r) => (
              <div key={r} className="flex gap-2 opacity-80">
                {Array.from({ length: 24 }).map((_, c) => {
                  const isChevron = Math.abs(r - 7) === Math.floor(c / 2);
                  return (
                    <span
                      key={c}
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        isChevron ? 'bg-amber-400 opacity-100 scale-125' : 'bg-purple-300/40'
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto w-full px-5 md:px-8 py-8 md:py-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Text & Actions */}
          <div className="space-y-4 md:space-y-5 max-w-2xl text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-600/90 text-white text-xs md:text-sm font-extrabold px-3 py-1.5 rounded-md shadow-md backdrop-blur-xs">
              <span className="text-base">🏢</span>
              <span>{slide.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight whitespace-pre-line">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-purple-100/80 font-normal leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={slide.btn1Action}
                className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-purple-900/50 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                {slide.btn1Icon && <slide.btn1Icon className="w-4 h-4 text-white" />}
                <span>{slide.btn1Text}</span>
              </button>

              {slide.btn2Text && (
                <button
                  onClick={slide.btn2Action}
                  className="bg-black/40 hover:bg-black/60 text-white border border-white/30 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                >
                  {slide.btn2Icon && <slide.btn2Icon className="w-4 h-4 text-purple-300" />}
                  <span>{slide.btn2Text}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Icon Visual Box */}
          <div className="hidden md:flex items-center justify-center relative shrink-0 mr-8">
            <div className="w-36 h-36 rounded-full bg-purple-900/30 border-2 border-purple-500/30 flex items-center justify-center text-purple-200 shadow-2xl relative group">
              <div className="absolute inset-0 rounded-full bg-purple-500/10 animate-ping pointer-events-none" />
              <GraphicIconComp className="w-16 h-16 text-purple-300 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SLIDE CONTROL BAR (Exact match to reference photo layout) */}
      <div className="w-full bg-black/90 border-t border-white/10 px-4 md:px-8 py-2.5 flex items-center justify-between gap-4 text-xs font-mono">
        {/* Slide Counter on Left */}
        <div className="flex items-center gap-1 font-bold text-white shrink-0 text-xs md:text-sm">
          <span className="text-white font-extrabold">{currentSlide + 1}</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">{totalSlides}</span>
        </div>

        {/* Progress Bar Segments */}
        <div className="flex-1 flex items-center gap-1.5 sm:gap-2 max-w-3xl">
          {slides.map((s, idx) => {
            const isActive = idx === currentSlide;
            const isPassed = idx < currentSlide;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentSlide(idx);
                  setProgress(0);
                }}
                className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:bg-white/40 transition-colors relative"
              >
                <div
                  className={`h-full bg-white transition-all duration-75 ${
                    isPassed ? 'w-full' : isActive ? '' : 'w-0'
                  }`}
                  style={{
                    width: isActive ? `${progress}%` : isPassed ? '100%' : '0%'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Play/Pause & Prev/Next Arrow Buttons on Right */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? '일시정지' : '재생'}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
          </button>

          <button
            onClick={handlePrev}
            aria-label="이전 슬라이드"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            aria-label="다음 슬라이드"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
