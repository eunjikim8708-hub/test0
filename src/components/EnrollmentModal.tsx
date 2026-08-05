import React, { useState } from 'react';
import { X, CheckCircle, Tag, CreditCard, Sparkles } from 'lucide-react';
import { Course, LeadSubmission } from '../types';

interface EnrollmentModalProps {
  course: Course | null;
  onClose: () => void;
  activeCoupon: string | null;
  onAddLead: (lead: LeadSubmission) => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  course,
  onClose,
  activeCoupon,
  onAddLead
}) => {
  const [learnerName, setLearnerName] = useState<string>('');
  const [learnerPhone, setLearnerPhone] = useState<string>('');
  const [learnerEmail, setLearnerEmail] = useState<string>('');
  const [enteredCoupon, setEnteredCoupon] = useState<string>(activeCoupon || '');
  const [couponApplied, setCouponApplied] = useState<boolean>(!!activeCoupon);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  if (!course) return null;

  const discountPercent = couponApplied ? 10 : 0;
  const originalPrice = course.price;
  const couponDiscountAmount = Math.round((originalPrice * discountPercent) / 100);
  const finalPrice = originalPrice - couponDiscountAmount;

  const handleApplyCoupon = () => {
    if (enteredCoupon.trim()) {
      setCouponApplied(true);
      alert(`쿠폰 [${enteredCoupon}] 이 적용되어 10% 추가 할인이 반영되었습니다.`);
    }
  };

  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerName || !learnerPhone) {
      alert('수강생 이름과 연락처를 입력해 주세요.');
      return;
    }

    const newLead: LeadSubmission = {
      id: `enroll-${Date.now()}`,
      name: learnerName,
      phone: learnerPhone,
      interestField: course.categoryLabel,
      targetGoal: '수강신청 결제완료',
      recommendedCourseTitle: course.title,
      couponCode: couponApplied ? enteredCoupon : 'NO-COUPON',
      submittedAt: new Date().toLocaleString('ko-KR'),
      type: 'quiz_lead',
      status: '상담완료'
    };

    onAddLead(newLead);
    setPaymentSuccess(true);
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

        {paymentSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">수강신청 완료!</h3>
            <p className="text-sm text-gray-600">
              [나의학습방]에 과정이 등록되었습니다.<br />
              등록하신 연락처로 수강 안내 알림톡이 발송됩니다.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-left text-xs text-gray-600 space-y-1 border border-gray-200">
              <p>· 신청과정: <strong>{course.title}</strong></p>
              <p>· 결제금액: <strong className="text-blue-700">{finalPrice.toLocaleString()}원</strong></p>
              <p>· 학습기간: 수강 시작일로부터 {course.validDays}일</p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              확인
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                수강신청 및 결제
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 mt-1 line-clamp-1">
                {course.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                강사: {course.instructor} | {course.completionRate}
              </p>
            </div>

            <form onSubmit={handleSubmitEnrollment} className="space-y-4 text-sm">
              {/* Coupon Code Entry Section */}
              <div className="bg-blue-50/80 p-3.5 rounded-xl border border-blue-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    할인 쿠폰 적용
                  </span>
                  {activeCoupon && (
                    <span className="text-[10px] bg-yellow-300 text-blue-950 font-extrabold px-1.5 py-0.2 rounded">
                      진단쿠폰 보유중
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={enteredCoupon}
                    onChange={(e) => setEnteredCoupon(e.target.value)}
                    placeholder="쿠폰코드 입력 (예: ONESNC-AI10)"
                    className="flex-1 text-xs border border-blue-200 p-2 rounded-lg bg-white uppercase font-mono font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-2 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    적용
                  </button>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>수강 금액</span>
                  <span>{originalPrice.toLocaleString()}원</span>
                </div>
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-red-600 font-bold">
                    <span>쿠폰 10% 할인</span>
                    <span>-{couponDiscountAmount.toLocaleString()}원</span>
                  </div>
                )}
                <div className="pt-1 border-t border-gray-200 flex justify-between text-sm font-extrabold text-gray-900">
                  <span>최종 결제 금액</span>
                  <span className="text-blue-700 text-base">{finalPrice.toLocaleString()}원</span>
                </div>
              </div>

              {/* Learner Info */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">수강생 성함 *</label>
                  <input
                    type="text"
                    required
                    value={learnerName}
                    onChange={(e) => setLearnerName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">휴대폰 번호 *</label>
                  <input
                    type="tel"
                    required
                    value={learnerPhone}
                    onChange={(e) => setLearnerPhone(e.target.value)}
                    placeholder="01012345678"
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">이메일 (선택)</label>
                  <input
                    type="email"
                    value={learnerEmail}
                    onChange={(e) => setLearnerEmail(e.target.value)}
                    placeholder="learner@onesnc.co.kr"
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-2 text-sm mt-4"
              >
                <CreditCard className="w-4 h-4" />
                <span>{finalPrice.toLocaleString()}원 결제 / 수강 신청하기</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
