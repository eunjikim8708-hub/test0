import React, { useState } from 'react';
import {
  ClipboardList,
  HelpCircle,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Volume2,
  FileText,
  Ribbon,
  Users,
  Search,
  Filter,
  ArrowRight,
  BookOpen,
  Award,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { Header } from './components/Header';
import { CourseCard } from './components/CourseCard';
import { CourseDetailPage } from './components/CourseDetailPage';
import { QuizModal } from './components/QuizModal';
import { StickyBottomBar } from './components/StickyBottomBar';
import { ConsultationModal } from './components/ConsultationModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { QuickMenu } from './components/QuickMenu';
import { HeroSlideBanner } from './components/HeroSlideBanner';
import { RecentReviewsSection } from './components/RecentReviewsSection';
import { NoticeFaqSection } from './components/NoticeFaqSection';
import { AdminLeadDrawer } from './components/AdminLeadDrawer';
import { ShareModal } from './components/ShareModal';
import { INITIAL_COURSES } from './data/courses';
import { Course, LeadSubmission, PersonaInfo } from './types';

export default function App() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Pages state
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState<boolean>(false);
  const [enrollmentCourse, setEnrollmentCourse] = useState<Course | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [shareCourse, setShareCourse] = useState<Course | null>(null);
  const [matchedPersona, setMatchedPersona] = useState<PersonaInfo | null>(null);

  // Helper function to resolve Persona courses to full Course objects for rendering
  const getRecommendedCoursesForPersona = (persona: PersonaInfo, allCourses: Course[]): Course[] => {
    if (!persona || !persona.courses) return [];
    return persona.courses.map((pc, idx) => {
      const matched = allCourses.find(c => c.title.includes(pc.title) || pc.title.includes(c.title));
      if (matched) return matched;
      return {
        id: `rec-course-${idx}`,
        title: pc.title,
        subTitle: `[${pc.difficulty || '실무'} · ${pc.duration || '10시간'}]`,
        category: 'ai',
        categoryLabel: pc.cat || '맞춤 추천',
        badgeTag: pc.tag ? `# ${pc.tag}` : '# AI 맞춤추천',
        thumbnailGradient: idx % 2 === 0 ? 'from-indigo-600 via-purple-700 to-slate-900' : 'from-blue-600 via-indigo-800 to-slate-900',
        instructor: 'ONESNC 마스터 강사',
        price: 210000,
        originalPrice: 300000,
        discountRate: 30,
        studentsCount: 350 + idx * 120,
        heartCount: 45 + idx * 12,
        reviewsCount: 28 + idx * 8,
        rating: pc.rating || 4.9,
        durationHours: parseInt(pc.duration) || 10,
        chaptersCount: 5,
        validDays: 60,
        completionRate: '진도 100% 이상 수료',
        description: `${pc.title} - ${persona.subtitle}`,
        tags: ['# AI 맞춤추천', `# ${pc.cat}`, '# 직무성장'],
        curriculum: [
          { no: 1, title: '핵심 개념 및 트렌드 파악', duration: '45분' },
          { no: 2, title: '실무 예제로 익히는 핵심 기술', duration: '50분' },
          { no: 3, title: '실전 프로젝트 적용 가이드', duration: '60분' }
        ],
        reviews: []
      } as Course;
    });
  };

  // User state & Login state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('김수민');
  const [userPhone, setUserPhone] = useState<string>('010-1234-5678');
  const [likedCourseIds, setLikedCourseIds] = useState<string[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);

  // Sample Leads
  const [leads, setLeads] = useState<LeadSubmission[]>([
    {
      id: 'lead-101',
      name: '김원앤',
      phone: '01098765432',
      interestField: 'AI / 데이터 분석',
      targetGoal: '현업 업무 효율 향상',
      recommendedCourseTitle: '10배 빠른 성과를 만드는 AI 마케팅 실무 마스터',
      couponCode: 'ONESNC-AI10-8821',
      submittedAt: '2024.07.27 14:20',
      type: 'quiz_lead',
      status: '쿠폰발급'
    },
    {
      id: 'lead-102',
      name: '이엔씨',
      companyName: '(주)한국IT전략',
      phone: '01012345678',
      interestField: '1:1 맞춤 교육 상담',
      targetGoal: '기업/개인 맞춤 과정 설계',
      recommendedCourseTitle: '성과 중심 모던 리더십 마스터 클래스',
      couponCode: 'CONSULT-VIP',
      submittedAt: '2024.07.27 16:05',
      type: 'consultation_request',
      message: '팀장급 15명 출강 및 단체 수강 할인가 문의드립니다.',
      status: '상담대기'
    }
  ]);

  // Handle Heart Toggle
  const handleToggleHeart = (courseId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const isLiked = likedCourseIds.includes(courseId);
    setLikedCourseIds((prev) =>
      isLiked ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );

    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            heartCount: isLiked ? Math.max(0, c.heartCount - 1) : c.heartCount + 1
          };
        }
        return c;
      })
    );
  };

  // Lead Handlers
  const handleAddLead = (newLead: LeadSubmission) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (leadId: string, status: LeadSubmission['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  };

  const handleClearLeads = () => {
    if (confirm('모든 접수된 리드 데이터를 초기화하시겠습니까?')) {
      setLeads([]);
    }
  };

  // Course Card Click -> Open Full Course Detail Page
  const handleSelectCourse = (course: Course) => {
    setSelectedCourseDetail(course);
    setCurrentTab('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter Logic
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'all' || course.category === selectedCategory;
    const matchesTag =
      selectedTag === 'all' || course.tags.includes(selectedTag) || course.badgeTag === selectedTag;
    const matchesSearch =
      !searchQuery.trim() ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased flex flex-col justify-between">
      {/* 1. Header Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'course-detail') {
            setSelectedCourseDetail(null);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openQuizModal={() => setIsQuizModalOpen(true)}
        openAdminModal={() => setIsAdminOpen(true)}
        leadCount={leads.length}
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => setIsLoggedIn(!isLoggedIn)}
        userName={userName}
      />

      {/* 2. PAGE ROUTING */}
      {/* CASE A: Course Detail Page View */}
      {currentTab === 'course-detail' && selectedCourseDetail ? (
        <CourseDetailPage
          course={selectedCourseDetail}
          onBack={() => {
            setCurrentTab('courses');
            setSelectedCourseDetail(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenEnrollment={(c) => setEnrollmentCourse(c)}
          onToggleHeart={(id) => handleToggleHeart(id)}
          isLiked={likedCourseIds.includes(selectedCourseDetail.id)}
          onShare={(c) => setShareCourse(c)}
        />
      ) : currentTab === 'courses' ? (
        /* CASE B: Full Courses List Page View */
        <div className="flex-1">
          {/* Subpage Banner */}
          <header className="bg-slate-900 text-white py-12 px-6 md:px-10 border-b border-slate-800 text-center">
            <div className="max-w-4xl mx-auto space-y-3">
              <span className="bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                ONESNC CURRICULUM
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                전체 교육과정 목록
              </h1>
              <p className="text-slate-400 text-xs md:text-sm">
                원하는 직무 분야, 카테고리 또는 키워드로 맞춤형 직무 강의를 검색해 보세요.
              </p>
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-4 py-8 space-y-8 pb-32">
            <section className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-200 space-y-6">
              
              {/* Search Bar Input */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="강의명, 키워드, 카테고리 검색 (예: 엑셀, AI, 파이썬, 법률)"
                  className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm bg-gray-50/50 shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Circle Category Filter Icons */}
              <div className="flex items-center gap-4 overflow-x-auto pb-3 pt-2 scrollbar-none justify-start md:justify-center">
                {[
                  { id: 'all', label: '전체', icon: CheckCircle2, color: 'bg-blue-600 text-white' },
                  { id: 'legal', label: '법률기초 교육', icon: Volume2, color: 'bg-blue-500 text-white' },
                  { id: 'job_legal', label: '직무별 법 교육', icon: Briefcase, color: 'bg-amber-600 text-white' },
                  { id: 'ethics', label: '준법/윤리 교육', icon: FileText, color: 'bg-sky-500 text-white' },
                  { id: 'leadership', label: '리더십 교육', icon: Users, color: 'bg-orange-500 text-white' },
                  { id: 'ai', label: 'AI / IT 교육', icon: Sparkles, color: 'bg-indigo-600 text-white' },
                ].map((cat) => {
                  const IconComponent = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSelectedTag('all');
                      }}
                      className="flex flex-col items-center gap-2 group shrink-0 min-w-[72px] cursor-pointer"
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-2xs ${
                          isSelected
                            ? 'ring-4 ring-blue-600/30 scale-105 ' + cat.color
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                        }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-xs font-bold transition-colors ${
                          isSelected ? 'text-blue-600 font-extrabold' : 'text-gray-600 group-hover:text-gray-900'
                        }`}
                      >
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tag Filter Pills */}
              <div className="flex flex-wrap gap-2 pt-1 justify-center">
                {[
                  { tag: 'all', label: '전체' },
                  { tag: '# 법률기초 교육', label: '# 법률기초 교육' },
                  { tag: '# AI 마케팅 교육', label: '# AI 마케팅 교육' },
                  { tag: '# 직무별 법 교육', label: '# 직무별 법 교육' },
                  { tag: '# 인사', label: '# 인사' },
                  { tag: '# 준법/윤리 교육', label: '# 준법/윤리 교육' },
                  { tag: '# 리더십 교육', label: '# 리더십 교육' },
                  { tag: '# IT실무', label: '# IT실무' },
                ].map((pill) => (
                  <button
                    key={pill.tag}
                    onClick={() => setSelectedTag(pill.tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedTag === pill.tag
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Course Grid Results */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-gray-500 font-semibold">
                    총 <strong className="text-blue-600 font-bold">{filteredCourses.length}</strong>개의 교육과정이 검색되었습니다.
                  </div>
                  {(selectedCategory !== 'all' || selectedTag !== 'all' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedTag('all');
                        setSearchQuery('');
                      }}
                      className="text-xs text-gray-500 hover:text-blue-600 underline font-medium cursor-pointer"
                    >
                      필터 초기화
                    </button>
                  )}
                </div>

                {filteredCourses.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 font-bold text-base">검색 조건과 일치하는 교육과정이 없습니다.</p>
                    <p className="text-gray-400 text-xs mt-1">다른 키워드나 필터 조건을 선택해 보세요.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onSelectCourse={handleSelectCourse}
                        onToggleHeart={handleToggleHeart}
                        isLiked={likedCourseIds.includes(course.id)}
                        onShare={(c) => setShareCourse(c)}
                      />
                    ))}
                  </div>
                )}
              </div>

            </section>
          </main>
        </div>
      ) : currentTab === 'company' || currentTab === 'intro' || currentTab === 'mylearning' || currentTab === 'support' || currentTab === 'offline' ? (
        /* CASE C: Subpages View (Informational) */
        <div className="flex-1 max-w-6xl mx-auto px-4 py-12 space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-200 text-center space-y-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
              ONESNC EDU
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {currentTab === 'company' && '회사소개'}
              {currentTab === 'intro' && '교육소개'}
              {currentTab === 'mylearning' && '나의학습방'}
              {currentTab === 'support' && '수강후기 & 만족도'}
              {currentTab === 'offline' && '고객센터 & 1:1 상담'}
            </h1>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              {currentTab === 'mylearning' ? '수강 신청한 강의와 학습 진행률을 실시간으로 확인하실 수 있습니다.' : '대한민국 1위 직무 혁신 교육 파트너 (주)원앤스엔씨 EDU 입니다.'}
            </p>
            <div className="pt-6 flex justify-center gap-4">
              <button
                onClick={() => setCurrentTab('courses')}
                className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-colors cursor-pointer"
              >
                전체 교육과정 둘러보기
              </button>
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="border border-gray-300 text-gray-700 font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer"
              >
                1:1 문의하기
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* CASE D: Home Main Page View */
        <>
          {/* Main Hero Slide Banner */}
          <HeroSlideBanner
            onOpenConsultation={() => setIsConsultationModalOpen(true)}
            onOpenQuiz={() => setIsQuizModalOpen(true)}
            onSelectTab={(tab) => setCurrentTab(tab)}
          />

          {/* Top Lead Generation Curation Banner */}
          <div
            onClick={() => setIsQuizModalOpen(true)}
            className="bg-blue-600 text-white flex items-center justify-between px-6 md:px-10 py-4.5 flex-shrink-0 border-b border-blue-700 shadow-lg z-10 cursor-pointer hover:bg-blue-700 transition-colors"
          >
            <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="bg-white/20 p-2 rounded-full hidden sm:flex shrink-0 items-center justify-center">
                  <span className="text-xl">{matchedPersona ? '🎯' : '💡'}</span>
                </div>
                <div>
                  <h2 className="font-bold text-base md:text-lg flex items-center justify-center sm:justify-start gap-2">
                    <span>
                      {matchedPersona
                        ? `${userName || '김수민'}님 맞춤 진단 추천 강좌가 준비되었습니다!`
                        : '나에게 딱 맞는 IT·직무 강의는 무엇일까요?'}
                    </span>
                    <span className="bg-yellow-300 text-blue-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-2xs">
                      {matchedPersona ? '진단 완료' : 'AI 30초 진단'}
                    </span>
                  </h2>
                  <p className="text-blue-100 text-xs md:text-sm opacity-90">
                    {matchedPersona
                      ? '하단 [맞춤 추천 강좌] 영역에서 나만의 커리큘럼을 확인해 보세요.'
                      : '30초 진단으로 맞춤 커리큘럼과 10% 할인 쿠폰을 받아보세요.'}
                  </p>
                </div>
              </div>
              <button className="bg-white text-blue-700 font-bold px-6 md:px-8 py-2.5 rounded-full text-xs md:text-sm hover:bg-blue-50 transition-colors shadow-xl shrink-0 whitespace-nowrap cursor-pointer">
                {matchedPersona ? '진단 결과 확인 / 다시하기 ➔' : '맞춤 강의 추천받기 ➔'}
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 bg-gray-50 py-8 md:py-10 px-4 md:px-8 transition-colors">
            <div className="max-w-6xl mx-auto space-y-8 pb-32">
              
              {/* CONTAINER 1: Quick Menu */}
              <section className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-200 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      빠른 메뉴
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                      자주 찾는 메뉴를 빠르게 이용해보세요.
                    </p>
                  </div>

                  {/* Quick Action Icons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                    <button
                      onClick={() => setCurrentTab('mylearning')}
                      className="flex flex-col items-center gap-2 group p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="w-13 h-13 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform shadow-2xs">
                        <ClipboardList className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 group-hover:text-emerald-700">
                        나의학습방
                      </span>
                    </button>

                    <button
                      onClick={() => setIsConsultationModalOpen(true)}
                      className="flex flex-col items-center gap-2 group p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="w-13 h-13 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform shadow-2xs">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 group-hover:text-blue-700">
                        FAQ / 문의
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCategory('job_legal');
                        setCurrentTab('courses');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex flex-col items-center gap-2 group p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="w-13 h-13 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center text-amber-700 group-hover:scale-105 transition-transform shadow-2xs">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 group-hover:text-amber-800">
                        직무별 법 교육
                      </span>
                    </button>

                    <button
                      onClick={() => setIsConsultationModalOpen(true)}
                      className="flex flex-col items-center gap-2 group p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="w-13 h-13 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform shadow-2xs">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 group-hover:text-purple-700">
                        1:1 맞춤 컨설팅
                      </span>
                    </button>
                  </div>
                </div>
              </section>

              {/* CONTAINER 1.5: 맞춤 추천 강좌 (맞춤 과정 진단 선택 후 베스트셀러 상단에 노출) */}
              {matchedPersona && (
                <section className="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-indigo-500/30 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/80 pb-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-extrabold px-3 py-1 rounded-full mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>{userName || '김수민'}님을 위한 AI 맞춤 추천 강좌</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                        🎯 {matchedPersona.title}
                      </h3>
                      <p className="text-xs md:text-sm text-indigo-200/80 mt-1 font-medium">
                        {matchedPersona.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsQuizModalOpen(true)}
                      className="self-start sm:self-auto bg-white/10 hover:bg-white/20 text-indigo-200 border border-indigo-300/30 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-indigo-300" />
                      <span>진단 다시하기</span>
                    </button>
                  </div>

                  {/* Recommended Course Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {getRecommendedCoursesForPersona(matchedPersona, courses).slice(0, 3).map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onSelectCourse={handleSelectCourse}
                        onToggleHeart={handleToggleHeart}
                        isLiked={likedCourseIds.includes(course.id)}
                        onShare={(c) => setShareCourse(c)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* CONTAINER 2: Real-Time Bestsellers */}
              <section className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-200">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">🔥 실시간 베스트셀러</h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">수강생 반응과 성율 기반 3대 핵심 지표 1위 강좌입니다.</p>
                  </div>
                  <span 
                    onClick={() => {
                      setCurrentTab('courses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className="text-sm text-blue-600 font-bold cursor-pointer hover:underline flex items-center gap-1"
                  >
                    <span>전체보기</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {(() => {
                    const c1 = courses.find((c) => c.id === 'course-4') || courses[0];
                    const c2 = courses.find((c) => c.id === 'course-2') || courses[1];
                    const c3 = courses.find((c) => c.id === 'course-3') || courses[2];

                    const bestsellerItems = [
                      {
                        course: c1,
                        badge: {
                          label: '가장 많은 수강생 강의 NO.1',
                          subLabel: `${c1.studentsCount?.toLocaleString() || '1,420'}명 수강`,
                          icon: '🥇',
                          gradient: 'from-amber-500 via-amber-600 to-orange-600'
                        }
                      },
                      {
                        course: c2,
                        badge: {
                          label: '가장 많은 후기 강의 NO.1',
                          subLabel: `후기 ${c2.reviewsCount || '385'}개`,
                          icon: '💬',
                          gradient: 'from-blue-600 via-indigo-600 to-purple-600'
                        }
                      },
                      {
                        course: c3,
                        badge: {
                          label: '가장 수료율 높은 강의 NO.1',
                          subLabel: c3.completionRate || '수료율 99.4%',
                          icon: '🏆',
                          gradient: 'from-emerald-600 via-teal-600 to-cyan-700'
                        }
                      }
                    ];

                    return bestsellerItems.map(({ course, badge }) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onSelectCourse={handleSelectCourse}
                        onToggleHeart={handleToggleHeart}
                        isLiked={likedCourseIds.includes(course.id)}
                        onShare={(c) => setShareCourse(c)}
                        topRankBadge={badge}
                      />
                    ));
                  })()}
                </div>
              </section>

              {/* CONTAINER 3: 신규 강의 (검색란 삭제, 카테고리 필터 유지, 최대 3개 과정카드 노출 & 더보기) */}
              <section className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-200 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                      <span>✨ 신규 강의</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                        NEW
                      </span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                      최신 비즈니스 트렌드와 직무 노하우를 담은 신규 교육과정입니다.
                    </p>
                  </div>

                  {filteredCourses.length >= 3 && (
                    <button
                      onClick={() => {
                        setCurrentTab('courses');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      <span>신규 과정 전체보기 ({filteredCourses.length})</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Circle Category Filter Icons */}
                <div className="flex items-center gap-4 overflow-x-auto pb-3 pt-2 scrollbar-none">
                  {[
                    { id: 'all', label: '전체', icon: CheckCircle2, color: 'bg-blue-600 text-white' },
                    { id: 'legal', label: '법률기초 교육', icon: Volume2, color: 'bg-blue-500 text-white' },
                    { id: 'job_legal', label: '직무별 법 교육', icon: Briefcase, color: 'bg-amber-600 text-white' },
                    { id: 'ethics', label: '준법/윤리 교육', icon: FileText, color: 'bg-sky-500 text-white' },
                    { id: 'leadership', label: '리더십 교육', icon: Users, color: 'bg-orange-500 text-white' },
                    { id: 'ai', label: 'AI / IT 교육', icon: Sparkles, color: 'bg-indigo-600 text-white' },
                  ].map((cat) => {
                    const IconComponent = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSelectedTag('all');
                        }}
                        className="flex flex-col items-center gap-2 group shrink-0 min-w-[72px] cursor-pointer"
                      >
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-2xs ${
                            isSelected
                              ? 'ring-4 ring-blue-600/30 scale-105 ' + cat.color
                              : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                          }`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span
                          className={`text-xs font-bold transition-colors ${
                            isSelected ? 'text-blue-600 font-extrabold' : 'text-gray-600 group-hover:text-gray-900'
                          }`}
                        >
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Tag Filter Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { tag: 'all', label: '전체' },
                    { tag: '# 법률기초 교육', label: '# 법률기초 교육' },
                    { tag: '# AI 마케팅 교육', label: '# AI 마케팅 교육' },
                    { tag: '# 직무별 법 교육', label: '# 직무별 법 교육' },
                    { tag: '# 인사', label: '# 인사' },
                    { tag: '# 준법/윤리 교육', label: '# 준법/윤리 교육' },
                    { tag: '# 리더십 교육', label: '# 리더십 교육' },
                    { tag: '# IT실무', label: '# IT실무' },
                  ].map((pill) => (
                    <button
                      key={pill.tag}
                      onClick={() => setSelectedTag(pill.tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        selectedTag === pill.tag
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>

                {/* Max 3 Cards Grid Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                  {filteredCourses.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-400 text-sm font-medium">
                      선택한 카테고리에 일치하는 신규 교육과정이 없습니다.
                    </div>
                  ) : (
                    filteredCourses.slice(0, 3).map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onSelectCourse={handleSelectCourse}
                        onToggleHeart={handleToggleHeart}
                        isLiked={likedCourseIds.includes(course.id)}
                        onShare={(c) => setShareCourse(c)}
                      />
                    ))
                  )}
                </div>

                {/* 'More' (더보기) Button if 3 or more courses match */}
                {filteredCourses.length >= 3 && (
                  <div className="pt-6 border-t border-gray-100 text-center">
                    <button
                      onClick={() => {
                        setCurrentTab('courses');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-8 py-3.5 rounded-xl text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                    >
                      <span>신규 교육과정 전체보기 ({filteredCourses.length}개)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </section>

              {/* CONTAINER 4: 최근 수강후기 (신규강의 하단) */}
              <RecentReviewsSection
                onSelectCourseByTitle={(title) => {
                  const target = courses.find((c) => c.title.includes(title) || title.includes(c.title)) || courses[0];
                  handleSelectCourse(target);
                }}
              />

              {/* CONTAINER 5: 공지사항 & 자주 묻는 질문 (FAQ) */}
              <NoticeFaqSection />

            </div>
          </main>
        </>
      )}

      {/* 3. Sticky Bottom Bar (Runs ONLY on Course Detail Page) */}
      {currentTab === 'course-detail' && selectedCourseDetail && (
        <StickyBottomBar
          course={selectedCourseDetail}
          onOpenConsultation={() => setIsConsultationModalOpen(true)}
          onOpenEnrollment={(c) => setEnrollmentCourse(c)}
          alwaysShow={true}
        />
      )}

      {/* 4. Modals & Widgets */}
      {/* Quiz Curation Lead Generation Modal */}
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        courses={courses}
        onAddLead={handleAddLead}
        onApplyCoupon={(code) => setActiveCoupon(code)}
        userName={userName}
        userPhone={userPhone}
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
        onUpdateUserName={(newName) => setUserName(newName)}
        onCompleteQuizResult={(persona) => setMatchedPersona(persona)}
      />

      {/* 1:1 Consultation Request Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        courses={courses}
        onAddLead={handleAddLead}
        isLoggedIn={isLoggedIn}
        userProfile={{ name: userName, phone: userPhone }}
      />

      {/* Enrollment Checkout Modal */}
      <EnrollmentModal
        course={enrollmentCourse}
        onClose={() => setEnrollmentCourse(null)}
        activeCoupon={activeCoupon}
        onAddLead={handleAddLead}
      />

      {/* User Floating Quick Menu (퀵메뉴) */}
      <QuickMenu
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isLoggedIn={isLoggedIn}
      />

      {/* Admin Lead Management Drawer */}
      <AdminLeadDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        leads={leads}
        onUpdateStatus={handleUpdateLeadStatus}
        onClearLeads={handleClearLeads}
      />

      {/* Course Share Modal */}
      <ShareModal
        course={shareCourse}
        isOpen={!!shareCourse}
        onClose={() => setShareCourse(null)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 text-xs border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white">ONESNC</span>
              <span className="text-slate-400 font-semibold">(주)원앤스엔씨 EDU</span>
            </div>
            <div className="flex gap-4 text-slate-300 font-medium">
              <button className="hover:text-white cursor-pointer">이용약관</button>
              <span>|</span>
              <button className="hover:text-white font-bold text-white cursor-pointer">개인정보처리방침</button>
              <span>|</span>
              <button className="hover:text-white cursor-pointer">고객센터</button>
            </div>
          </div>

          <div className="space-y-1 text-slate-500 leading-relaxed">
            <p>(주)원앤스엔씨 | 대표자: 홍길동 | 사업자등록번호: 123-86-00000 | 통신판매업신고: 2024-서울영등포-0000호</p>
            <p>주소: 서울특별시 영등포구 선유동2로 12 원앤스엔씨 타워 5층 | 고객센터: 1588-0000 (평일 09:00 - 18:00)</p>
            <p className="pt-2 text-[11px] text-slate-600">Copyright © ONESNC Co., Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
