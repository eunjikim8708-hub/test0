import React, { useState, useEffect } from 'react';
import { 
  X, 
  Compass, 
  User, 
  FileSpreadsheet, 
  Database, 
  Users, 
  Brain, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  RotateCcw, 
  Gift, 
  Star,
  Lock,
  UserCheck
} from 'lucide-react';
import { LeadSubmission, Course, PersonaInfo, PersonaCourse } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onAddLead: (lead: LeadSubmission) => void;
  onApplyCoupon: (code: string) => void;
  userName?: string;
  userPhone?: string;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onUpdateUserName?: (newName: string) => void;
  onCompleteQuizResult?: (persona: PersonaInfo) => void;
}

// Step 1 Options Data
const step1Options = [
  { 
    id: 'A', 
    text: '매일 반복되는 엑셀, 문서 작성 시간을 줄이고 싶어요', 
    description: '업무 생산성 극대화 및 오피스 실무 마스터',
    icon: FileSpreadsheet, 
    color: 'text-blue-600', 
    bg: 'bg-blue-50'
  },
  { 
    id: 'B', 
    text: '요즘 필수라는 AI, 데이터 분석, IT 기술을 다뤄보고 싶어요', 
    description: '파이썬, SQL, AI 툴 실무 활용과 데이터 중심 사고',
    icon: Database, 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50'
  },
  { 
    id: 'C', 
    text: '어려운 갈등 해결부터 비즈니스 매너까지 프로답게 소통하고 싶어요', 
    description: '협업 중심의 비즈니스 매너와 프로 커뮤니케이션',
    icon: Users, 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50'
  },
  { 
    id: 'D', 
    text: '지친 멘탈을 회복하고 새로운 커리어 자극을 받고 싶어요', 
    description: '마인드 컨트롤, 업무 스트레스 해소 및 중장기 커리어 설계',
    icon: Brain, 
    color: 'text-rose-600', 
    bg: 'bg-rose-50'
  }
];

// Step 2 Persona Options Data mapped from Step 1 Selection
const step2OptionsData: Record<string, Array<{ id: string; text: string; subText: string }>> = {
  A: [
    { id: 'G3', text: '마우스 없이 엑셀/PPT 척척 해내는 오피스 마스터', subText: '스마트워크 및 직무 효율성 업그레이드' },
    { id: 'G6', text: '세무, 노무, 회계 헷갈리는 원칙을 꿰뚫는 일잘러', subText: '기초 회계와 근로 기준법 상식 완벽 타파' }
  ],
  B: [
    { id: 'G1', text: '파이썬, 클라우드 등 최신 기술을 적용하는 얼리어답터', subText: '최신 IT 용어부터 기초 프로그래밍까지' },
    { id: 'G2', text: '감보단 데이터! SQL과 GA4로 말하는 실전 분석가', subText: '데이터 수집, 정제 및 성과 분석 실전' }
  ],
  C: [
    { id: 'G4', text: '어떤 팀원과도 원만하게 소통하며 팀을 이끄는 리더', subText: '팀 시너지 및 대인 갈등 조율 가이드' },
    { id: 'G7', text: '영어 이메일부터 발표까지 척척 해내는 글로벌 인재', subText: '실전 비즈니스 영어 및 글로벌 프레젠테이션' }
  ],
  D: [
    { id: 'G5', text: '남다른 시각으로 트렌드를 읽고 기획하는 크리에이터', subText: '기획력 향상, 카피라이팅 및 최신 트렌드 포착' },
    { id: 'G8', text: '스트레스에 흔들리지 않고 커리어를 다지는 멘탈 갑', subText: '마음 챙김, 번아웃 증후군 극복 및 커리어 성찰' }
  ]
};

// Persona Recommendation Results
const personaData: Record<string, PersonaInfo> = {
  G1: { 
    title: 'IT 트렌드를 선도하는 핵심 기술, 한번에 모아봤어요 🚀', 
    subtitle: '트렌디한 기술을 무기로 차세대 스마트 인재로 도약해보세요.',
    courses: [
      { title: '파이썬 기초부터 실무 자동화까지', tag: 'BEST', cat: '개발·IT', rating: 4.9, reviewCount: '1,420', difficulty: '초급', duration: '18시간' },
      { title: '비전공자도 이해하는 AWS 클라우드 입문', tag: 'NEW', cat: '클라우드', rating: 4.8, reviewCount: '320', difficulty: '초급', duration: '12시간' },
      { title: '실전 웹 프론트엔드: React & Tailwind CSS', tag: '', cat: '프론트엔드', rating: 4.9, reviewCount: '850', difficulty: '중급', duration: '24시간' },
      { title: '비전공자를 위한 핵심 IT 지식 & 트렌드', tag: '', cat: '교양', rating: 4.7, reviewCount: '980', difficulty: '입문', duration: '8시간' }
    ] 
  },
  G2: { 
    title: '감보단 데이터! 실전 분석 추천 과정 📊', 
    subtitle: '정량적 데이터 분석으로 성과를 증명하는 전문가로 도약하세요.',
    courses: [
      { title: '실무에 바로 쓰는 SQL 첫걸음', tag: 'BEST', cat: '데이터', rating: 4.9, reviewCount: '2,150', difficulty: '초급', duration: '14시간' },
      { title: '구글 애널리틱스(GA4) 데이터 분석 완벽 가이드', tag: 'HOT', cat: '마케팅', rating: 4.8, reviewCount: '1,100', difficulty: '중급', duration: '16시간' },
      { title: '파이썬 데이터 시각화 & 실전 프로젝트', tag: '', cat: '데이터', rating: 4.9, reviewCount: '670', difficulty: '중급', duration: '20시간' }
    ] 
  },
  G3: { 
    title: '오피스 마스터를 위한 칼퇴 보장 실무 스킬 ⚡', 
    subtitle: '귀찮고 반복되는 작업들을 해결하고 똑똑하게 일해 보세요.',
    courses: [
      { title: '마우스 없이 다 끝내는 엑셀 단축키 & 실무 함수', tag: 'BEST', cat: '업무효율', rating: 4.9, reviewCount: '3,400', difficulty: '입문', duration: '10시간' },
      { title: '기적의 PPT 템플릿 제작 및 시각 디자인 가이드', tag: 'HOT', cat: '디자인', rating: 4.8, reviewCount: '1,850', difficulty: '초급', duration: '12시간' },
      { title: '협업을 위한 노션(Notion) 올인원 마스터 가이드', tag: '', cat: '생산성', rating: 4.7, reviewCount: '940', difficulty: '입문', duration: '7시간' },
      { title: '일잘러의 인공지능: 챗GPT 프롬프트 실무 활용법', tag: 'NEW', cat: 'AI/생산성', rating: 4.9, reviewCount: '420', difficulty: '초급', duration: '9시간' }
    ] 
  },
  G4: { 
    title: '부드럽지만 강한 리더십 추천 과정 🤝', 
    subtitle: '건강한 팀워크와 협력을 구축하는 비즈니스 소통의 지름길을 알려드려요.',
    courses: [
      { title: '요즘 팀장들의 소통법: 세대 갈등 제로 가이드', tag: 'BEST', cat: '리더십', rating: 4.9, reviewCount: '820', difficulty: '중급', duration: '15시간' },
      { title: '스타트업처럼 일하는 법: 애자일 조직 관리 실전', tag: '', cat: '리더십', rating: 4.8, reviewCount: '410', difficulty: '고급', duration: '18시간' }
    ] 
  },
  G5: { 
    title: '영감을 깨우는 마케팅/트렌드 추천 과정 💡', 
    subtitle: '고객의 마음을 움직이고 시장 트렌드를 빠르게 설계하는 크리에이터 기획 과정.',
    courses: [
      { title: '매출을 일으키는 카피라이팅 & 브랜드 글쓰기', tag: 'HOT', cat: '마케팅', rating: 4.9, reviewCount: '930', difficulty: '초급', duration: '10시간' },
      { title: '타겟을 홀리는 퍼포먼스 마케팅 기초부터 마스터', tag: '', cat: '마케팅', rating: 4.7, reviewCount: '620', difficulty: '초급', duration: '11시간' }
    ] 
  },
  G6: { 
    title: '빈틈없는 재무/법무 실무 지식 📋', 
    subtitle: '기초 회계부터 꼭 알아야 할 노동 규칙까지 확실히 점검해 드립니다.',
    courses: [
      { title: '비재무 담당자를 위한 생존 회계 및 재무제표 읽기', tag: 'BEST', cat: '직무', rating: 4.8, reviewCount: '740', difficulty: '입문', duration: '13시간' },
      { title: '2026 노동법 핵심 가이드: 실무자를 위한 근로 기준', tag: '', cat: '직무', rating: 4.7, reviewCount: '380', difficulty: '중급', duration: '8시간' }
    ] 
  },
  G7: { 
    title: '한계 없는 글로벌 비즈니스 역량 강화 🌍', 
    subtitle: '글로벌 무대에서도 자신감 있게 메일을 보내고 의견을 전달해보세요.',
    courses: [
      { title: '클릭을 유도하는 비즈니스 영어 이메일 작성법', tag: '', cat: '어학', rating: 4.8, reviewCount: '1,250', difficulty: '초급', duration: '14시간' },
      { title: '청중의 마음을 움직이는 글로벌 프레젠테이션', tag: 'NEW', cat: '어학', rating: 4.9, reviewCount: '290', difficulty: '중급', duration: '10시간' }
    ] 
  },
  G8: { 
    title: '단단한 멘탈과 휴식을 위한 케어 과정 🧘', 
    subtitle: '건강한 에너지와 뚜렷한 가치관으로 일과 생활의 균형을 유지하세요.',
    courses: [
      { title: '지친 마음을 안아주는 직장인 스트레스 관리 솔루션', tag: 'BEST', cat: '마인드', rating: 4.9, reviewCount: '1,540', difficulty: '입문', duration: '8시간' },
      { title: '5년 뒤 나를 바꾸는 커리어 로드맵 및 자기발견', tag: '', cat: '커리어', rating: 4.8, reviewCount: '890', difficulty: '입문', duration: '12시간' }
    ] 
  },
  default: { 
    title: '현재 직장인들이 가장 많이 수강하는 베스트 과정', 
    subtitle: '가장 인기 있고 수강 만족도가 높은 검증된 핵심 강의들입니다.',
    courses: [
      { title: '마우스 없이 다 끝내는 엑셀 단축키 & 실무 함수', tag: 'BEST', cat: '업무효율', rating: 4.9, reviewCount: '3,400', difficulty: '입문', duration: '10시간' },
      { title: '파이썬 기초부터 실무 자동화까지', tag: 'HOT', cat: '개발·IT', rating: 4.9, reviewCount: '1,420', difficulty: '초급', duration: '18시간' },
      { title: '클릭을 유도하는 비즈니스 영어 이메일 작성법', tag: '', cat: '어학', rating: 4.8, reviewCount: '1,250', difficulty: '초급', duration: '14시간' },
      { title: '매출을 일으키는 카피라이팅 & 브랜드 글쓰기', tag: 'NEW', cat: '마케팅', rating: 4.9, reviewCount: '930', difficulty: '초급', duration: '10시간' }
    ] 
  }
};

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  courses,
  onAddLead,
  onApplyCoupon,
  userName = '김수민',
  userPhone = '010-1234-5678',
  isLoggedIn = true,
  onLogin,
  onUpdateUserName,
  onCompleteQuizResult
}) => {
  const [step, setStep] = useState<number>(1); // 1, 2, 3 (loading), 4 (result)
  const [currentName, setCurrentName] = useState<string>(userName);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(userName);

  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const [agreed, setAgreed] = useState<boolean>(true);
  const [submittedCoupon, setSubmittedCoupon] = useState<string | null>(null);

  useEffect(() => {
    setCurrentName(userName);
    setNameInput(userName);
  }, [userName]);

  if (!isOpen) return null;

  // Save Name handler
  const handleSaveName = () => {
    if (nameInput.trim()) {
      setCurrentName(nameInput.trim());
      if (onUpdateUserName) {
        onUpdateUserName(nameInput.trim());
      }
    }
    setIsEditingName(false);
  };

  // Step 1 Category Select
  const handleSelectStep1 = (catId: string) => {
    setSelectedCat(catId);
    setSelectedGroup(null);
    setTimeout(() => {
      setStep(2);
    }, 200);
  };

  // Step 2 Submit
  const handleSubmitStep2 = () => {
    if (!selectedGroup) return;
    setStep(3); // Loading spinner

    setTimeout(() => {
      setStep(4); // Result
      const matched = personaData[selectedGroup || 'default'] || personaData['default'];
      if (onCompleteQuizResult) {
        onCompleteQuizResult(matched);
      }
    }, 1500);
  };

  // Skip Onboarding
  const handleSkip = () => {
    setSelectedGroup('default');
    onClose();
  };

  // Reset to Step 1
  const handleResetToStep1 = () => {
    setSelectedCat(null);
    setSelectedGroup(null);
    setStep(1);
  };

  // Handle Form Submit for 10% coupon & Lead Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('개인정보 수집 동의가 필요합니다.');
      return;
    }

    const leadName = userName || '김수민';
    const leadPhone = userPhone || '010-1234-5678';
    const newCouponCode = `ONESNC-AI10-${Math.floor(1000 + Math.random() * 9000)}`;

    const currentPersonaInfo = personaData[selectedGroup || 'default'] || personaData['default'];
    const recommendedTitle = currentPersonaInfo.courses[0]?.title || courses[0]?.title || 'AI 맞춤 추천 강좌';

    const newLead: LeadSubmission = {
      id: `lead-${Date.now()}`,
      name: leadName,
      phone: leadPhone,
      interestField: selectedCat || 'AI / 직무',
      targetGoal: selectedGroup || '맞춤 직무 향상',
      recommendedCourseTitle: recommendedTitle,
      couponCode: newCouponCode,
      submittedAt: new Date().toLocaleString('ko-KR'),
      type: 'quiz_lead',
      status: '쿠폰발급'
    };

    onAddLead(newLead);
    onApplyCoupon(newCouponCode);
    setSubmittedCoupon(newCouponCode);
  };

  const currentPersona = personaData[selectedGroup || 'default'] || personaData['default'];
  const step2Options = selectedCat ? step2OptionsData[selectedCat] || [] : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 transition-all duration-300">
      {/* Background overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh] border border-slate-100 transition-all duration-300 z-10">
        
        {/* Modal Header */}
        {step !== 3 && (
          <div className="relative pt-6 px-8 pb-3 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-indigo-600">
              <Compass className="w-5 h-5 text-indigo-600" />
              <span className="font-bold text-sm tracking-wide uppercase">AI 취향 분석 스마트 온보딩</span>
            </div>
            
            <button 
              onClick={handleSkip} 
              className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-semibold transition-colors bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <span>건너뛰기</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Modal Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto relative min-h-[420px] flex flex-col justify-between">
          
          {/* LOGIN REQUIRED VIEW FOR NON-LOGGED-IN USERS */}
          {!isLoggedIn ? (
            <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-8 md:p-10 my-auto">
              <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shadow-2xs mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <div className="inline-block bg-indigo-100 text-indigo-800 text-[11px] font-extrabold px-3 py-1 rounded-full mb-3">
                🔒 로그인 회원 전용 서비스
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-2 leading-tight">
                맞춤 추천 과정 분석은 로그인 후 이용하실 수 있습니다.
              </h2>
              <p className="text-slate-500 text-xs md:text-sm max-w-sm mb-6 leading-relaxed">
                로그인 회원에게는 30초 AI 맞춤 과정 진단과 함께 <strong>회원 전용 10% 할인 쿠폰</strong> 혜택을 제공해 드립니다.
              </p>
              <div className="w-full max-w-xs space-y-2">
                <button
                  onClick={() => {
                    if (onLogin) onLogin();
                  }}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-indigo-200" />
                  <span>로그인하고 맞춤 분석 이용하기</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors text-xs cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: Goal Selection */}
              {step === 1 && (
                <div className="w-full flex-1 flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <div className="mb-6">
                      <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 leading-tight">
                        요즘 직장생활에서 <span className="text-indigo-600 underline decoration-indigo-200 decoration-4 underline-offset-4">어떤 고민이나 목표</span>가 있으신가요?
                      </h2>
                      <p className="text-slate-400 text-xs md:text-sm mt-2">
                        가장 깊이 공감되는 고민을 하나 선택해 주세요.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {step1Options.map((opt) => {
                        const IconComp = opt.icon;
                        const isSelected = selectedCat === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleSelectStep1(opt.id)}
                            className={`flex flex-col items-start p-5 rounded-2xl border-2 text-left cursor-pointer transition-all duration-300 group hover:-translate-y-1 ${
                              isSelected 
                                ? 'border-indigo-600 bg-indigo-50/60 shadow-lg shadow-indigo-100' 
                                : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/40'
                            }`}
                          >
                            <div className={`p-3 rounded-xl mb-3.5 ${opt.bg} ${opt.color} group-hover:scale-110 transition-transform duration-300`}>
                              <IconComp className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-slate-800 text-[14px] md:text-[15px] leading-snug">{opt.text}</span>
                            <span className="text-slate-400 text-xs mt-1.5 font-medium line-clamp-2 leading-relaxed">{opt.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Persona Details Selection */}
              {step === 2 && (
                <div className="w-full flex-1 flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <button 
                      onClick={() => setStep(1)} 
                      className="text-slate-400 hover:text-indigo-600 text-xs font-semibold mb-4 inline-flex items-center gap-1 transition-colors hover:translate-x-[-2px] cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>이전 고민 선택 단계로</span>
                    </button>
                    
                    <div className="mb-6">
                      <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 leading-tight">
                        조금만 더 <span className="text-indigo-600 underline decoration-indigo-200 decoration-4 underline-offset-4">구체적인 지향점</span>을 그려볼까요?
                      </h2>
                      <p className="text-slate-400 text-xs md:text-sm mt-2">
                        선택하신 주제에 맞춰 나에게 최적화된 구체적인 인물 페르소나를 골라보세요.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      {step2Options.map((opt) => {
                        const isSelected = selectedGroup === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => setSelectedGroup(opt.id)}
                            className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 text-left cursor-pointer transition-all duration-200 group ${
                              isSelected 
                                ? 'border-indigo-600 bg-indigo-50/60 shadow-md shadow-indigo-100' 
                                : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/50'
                            }`}
                          >
                            <div className="flex-1 pr-4">
                              <div className="font-extrabold text-sm md:text-base text-slate-800 group-hover:text-indigo-950 transition-colors">{opt.text}</div>
                              <div className="text-xs text-slate-400 mt-1 font-medium">{opt.subText}</div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0 ${
                              isSelected 
                                ? 'border-indigo-600 bg-indigo-600 text-white' 
                                : 'border-slate-300 bg-white group-hover:border-indigo-400'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <button 
                      onClick={handleSubmitStep2} 
                      disabled={!selectedGroup} 
                      className={`w-full py-4 rounded-xl font-extrabold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                        selectedGroup 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-150 hover:bg-indigo-700 hover:-translate-y-0.5 cursor-pointer' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>이대로 추천받아보기!</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => setStep(1)} 
                      className="w-full mt-3 py-3 rounded-xl font-semibold text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>목표를 다시 설정할래요</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Matching & Loading Animation */}
              {step === 3 && (
                <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-8 py-12">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                    <Sparkles className="w-8 h-8 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-800 mb-3 leading-snug">
                    취향을 저격할 강의를<br />찾는 중이에요
                  </h2>
                  <p className="text-slate-400 text-xs md:text-sm max-w-sm leading-relaxed">
                    입력해주신 소중한 분석 결과를 토대로 나에게 꼭 맞는 완벽한 최상의 코스를 추천하고 있습니다...
                  </p>
                </div>
              )}

              {/* STEP 4: Matching Result Summary */}
              {step === 4 && (
                <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-6 md:p-8">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 text-2xl shadow-xs border border-emerald-200">
                    <Check className="w-7 h-7" />
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-1.5">맞춤 추천 세팅이 완료되었습니다!</h2>
                  <p className="text-slate-400 text-xs md:text-sm mb-5">
                    분석 결과와 최신 인기도를 반영해 실용적인 맞춤 리스트를 준비했습니다.
                  </p>
                  
                  {/* Preview list in results */}
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 text-left mb-5 shadow-inner">
                    <div className="flex items-center gap-1.5 mb-2.5 text-indigo-700 font-extrabold text-xs tracking-tight bg-white w-max px-3 py-1 rounded-full border border-indigo-50">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>추천과정 매칭 완료</span>
                    </div>
                    
                    <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-snug mb-3">
                      {currentPersona.title.replace('{name}님, ', '').replace('{name}님 ', '').replace('{name}', '')}
                    </h3>
                    
                    {/* Dynamic result courses vertical list */}
                    <div className="flex flex-col gap-2.5">
                      {currentPersona.courses.map((course, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-2xs hover:border-indigo-200 transition-colors">
                          <div className="flex flex-col gap-0.5 text-left">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                                {course.cat}
                              </span>
                              {course.tag && (
                                <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded text-white ${
                                  course.tag === 'BEST' ? 'bg-rose-500' : course.tag === 'HOT' ? 'bg-amber-500' : 'bg-indigo-600'
                                }`}>
                                  {course.tag}
                                </span>
                              )}
                            </div>
                            <div className="font-bold text-xs sm:text-sm text-slate-800 mt-1">
                              {course.title}
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs text-slate-500 shrink-0 ml-2">
                            <span className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                              <Star className="w-3 h-3 fill-amber-500" />
                              {course.rating}
                            </span>
                            <span className="text-slate-300">|</span>
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium text-[10px]">
                              {course.difficulty}
                            </span>
                            <span className="text-slate-300 hidden sm:inline">|</span>
                            <span className="text-slate-400 text-[10px] hidden sm:inline">
                              {course.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coupon Lead Submission Box inside Modal - Auto-filled Member Info */}
                  {!submittedCoupon ? (
                    <form onSubmit={handleFormSubmit} className="w-full text-left bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 mb-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                          <Gift className="w-4 h-4 text-indigo-600" />
                          <span>추천 결과 저장 & 10% 할인 쿠폰 받기</span>
                        </div>
                        <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          회원 정보 자동 입력
                        </span>
                      </div>

                      {/* Auto-filled member profile badge */}
                      <div className="bg-white border border-indigo-100 rounded-xl p-3 flex items-center justify-between text-xs shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-xs">
                            {userName.slice(0, 1) || '회'}
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
                              <span>{userName}님</span>
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-extrabold">인증 회원</span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {userPhone || '010-1234-5678'}
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                          자동 반영됨
                        </div>
                      </div>

                      <label className="flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer pt-0.5">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          required
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>[필수] 개인정보 수집 및 10% 쿠폰 발급 동의</span>
                      </label>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex justify-center items-center gap-1.5 cursor-pointer"
                      >
                        <Gift className="w-4 h-4 text-yellow-300" />
                        <span>추천 결과 저장 및 10% 할인 쿠폰 발급받기</span>
                      </button>
                    </form>
                  ) : (
                    <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-4 text-left">
                      <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>10% 할인 쿠폰 발급 완료 [{submittedCoupon}]</span>
                      </div>
                      <p className="text-[11px] text-emerald-600 mt-1">[나의 쿠폰함]에서 확인하실 수 있습니다.</p>
                    </div>
                  )}

                  <div className="w-full gap-2.5 flex flex-col border-t border-slate-100 pt-4">
                    <button
                      onClick={onClose}
                      className="w-full py-3.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold shadow-md transition-colors flex justify-center items-center gap-2 text-xs md:text-sm cursor-pointer"
                    >
                      <span>메인으로 가서 추천 강좌 보기</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={handleResetToStep1} 
                      className="w-full py-2 rounded-xl font-semibold text-slate-400 hover:text-slate-600 bg-white border border-slate-200 transition-colors flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                    >
                      <span>다시 진단하기</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
