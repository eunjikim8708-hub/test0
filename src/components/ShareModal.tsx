import React, { useState } from 'react';
import { X, Link, MessageCircle, PenLine, Video, CheckCircle2, Share2 } from 'lucide-react';
import { Course } from '../types';

interface ShareModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  course,
  isOpen,
  onClose
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen || !course) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?course=${course.id}`
    : `https://onesnc-edu.com/course/${course.id}`;

  const handleShareAction = (platform: string) => {
    if (platform === 'URL 복사') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast('URL이 클립보드에 복사되었습니다.');
        }).catch(() => {
          showToast('URL이 복사되었습니다.');
        });
      } else {
        showToast('URL이 복사되었습니다.');
      }
    } else if (platform === '카카오톡') {
      showToast('카카오톡으로 과정 정보가 공유되었습니다.');
    } else if (platform === '네이버 블로그') {
      showToast('네이버 블로그 공유 창으로 연결됩니다.');
    } else if (platform === 'X.com') {
      showToast('X.com(트위터) 공유 창으로 연결됩니다.');
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-bounce pointer-events-none">
          <div className="bg-slate-900/95 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 border border-slate-700/50 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-xs">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 transition-opacity animate-fade-in"
      />

      {/* Modal / Bottom Sheet Container */}
      <div className="fixed z-50 bottom-0 inset-x-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[440px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5 md:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <Share2 className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                과정 공유하기
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              동료나 팀원들에게 유용한 이 교육과정을 공유해 보세요.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SNS Share Buttons Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {/* KakaoTalk */}
          <button
            type="button"
            onClick={() => handleShareAction('카카오톡')}
            className="flex flex-col items-center gap-2 group outline-none cursor-pointer"
          >
            <div className="w-13 h-13 md:w-14 md:h-14 bg-[#FEE500] rounded-2xl flex items-center justify-center shadow-xs group-active:scale-95 group-hover:shadow-md transition-all">
              <MessageCircle className="w-6 h-6 text-black fill-current" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">카카오톡</span>
          </button>

          {/* Copy URL */}
          <button
            type="button"
            onClick={() => handleShareAction('URL 복사')}
            className="flex flex-col items-center gap-2 group outline-none cursor-pointer"
          >
            <div className="w-13 h-13 md:w-14 md:h-14 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center shadow-xs group-active:scale-95 group-hover:bg-slate-200 transition-all">
              <Link className="w-5 h-5 text-slate-700" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">URL 복사</span>
          </button>

          {/* Naver Blog */}
          <button
            type="button"
            onClick={() => handleShareAction('네이버 블로그')}
            className="flex flex-col items-center gap-2 group outline-none cursor-pointer"
          >
            <div className="w-13 h-13 md:w-14 md:h-14 bg-[#03C75A] rounded-2xl flex items-center justify-center shadow-xs group-active:scale-95 group-hover:shadow-md transition-all">
              <PenLine className="w-5 h-5 text-white" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">네이버 블로그</span>
          </button>

          {/* X.com / Twitter */}
          <button
            type="button"
            onClick={() => handleShareAction('X.com')}
            className="flex flex-col items-center gap-2 group outline-none cursor-pointer"
          >
            <div className="w-13 h-13 md:w-14 md:h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xs group-active:scale-95 group-hover:bg-black transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-slate-700">X.com</span>
          </button>
        </div>

        {/* Link Preview Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl shrink-0 flex items-center justify-center text-white shadow-xs">
            <Video className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider block">
              {course.categoryLabel}
            </span>
            <p className="text-xs font-bold text-slate-800 truncate">
              {course.title}
            </p>
            <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
              강사: {course.instructor} · {course.durationHours}시간 ({course.chaptersCount}차시)
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-5">
          <button
            onClick={() => handleShareAction('URL 복사')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Link className="w-3.5 h-3.5" />
            <span>과정 링크 직접 복사하기</span>
          </button>
        </div>

      </div>
    </>
  );
};
