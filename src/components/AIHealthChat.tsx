import React, { useState } from 'react';
import { ScreenId, ChatMessage } from '../types';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Paperclip, 
  RefreshCw,
  Info
} from 'lucide-react';

interface AIHealthChatProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AIHealthChat: React.FC<AIHealthChatProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello Sarah! I am your MediMind AI Clinical Assistant. I can help analyze your symptoms, check medication safety, or summarize lab results.\n\nHow are you feeling today?",
      timestamp: '10:24 AM'
    },
    {
      id: '2',
      sender: 'user',
      text: "I've been experiencing a sharp throbbing headache behind my left eye for the past 4 hours. Light seems to bother me slightly.",
      timestamp: '10:25 AM'
    },
    {
      id: '3',
      sender: 'ai',
      text: "Based on your description (unilateral throbbing pain behind the left eye accompanied by photophobia), this clinical presentation is consistent with a **Migraine headache** or **Cluster headache pattern**.\n\n**Key Observations:**\n• Duration: 4 hours (Acute onset)\n• Associated symptoms: Photophobia (light sensitivity)\n\n**Recommended Actions:**\n1. Rest in a dark, quiet room with cool compress.\n2. Hydrate with 500ml water.\n3. Monitor for warning signs like sudden speech difficulty, vision loss, or neck stiffness.",
      timestamp: '10:26 AM',
      isWarning: true,
      sources: [
        { title: 'Mayo Clinic: Unilateral Headache Assessment', url: 'https://www.mayoclinic.org' },
        { title: 'PubMed: Acute Photophobia Triage Protocols', url: 'https://pubmed.ncbi.nlm.nih.gov' }
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Thank you for sharing that detail. I have logged this query into your health profile. Based on your current records and symptoms, I recommend scheduling a consultation with your Neurologist, Dr. Elena Rostova, if pain persists past 8 hours.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: [
          { title: 'Clinical Guideline: Tension & Vascular Headache Pathways', url: '#' }
        ]
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      
      {/* Header Banner */}
      <div className="flex items-center justify-between glass-card p-4 rounded-2xl border-blue-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base text-slate-900">MediMind Health Assistant</h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">Engine v4.2</span>
            </div>
            <p className="text-xs text-slate-500">HIPAA Compliant &bull; 256-bit Encrypted Triage</p>
          </div>
        </div>

        <button 
          onClick={() => setMessages(messages.slice(0, 1))}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset Session</span>
        </button>
      </div>

      {/* Suggested Prompts Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: '🧠', title: 'Analyze Symptoms', text: '"Analyze my headache behind left eye"' },
          { icon: '💊', title: 'Drug Interaction', text: '"Check Amoxicillin & Ibuprofen safety"' },
          { icon: '🥗', title: 'Wellness Tips', text: '"Best hydration plan for deep REM sleep"' },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => setInput(item.text.replace(/"/g, ''))}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/70 hover:border-blue-500 text-left transition-all hover:shadow-md group"
          >
            <span className="text-xl mb-1 block group-hover:scale-110 transition-transform">{item.icon}</span>
            <p className="font-bold text-xs text-slate-900">{item.title}</p>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.text}</p>
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm ${
              msg.sender === 'user' ? 'bg-slate-800' : 'bg-blue-600'
            }`}>
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-sm'
              }`}>
                {msg.text.split('\n').map((paragraph, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>{paragraph}</p>
                ))}

                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-blue-600" /> Cited Medical Context
                    </p>
                    {msg.sources.map((src, sIdx) => (
                      <a 
                        key={sIdx} 
                        href={src.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="block text-xs font-semibold text-blue-600 hover:underline"
                      >
                        &bull; {src.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className={`flex items-center gap-2 text-[10px] text-slate-400 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <ShieldCheck className="w-3 h-3" /> Verified Diagnostic Engine
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic font-medium p-2">
            <Bot className="w-4 h-4 text-blue-600 animate-spin" />
            <span>MediMind AI is analyzing clinical literature...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="sticky bottom-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-300 shadow-xl flex items-center gap-3">
        <button 
          onClick={() => alert("Voice Dictation active. Speak clearly into microphone.")}
          className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          title="Voice Dictation"
        >
          <Mic className="w-5 h-5" />
        </button>

        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask MediMind AI about symptoms, medications, or lab values..."
          className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400 font-medium"
        />

        <button 
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-40 transition-all shadow-md"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      <div className="text-center text-[11px] text-slate-400">
        <p>Disclaimer: AI advice is for informational guidance and not a substitute for professional medical care.</p>
      </div>
    </div>
  );
};
