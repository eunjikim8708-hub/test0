import React, { useState, useEffect } from 'react';
import {
  ChevronUp,
  MessageCircle,
  Gift,
  Bell,
  GraduationCap,
  PhoneCall,
  X,
  Sparkles,
  Plus,
  Megaphone,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Send,
  HelpCircle,
  Star
} from 'lucide-react';

interface QuickMenuProps {
  onOpenQuiz: () => void;
  onOpenConsultation: () => void;
  onSelectTab: (tab: string) => void;
  isLoggedIn?: boolean;
}

interface NoticeItem {
  id: string;
  category: '공지' | '안내' | '이벤트';
  title: string;
  date: string;
  content: string;
  isImportant?: boolean;
}

const NOTICES: NoticeItem[] = [
  {
    id: 'n1',
    category: '공지',
    title: '2026년 하반기 신규 IT·직무 실무 과정 개강 안내',
    date: '2026.07.25',
    isImportant: true,
    content: '원앤스엔씨 EDU의 최신 AI 자동화, 데이터 분석, 최신 경영 직무 코스가 신규 개설되었습니다. 수강생 여러분의 많은 관심 부탁드립니다.'
  },
  {
    id: 'n2',
    category: '안내',
    title: '모바일/PC 학습 환경 및 진도율 실시간 자동 연동 가이드',
    date: '2026.07.20',
    content: '모바일 기기와 PC 간 학습 진도율이 실시간 동기화됩니다. 모바일 화면 오른쪽 하단 [학습방] 메뉴를 통해 바로 학습에 참여하세요.'
  },
  {
    id: 'n3',
    category: '이벤트',
    title: '30초 AI 맞춤 과정 진단 시 10% 추가 할인 쿠폰 즉시 발급',
    date: '2026.07.15',
    content: '나에게 꼭 맞는 맞춤 커리큘럼을 진단받고, 결제 시 사용 가능한 10% 수강 할인 쿠폰 혜택을 100% 받아가세요!'
  },
  {
    id: 'n4',
    category: '안내',
    title: '서버 정기 점검 및 수료증 바로 발급 서비스 시스템 고도화',
    date: '2026.07.10',
    content: '수강 완료 후 진도율 100% 달성 시 즉시 수료증이 출력되도록 시스템 고도화가 완료되었습니다.'
  }
];

export const QuickMenu: React.FC<QuickMenuProps> = ({
  onOpenQuiz,
  onOpenConsultation,
  onSelectTab,
  isLoggedIn = true,
}) => {
  const [isExpandedMobile, setIsExpandedMobile] = useState<boolean>(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState<boolean>(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [inputMsg, setInputMsg] = useState<string>('');

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'bot' as const,
      text: '안녕하세요! 원앤스엔씨 EDU 스마트 챗봇 상담원입니다. 😊\n어떤 도움이 필요하신가요?',
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      quickButtons: [
        { label: '💡 30초 맞춤강의 진단 (10% 쿠폰)', action: () => onOpenQuiz() },
        { label: '📝 1:1 상담 / 단체 수강 문의', action: () => onOpenConsultation() },
        { label: '🎓 나의 학습방 바로가기', action: () => onSelectTab('my-courses') },
        { label: '📢 주요 공지사항 확인', action: () => setIsNoticeModalOpen(true) },
      ]
    }
  ]);

  // Scroll to top handler
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user' as const,
      text: inputMsg,
      time: userTime
    };

    let replyText = '원앤스엔씨 EDU 학습 지원팀에 문의가 접수되었습니다. 빠르게 확인 후 답변해 드리겠습니다.';
    if (inputMsg.includes('할인') || inputMsg.includes('쿠폰')) {
      replyText = '현재 30초 AI 맞춤 진단 참여 시 10% 할인 쿠폰을 받으실 수 있습니다! 상단 이벤트 또는 챗봇 추천 메뉴를 이용해보세요.';
    } else if (inputMsg.includes('수료') || inputMsg.includes('진도')) {
      replyText = '진도율 100% 달성 시 [마이페이지 - 내 강의실]에서 수료증을 PDF로 즉시 다운로드하실 수 있습니다.';
    }

    const botMsg = {
      id: `b-${Date.now()}`,
      sender: 'bot' as const,
      text: replyText,
      time: userTime
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputMsg('');
  };

  return (
    <>
      {/* ========================================== */}
      {/* 1. PC / DESKTOP QUICK MENU (Always Expanded Stack) */}
      {/* ========================================== */}
      <div className="hidden md:flex flex-col items-end gap-3 fixed bottom-6 right-6 z-40">
        {/* Scroll To Top Fixed Button */}
        <div className="relative group">
          <button
            onClick={handleScrollToTop}
            aria-label="최상단으로 이동"
            className="w-12 h-12 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl shadow-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 border border-slate-700/80"
          >
            <ChevronUp className="w-6 h-6 stroke-[2.5]" />
          </button>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            맨 위로
          </span>
        </div>

        {/* My Study Room (학습방) */}
        <div className="relative group">
          <button
            onClick={() => onSelectTab('my-courses')}
            className="w-12 h-12 bg-white hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <GraduationCap className="w-5 h-5 text-indigo-600" />
          </button>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            내 학습방
          </span>
        </div>

        {/* Notice (공지사항) */}
        <div className="relative group">
          <button
            onClick={() => setIsNoticeModalOpen(true)}
            className="w-12 h-12 bg-white hover:bg-amber-50 text-slate-800 hover:text-amber-600 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <Bell className="w-5 h-5 text-amber-500" />
          </button>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md flex items-center gap-1">
            <span>공지사항</span>
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          </span>
        </div>

        {/* Event (이벤트) */}
        <div className="relative group">
          <button
            onClick={onOpenQuiz}
            className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <Gift className="w-5 h-5 text-yellow-300 animate-bounce" />
          </button>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md flex items-center gap-1">
            <span>AI 진단 & 10% 쿠폰</span>
            <span className="bg-yellow-400 text-slate-900 text-[9px] px-1 rounded font-extrabold">EVENT</span>
          </span>
        </div>

        {/* 1:1 Consultation (1:1 상담) */}
        <div className="relative group">
          <button
            onClick={onOpenConsultation}
            className="w-12 h-12 bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-600 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <PhoneCall className="w-5 h-5 text-blue-600" />
          </button>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            1:1 단체/수강 문의
          </span>
        </div>

        {/* Floating Chatbot Toggle Button */}
        <div className="relative group">
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-md pointer-events-none">
            24H 스마트 상담
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-slate-900 rotate-45"></div>
          </div>
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-all border-2 border-white ring-2 ring-yellow-400/50"
          >
            <MessageCircle className="w-7 h-7 fill-slate-900" />
          </button>
        </div>
      </div>


      {/* ========================================== */}
      {/* 2. MOBILE / TABLET QUICK MENU (Vertical Stack: Scroll To Top -> [메뉴] -> Chatbot) */}
      {/* ========================================== */}
      <div className="flex md:hidden flex-col items-end gap-2.5 fixed bottom-6 right-4 z-40">
        
        {/* 1. 맨위 스크롤 (Scroll To Top Fixed Button) */}
        <button
          onClick={handleScrollToTop}
          aria-label="최상단으로 이동"
          className="w-11 h-11 bg-slate-900 text-white rounded-2xl shadow-lg flex items-center justify-center active:scale-90 transition-transform border border-slate-700 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* 2. [메뉴] 버튼 및 확장 퀵메뉴 항목들 */}
        <div className="flex flex-col items-end gap-2">
          {/* EXPANDABLE QUICK MENU ITEMS (When Expanded on Mobile/Tablet) */}
          {isExpandedMobile && (
            <div className="flex flex-col items-end gap-2 my-1 animate-in slide-in-from-bottom-2 duration-200">
              {/* My Study Room (학습방) */}
              <button
                onClick={() => {
                  onSelectTab('my-courses');
                  setIsExpandedMobile(false);
                }}
                className="flex items-center gap-2 bg-white border border-indigo-200 text-slate-800 text-xs font-extrabold px-3.5 py-2.5 rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>학습방</span>
                <div className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Notice (공지사항) */}
              <button
                onClick={() => {
                  setIsNoticeModalOpen(true);
                  setIsExpandedMobile(false);
                }}
                className="flex items-center gap-2 bg-white border border-amber-200 text-slate-800 text-xs font-extrabold px-3.5 py-2.5 rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>공지사항</span>
                <div className="w-6 h-6 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Event (이벤트) */}
              <button
                onClick={() => {
                  onOpenQuiz();
                  setIsExpandedMobile(false);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-extrabold px-3.5 py-2.5 rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>이벤트 (10% 쿠폰)</span>
                <div className="w-6 h-6 bg-white/20 text-yellow-300 rounded-xl flex items-center justify-center">
                  <Gift className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* 1:1 Consultation (1:1 문의) */}
              <button
                onClick={() => {
                  onOpenConsultation();
                  setIsExpandedMobile(false);
                }}
                className="flex items-center gap-2 bg-white border border-blue-200 text-slate-800 text-xs font-extrabold px-3.5 py-2.5 rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>1:1 상담</span>
                <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          )}

          {/* [메뉴] Toggle Button */}
          <button
            onClick={() => setIsExpandedMobile(!isExpandedMobile)}
            className={`h-11 px-3.5 rounded-2xl shadow-lg font-extrabold text-xs flex items-center gap-1.5 transition-all active:scale-95 border cursor-pointer ${
              isExpandedMobile
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-white text-slate-800 border-slate-200'
            }`}
          >
            <span className={isExpandedMobile ? 'text-white font-extrabold' : 'text-indigo-600 font-extrabold'}>
              {isExpandedMobile ? '✕' : '⚡'}
            </span>
            <span>{isExpandedMobile ? '닫기' : '메뉴'}</span>
          </button>
        </div>

        {/* 3. 챗봇 (Floating Chatbot Fixed Button) */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-11 h-11 bg-yellow-400 text-slate-900 rounded-2xl shadow-lg flex items-center justify-center active:scale-90 transition-transform border-2 border-white ring-2 ring-yellow-400/50 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-slate-900" />
        </button>
      </div>


      {/* ========================================== */}
      {/* 3. CHATBOT DRAWER WINDOW */}
      {/* ========================================== */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 w-[92vw] max-w-sm bg-white rounded-2xl shadow-2xl z-50 border border-slate-200 overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="bg-[#fee500] px-4 py-3 text-slate-900 font-bold flex items-center justify-between border-b border-amber-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 text-amber-400 rounded-full flex items-center justify-center text-[10px] font-black">
                ONES
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-black">ONESNC EDU 스마트 상담톡</h4>
                <p className="text-[10px] text-slate-700 font-normal">24시간 자동 학습 가이드 시스템</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-slate-700 hover:text-black p-1 rounded hover:bg-amber-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-100 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[88%] whitespace-pre-line leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-amber-300 text-slate-900 font-medium rounded-tr-none'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>

                {/* Quick Buttons */}
                {msg.quickButtons && msg.quickButtons.length > 0 && (
                  <div className="mt-2 space-y-1.5 w-full">
                    {msg.quickButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          btn.action();
                          setIsChatOpen(false);
                        }}
                        className="w-full text-left bg-white hover:bg-amber-50 text-indigo-700 border border-amber-300 p-2.5 rounded-xl font-bold text-[11px] transition-colors shadow-2xs flex items-center justify-between cursor-pointer"
                      >
                        <span>{btn.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="문의사항을 입력하세요..."
              className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold px-3 py-2 rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>전송</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}


      {/* ========================================== */}
      {/* 4. NOTICE MODAL (공지사항 모달) */}
      {/* ========================================== */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base md:text-lg">ONESNC EDU 공지사항</h3>
                  <p className="text-xs text-slate-400 font-medium">교육원 최신 소식 및 수강 안내</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsNoticeModalOpen(false);
                  setSelectedNotice(null);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50">
              {selectedNotice ? (
                /* Detailed Notice View */
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedNotice(null)}
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    ← 공지사항 목록으로 돌아가기
                  </button>

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        selectedNotice.category === '공지' ? 'bg-indigo-100 text-indigo-800' :
                        selectedNotice.category === '이벤트' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {selectedNotice.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{selectedNotice.date}</span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                      {selectedNotice.title}
                    </h4>

                    <div className="text-xs md:text-sm text-slate-600 leading-relaxed pt-2 whitespace-pre-line border-t border-slate-100">
                      {selectedNotice.content}
                    </div>
                  </div>
                </div>
              ) : (
                /* Notice List View */
                NOTICES.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => setSelectedNotice(notice)}
                    className="bg-white hover:bg-slate-100/80 border border-slate-200/80 rounded-2xl p-4 cursor-pointer transition-all hover:border-indigo-300 shadow-2xs group flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                          notice.category === '공지' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                          notice.category === '이벤트' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {notice.category}
                        </span>
                        {notice.isImportant && (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-100">
                            중요
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 font-medium ml-auto sm:ml-0">
                          {notice.date}
                        </span>
                      </div>

                      <h4 className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug">
                        {notice.title}
                      </h4>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0 mt-2" />
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-slate-200 p-4 text-center">
              <button
                onClick={() => {
                  setIsNoticeModalOpen(false);
                  setSelectedNotice(null);
                }}
                className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
