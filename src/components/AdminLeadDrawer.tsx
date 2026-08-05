import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, Download, Trash2, Search, CheckCircle2, Clock, Phone, Sparkles } from 'lucide-react';
import { LeadSubmission } from '../types';

interface AdminLeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadSubmission[];
  onUpdateStatus: (leadId: string, status: LeadSubmission['status']) => void;
  onClearLeads: () => void;
}

export const AdminLeadDrawer: React.FC<AdminLeadDrawerProps> = ({
  isOpen,
  onClose,
  leads,
  onUpdateStatus,
  onClearLeads
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.includes(searchTerm) ||
      lead.phone.includes(searchTerm) ||
      lead.recommendedCourseTitle.includes(searchTerm) ||
      lead.couponCode.includes(searchTerm);
    const matchesType = filterType === 'all' || lead.type === filterType;
    return matchesSearch && matchesType;
  });

  const quizLeadsCount = leads.filter((l) => l.type === 'quiz_lead').length;
  const consultLeadsCount = leads.filter((l) => l.type === 'consultation_request').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden z-10 border border-gray-200 flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">
                원앤스엔씨 EDU - 리드 관리 시스템 (어드민)
              </h3>
              <p className="text-xs text-slate-400">
                실시간 수강 진단 DB, 1:1 상담 신청, 발급된 쿠폰 통합 현황
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-slate-800 text-slate-200 px-6 py-3 border-b border-slate-700 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px]">총 접수 리드</span>
            <span className="text-xl font-bold text-cyan-400">{leads.length}건</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px]">30초 진단 / 쿠폰발급</span>
            <span className="text-xl font-bold text-amber-400">{quizLeadsCount}건</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px]">1:1 맞춤 상담신청</span>
            <span className="text-xl font-bold text-emerald-400">{consultLeadsCount}건</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[10px]">상태관리</span>
              <span className="text-xs text-indigo-300">실시간 연동</span>
            </div>
            <button
              onClick={onClearLeads}
              className="text-[10px] text-red-400 hover:text-red-300 underline"
            >
              초기화
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row gap-3 justify-between items-center text-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름, 연락처, 쿠폰코드 검색..."
              className="w-full pl-9 border border-gray-300 p-2 rounded-lg bg-white outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg bg-white outline-hidden font-bold text-gray-700"
            >
              <option value="all">전체 리드 (All)</option>
              <option value="quiz_lead">진단 퀴즈 (10% 쿠폰)</option>
              <option value="consultation_request">1:1 상담 신청</option>
            </select>
          </div>
        </div>

        {/* Lead Table Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              접수된 리드 데이터가 없습니다. 상단 '30초 진단받기' 또는 '1:1 상담신청'을 통해 리드를 생성해 보세요!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                    <th className="p-3">접수일시</th>
                    <th className="p-3">성함</th>
                    <th className="p-3">연락처</th>
                    <th className="p-3">유형</th>
                    <th className="p-3">관심분야 / 추천강좌</th>
                    <th className="p-3">쿠폰코드</th>
                    <th className="p-3">처리상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-indigo-50/40 transition-colors">
                      <td className="p-3 font-mono text-gray-500 whitespace-nowrap">
                        {lead.submittedAt}
                      </td>
                      <td className="p-3 font-bold text-gray-900 whitespace-nowrap">
                        {lead.name}
                        {lead.companyName && (
                          <span className="block text-[10px] text-gray-400 font-normal">
                            {lead.companyName}
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                        {lead.phone}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            lead.type === 'quiz_lead'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {lead.type === 'quiz_lead' ? '30초 진단' : '1:1 상담'}
                        </span>
                      </td>
                      <td className="p-3 max-w-xs">
                        <span className="font-bold text-gray-800 block line-clamp-1">
                          {lead.recommendedCourseTitle}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          관심: {lead.interestField} | 목표: {lead.targetGoal}
                        </span>
                        {lead.message && (
                          <span className="block text-[10px] text-indigo-600 italic mt-0.5">
                            "{lead.message}"
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-mono font-bold text-indigo-700 whitespace-nowrap">
                        <span className="bg-indigo-50 px-2 py-1 rounded border border-indigo-200">
                          {lead.couponCode}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            onUpdateStatus(lead.id, e.target.value as LeadSubmission['status'])
                          }
                          className="border border-gray-300 rounded p-1 text-[11px] font-bold bg-white focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="신규접수">신규접수</option>
                          <option value="쿠폰발급">쿠폰발급</option>
                          <option value="상담대기">상담대기</option>
                          <option value="상담완료">상담완료</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
