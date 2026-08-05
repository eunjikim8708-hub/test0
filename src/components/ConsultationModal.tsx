import React, { useState, useEffect } from 'react';
import { X, Send, Building2, User, Phone, Mail, FileText } from 'lucide-react';
import { LeadSubmission, Course } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onAddLead: (lead: LeadSubmission) => void;
  isLoggedIn?: boolean;
  userProfile?: { name: string; phone: string };
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  courses,
  onAddLead,
  isLoggedIn = true,
  userProfile = { name: '김수민', phone: '010-1234-5678' }
}) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.title || '');
  const [message, setMessage] = useState<string>('');
  const [agreed, setAgreed] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      if (isLoggedIn) {
        setName(userProfile?.name || '김수민');
        setPhone(userProfile?.phone || '010-1234-5678');
      } else {
        setName('');
        setPhone('');
      }
    }
  }, [isOpen, isLoggedIn, userProfile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }

    const newLead: LeadSubmission = {
      id: `consult-${Date.now()}`,
      name,
      phone,
      companyName: companyName || '개인 수강생',
      interestField: '1:1 맞춤 교육 상담',
      targetGoal: '기업/개인 맞춤 과정 설계',
      recommendedCourseTitle: selectedCourse,
      couponCode: 'CONSULT-VIP',
      submittedAt: new Date().toLocaleString('ko-KR'),
      type: 'consultation_request',
      message,
      status: '상담대기'
    };

    onAddLead(newLead);
    alert('1:1 전문 교육 상담 신청이 완료되었습니다.\n원앤스엔씨 교육 컨설턴트가 1시간 이내로 연락드리겠습니다.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden z-10 border border-gray-100 p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl leading-none p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              ONESNC 1:1 상담
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-gray-900">
            맞춤 교육 1:1 상담 신청
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            기업 맞춤 출강, 단체 수강 할인, 맞춤형 커리큘럼 문의를 남겨주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">성함 *</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className="w-full pl-9 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">연락처 *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01012345678"
                className="w-full pl-9 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">회사/기관명 (선택)</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="(주)원앤스엔씨"
                className="w-full pl-9 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">관심 과정</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden bg-white text-gray-800"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">상담 세부 요청사항 (선택)</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="예: 팀원 10명 단체 수강 및 일정 관련 문의드립니다."
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden text-xs"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>개인정보 수집 및 상담 연락 동의</span>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <Send className="w-4 h-4" />
            <span>1:1 상담 신청하기</span>
          </button>
        </form>
      </div>
    </div>
  );
};
