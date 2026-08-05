import React, { useState } from 'react';
import { Megaphone, HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface NoticeItem {
  id: string;
  category: string;
  title: string;
  date: string;
  isNew?: boolean;
  content: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const NOTICES: NoticeItem[] = [
  {
    id: 'n-1',
    category: '안내',
    title: '2026년 하반기 신규 직무 혁신 교육과정 개설 및 수강권 안내',
    date: '2026.07.25',
    isNew: true,
    content: '원앤스엔씨 EDU의 2026년 하반기 직무 역량 강화 교육과정이 새롭게 오픈되었습니다. AI 마케팅, 생성형 프롬프트, 파이썬 자동화 등 현업 필수 강좌를 만나보세요.'
  },
  {
    id: 'n-2',
    category: '시스템',
    title: '학습 관리 시스템(LMS) 정기 점검 및 서버 안정화 작업 안내',
    date: '2026.07.20',
    isNew: true,
    content: '더 안정적인 학습 환경 제공을 위해 매월 셋째 주 일요일 새벽 02:00 ~ 05:00 LMS 시스템 서버 점검이 진행됩니다. 점검 시간 동안 영상 시청이 일시 제한될 수 있습니다.'
  },
  {
    id: 'n-3',
    category: '이벤트',
    title: '생생한 수강후기 작성 시 10,000원 수강 할인 쿠폰 증정',
    date: '2026.07.15',
    content: '수강을 완료하신 학습자분들께서 정성스러운 수강후기를 남겨주시면 익일 전 강좌 적용 가능한 1만원 직무 할인 쿠폰을 발급해 드립니다.'
  },
  {
    id: 'n-4',
    category: 'B2B',
    title: '5인 이상 기업 단체 수강 할인 및 맞춤형 세금계산서 지원',
    date: '2026.07.01',
    content: '기업 및 팀 단위 단체 학습 신청 시 인원별 최대 30% 추가 할인 혜택과 기업 전용 세금계산서/지출증빙 발행 프로세스를 지원합니다. (고객센터 1:1 문의)'
  }
];

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '수강 기간이 종료된 후에도 복습이 가능한가요?',
    answer: '기본 수강 기간(60일~90일) 종료 후에도, 완강된 과정에 한해 "나의 학습방"에서 강의 자료 및 요약 노트를 언제든지 무료로 복습하실 수 있습니다.'
  },
  {
    id: 'faq-2',
    question: '수료증 발급 기준과 출력 방법은 어떻게 되나요?',
    answer: '진도율 80% 이상 수강 시 수료증이 자동 발급됩니다. "나의 학습방 > 수료증 발급" 메뉴에서 직인 및 수료 번호가 포함된 PDF 수료증을 즉시 출력하실 수 있습니다.'
  },
  {
    id: 'faq-3',
    question: '기업 단체 수강 할인이나 세금계산서 발행이 가능한가요?',
    answer: '네, 가능합니다! 5인 이상 기업 단체 수강 신청 시 최대 30% 할인이 적용되며, 결제 단계에서 "기업 사업자 세금계산서" 신청이 가능합니다.'
  },
  {
    id: 'faq-4',
    question: '모바일 기기나 태블릿에서도 수강이 가능한가요?',
    answer: '원앤스엔씨 EDU는 모든 스마트폰, 태블릿, PC 기기의 브라우저를 완벽하게 지원합니다. 이동 중에도 배속 재생 및 연속 수강이 가능합니다.'
  },
  {
    id: 'faq-5',
    question: '수강 취소 및 환불 규정은 어떻게 되나요?',
    answer: '수강 신청 후 7일 이내 & 강의 수강 이력이 없는 경우 100% 전액 환불이 가능합니다. 수강 이력이 발생한 경우 진도율 산정에 따라 차등 환불됩니다.'
  }
];

export const NoticeFaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const visibleFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
      {/* LEFT: Notice Section (공지사항) */}
      <section className="bg-white rounded-xl p-6 md:p-7 shadow-xs border border-gray-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-blue-600" />
              <span>공지사항</span>
            </h3>
            <span className="text-xs text-gray-400 font-medium">원앤스엔씨 EDU 소식</span>
          </div>

          <div className="divide-y divide-gray-100">
            {NOTICES.map((notice) => (
              <div
                key={notice.id}
                className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 -mx-2 px-2 rounded-lg"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="shrink-0 text-[11px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {notice.category}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-gray-800 truncate">
                    {notice.title}
                  </span>
                  {notice.isNew && (
                    <span className="shrink-0 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                      N
                    </span>
                  )}
                </div>
                <span className="shrink-0 text-xs text-gray-400 font-mono">
                  {notice.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end">
          <div className="text-xs text-gray-400 font-medium flex items-center gap-1">
            <span>공지사항 목록</span>
          </div>
        </div>
      </section>

      {/* RIGHT: FAQ Section (자주 묻는 질문) */}
      <section className="bg-white rounded-xl p-6 md:p-7 shadow-xs border border-gray-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>자주 묻는 질문 (FAQ)</span>
            </h3>
            <span className="text-xs text-gray-400 font-medium">자주 묻는 궁금증 해결</span>
          </div>

          <div className="space-y-2.5">
            {visibleFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-xl transition-all ${
                    isOpen ? 'border-amber-300 bg-amber-50/20 shadow-2xs' : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-3.5 flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span className="text-xs md:text-sm font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-amber-500 font-extrabold text-sm shrink-0">Q.</span>
                      <span>{faq.question}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-gray-600 font-normal leading-relaxed border-t border-amber-200/50 bg-amber-50/40 rounded-b-xl">
                      <p className="flex items-start gap-1.5">
                        <span className="font-extrabold text-amber-600 shrink-0">A.</span>
                        <span>{faq.answer}</span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => setShowAllFaqs(!showAllFaqs)}
            className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{showAllFaqs ? 'FAQ 접기' : 'FAQ 더보기'}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showAllFaqs ? '-rotate-90' : ''}`} />
          </button>
        </div>
      </section>
    </div>
  );
};
