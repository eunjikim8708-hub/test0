import React from 'react';
import { HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openQuizModal: () => void;
  openAdminModal: () => void;
  leadCount: number;
  isLoggedIn?: boolean;
  onToggleLogin?: () => void;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  openQuizModal,
  openAdminModal,
  leadCount,
  isLoggedIn = true,
  onToggleLogin,
  userName = '김수민'
}) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      {/* Top Utility Bar */}
      <div className="border-b border-gray-100 text-xs text-gray-500 bg-gray-50/80">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex justify-end items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleLogin}
              className="hover:text-blue-600 font-semibold transition-colors cursor-pointer"
            >
              {isLoggedIn ? `로그아웃 (${userName}님)` : '로그인'}
            </button>
            <span className="text-gray-300">·</span>
            <button className="hover:text-gray-800 transition-colors">정보수정</button>
            <span className="text-gray-300">·</span>
            <button className="hover:text-gray-800 transition-colors flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              고객센터
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Logo & Navigation */}
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo matching High Density theme: ONESNC EDU */}
        <div
          onClick={() => setCurrentTab('home')}
          className="cursor-pointer flex items-center gap-2 select-none"
        >
          <span className="text-2xl font-bold text-blue-700 tracking-tight">ONESNC EDU</span>
        </div>

        {/* Center Main Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
          <button
            onClick={() => setCurrentTab('company')}
            className={`transition-colors hover:text-blue-600 cursor-pointer ${
              currentTab === 'company' ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5' : ''
            }`}
          >
            회사소개
          </button>
          <button
            onClick={() => setCurrentTab('intro')}
            className={`transition-colors hover:text-blue-600 cursor-pointer ${
              currentTab === 'intro' ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5' : ''
            }`}
          >
            교육소개
          </button>
          <button
            onClick={() => setCurrentTab('courses')}
            className={`transition-colors hover:text-blue-600 cursor-pointer ${
              currentTab === 'courses' ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5' : ''
            }`}
          >
            교육과정
          </button>
          <button
            onClick={() => setCurrentTab('mylearning')}
            className={`transition-colors hover:text-blue-600 cursor-pointer ${
              currentTab === 'mylearning' ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5' : ''
            }`}
          >
            나의학습방
          </button>
          <button
            onClick={() => setCurrentTab('support')}
            className={`transition-colors hover:text-blue-600 cursor-pointer ${
              currentTab === 'support' ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5' : ''
            }`}
          >
            수강후기
          </button>
          <button
            onClick={() => setCurrentTab('offline')}
            className={`transition-colors hover:text-blue-600 cursor-pointer ${
              currentTab === 'offline' ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5' : ''
            }`}
          >
            고객센터
          </button>
        </nav>

        {/* Curation CTA Button in Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={openQuizModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>무료 체험</span>
          </button>
        </div>
      </div>
    </header>
  );
};
