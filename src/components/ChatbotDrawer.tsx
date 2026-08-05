import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, MessageCircle, HelpCircle, PhoneCall, Gift } from 'lucide-react';

interface ChatbotDrawerProps {
  onOpenQuiz: () => void;
  onOpenConsultation: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickButtons?: { label: string; action: () => void }[];
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  onOpenQuiz,
  onOpenConsultation,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMsg, setInputMsg] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: '안녕하세요! 원앤스엔씨 EDU 스마트 챗봇 상담원입니다. 😊\n어떤 도움이 필요하신가요?',
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      quickButtons: [
        { label: '💡 30초 맞춤강의 진단 (10% 쿠폰)', action: () => onOpenQuiz() },
        { label: '📝 1:1 상담 / 단체 수강 문의', action: () => onOpenConsultation() },
        { label: '❓ 자주 묻는 질문 (FAQ)', action: () => handleSendQuick('자주 묻는 질문 보여줘') },
        { label: '🎁 진행 중인 수강 할인혜택', action: () => handleSendQuick('할인 혜택 안내') },
      ]
    }
  ]);

  const handleSendQuick = (queryText: string) => {
    const userMsgTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
      time: userMsgTime
    };

    let replyText = '원앤스엔씨 EDU 교육 커리큘럼 관련 상담이 접수되었습니다.';
    let buttons: { label: string; action: () => void }[] | undefined = undefined;

    if (queryText.includes('자주 묻는 질문')) {
      replyText = 'FAQ 안내입니다:\n1. 수강 기간은 결제일로부터 60일~90일입니다.\n2. 진도율 100% 달성 시 수료증이 즉시 발급됩니다.\n3. 모바일/PC 모두 자유롭게 수강 가능합니다.';
    } else if (queryText.includes('할인 혜택')) {
      replyText = '현재 상단 AI 진단 퀴즈 참여 시 10% 추가 할인 쿠폰을 즉시 받으실 수 있습니다! 또한 2개 이상 동시 수강 시 추가 15% 혜택이 적용됩니다.';
      buttons = [
        { label: '👉 AI 진단받고 10% 쿠폰받기', action: () => onOpenQuiz() }
      ];
    }

    const botMsg: ChatMessage = {
      id: `b-${Date.now()}`,
      sender: 'bot',
      text: replyText,
      time: userMsgTime,
      quickButtons: buttons
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const currentText = inputMsg;
    setInputMsg('');
    handleSendQuick(currentText);
  };

  return (
    <>
      {/* Floating Chat UI (High Density Theme) */}
      <div className="fixed bottom-24 right-6 md:bottom-24 md:right-8 z-40">
        <div className="relative group">
          <div className="absolute -top-12 right-0 bg-gray-900 text-white text-[11px] px-3 py-2 rounded-lg whitespace-nowrap shadow-lg transition-all duration-200">
            무엇이든 물어보세요! 👋
            <div className="absolute bottom-[-4px] right-4 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border-4 border-white"
          >
            <span className="text-2xl">💬</span>
          </button>
        </div>
      </div>

      {/* Chat Window Drawer / Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:bottom-20 md:right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200 overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="bg-[#fee500] px-4 py-3 text-gray-900 font-bold flex items-center justify-between border-b border-amber-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 text-amber-400 rounded-full flex items-center justify-center text-xs font-black">
                ONES
              </div>
              <div>
                <h4 className="text-sm font-black">ONESNC EDU 상담톡</h4>
                <p className="text-[10px] text-gray-700 font-normal">스마트 교육 컨설턴트 24시간 대기</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-black p-1 rounded hover:bg-amber-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-100 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] whitespace-pre-line leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-amber-300 text-gray-900 font-medium rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>

                {/* Quick Buttons if available */}
                {msg.quickButtons && msg.quickButtons.length > 0 && (
                  <div className="mt-2 space-y-1.5 w-full">
                    {msg.quickButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          btn.action();
                          setIsOpen(false);
                        }}
                        className="w-full text-left bg-white hover:bg-amber-50 text-blue-700 border border-amber-300 p-2 rounded-lg font-bold text-[11px] transition-colors shadow-2xs flex items-center justify-between"
                      >
                        <span>{btn.label}</span>
                        <span>➔</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="문의할 내용을 입력하세요..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-3 py-2 rounded-lg text-xs transition-colors"
            >
              전송
            </button>
          </form>
        </div>
      )}
    </>
  );
};
