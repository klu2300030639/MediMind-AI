import { useState } from 'react';
import { ChatMessage, ScreenId } from '../types';
import { Bot, Send, User, Sparkles, Mic, Volume2, ShieldCheck, AlertCircle, Pill, HeartPulse, RefreshCw } from 'lucide-react';

interface AIHealthChatProps {
  onNavigate: (screen: ScreenId) => void;
}

export function AIHealthChat({ onNavigate }: AIHealthChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm your MediMind Clinical AI Assistant (v4.2). I can analyze your symptoms, suggest over-the-counter (OTC) medicines, and provide personalized rest and recovery advice. What symptoms are you experiencing today?",
      timestamp: 'Just now',
      riskLevel: 'Low',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateAIResponse = (userQuery: string): ChatMessage => {
    const q = userQuery.toLowerCase();
    
    // Symptom: Headache
    if (q.includes('headache') || q.includes('head pain') || q.includes('migraine')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: `### 🩺 Symptom Analysis: Tension / Mild Headache

Based on your description, here are recommended OTC medication options and non-pharmacological recovery steps:

#### 💊 Recommended OTC Medications:
1. **Acetaminophen / Paracetamol (500 mg)**: Take 1 tablet every 6 hours after food as needed (Max 3,000 mg/day). Helps relieve moderate head pain.
2. **Ibuprofen (200 mg - 400 mg)**: Non-steroidal anti-inflammatory (NSAID) for throbbing pain. Take with water & food.

#### 🛌 Immediate Rest & Care Tips:
- **Hydrate Immediately**: Drink **500 ml (2 cups) of cold water**, as 70% of acute headaches stem from mild dehydration.
- **Dim Light & Quiet Rest**: Lie down in a dark, quiet room with your eyes closed for 30–45 minutes.
- **Cold / Warm Compress**: Place a cool damp cloth over your forehead or temples to ease vascular tension.
- **Avoid Screen Strain**: Pause phone/laptop usage to reduce ocular fatigue.

> ⚠️ **Safety Disclaimer**: *If your headache is sudden and severe ('thunderclap'), accompanied by fever, neck stiffness, or vision changes, seek emergency medical care immediately.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        riskLevel: 'Low',
        sources: [
          { title: 'Mayo Clinic - Tension Headache Treatment', url: '#' },
          { title: 'PubMed Health - OTC Analgesic Efficacy', url: '#' }
        ]
      };
    }

    // Symptom: Fever or Cold
    if (q.includes('fever') || q.includes('temperature') || q.includes('cold') || q.includes('cough')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: `### 🩺 Symptom Analysis: Fever & Viral Symptoms

#### 💊 Recommended OTC Medications:
1. **Paracetamol / Acetaminophen (500 mg)**: Effective antipyretic to reduce temperature and body aches. Take every 6 hours after food.
2. **Cetirizine (10 mg)** or **Phenylephrine**: Helps relieve nasal congestion and runny nose (Take 1 tablet at bedtime).

#### 🛌 Recovery & Hydration Advice:
- **Complete Bed Rest**: Allow your body's immune system to dedicate energy toward fighting the viral infection.
- **Warm Fluids & Electrolytes**: Drink warm herbal tea, ginger tea, or electrolyte solution (ORS) to replenish fluids.
- **Steam Inhalation**: Inhale steam with a hot towel for 10 minutes to clear airway passages.

> ⚠️ *Monitor body temperature. If fever exceeds 102°F (38.9°C) or lasts over 3 days, consult a physician.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        riskLevel: 'Moderate',
        sources: [{ title: 'CDC - Managing Viral Fever & Influenza', url: '#' }]
      };
    }

    // Symptom: Stomach pain or Acidity
    if (q.includes('stomach') || q.includes('acidity') || q.includes('gas') || q.includes('nausea')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: `### 🩺 Symptom Analysis: Gastric Distress & Acidity

#### 💊 Recommended OTC Medications:
1. **Antacid Gel / Chewable Tablets (Aluminium Hydroxide)**: Provides instant neutralization of stomach acid.
2. **Omeprazole (20 mg)** or **Pantoprazole**: Take 30 minutes before breakfast for heartburn relief.

#### 🛌 Care & Lifestyle Tips:
- **Stay Upright**: Avoid lying down flat for 2 hours after eating.
- **Sip Warm Water**: Drink small sips of warm water or chamomile tea.
- **Bland Diet**: Eat light foods (bananas, rice, toast). Avoid spicy, oily, or acidic foods.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        riskLevel: 'Low',
        sources: [{ title: 'Gastroenterology Guidelines for Acid Reflux', url: '#' }]
      };
    }

    // Default general response
    return {
      id: Date.now().toString(),
      sender: 'ai',
      text: `Thank you for sharing your symptoms. I have logged this query into your clinical passport. 

To give you the most accurate OTC medicine suggestions and care tips, could you let me know:
1. When did this symptom start?
2. Is the discomfort mild, moderate, or severe (1-10)?
3. Are you currently taking any prescription medications?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      riskLevel: 'Low',
      sources: [{ title: 'MediMind Clinical Protocol Engine', url: '#' }]
    };
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    const currentQuery = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = generateAIResponse(currentQuery);
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0066FF] rounded-2xl p-5 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
            <Bot className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg flex items-center gap-2">
              AI Clinical Health Assistant
              <span className="bg-blue-500/30 text-blue-200 text-[10px] px-2 py-0.5 rounded-full font-bold">v4.2 Active</span>
            </h1>
            <p className="text-xs text-blue-100">Medicine recommendations, rest tips, and symptom analysis</p>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('symptoms')}
          className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl border border-white/20 transition hidden sm:flex items-center gap-1.5"
        >
          <HeartPulse className="w-4 h-4 text-emerald-400" />
          Launch 3D Symptom Checker
        </button>
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex flex-wrap gap-2">
        {[
          "I have a severe headache, what medicine should I take?",
          "Suggest medicines & rest tips for fever & cold",
          "What can I take for stomach acidity and gas?",
          "How to get rid of muscle pain and fatigue?"
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => {
              setInput(prompt);
            }}
            className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0066FF] border border-slate-200 px-3 py-1.5 rounded-full transition shadow-sm font-medium flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#0066FF]" />
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 space-y-4 min-h-[420px] max-h-[550px] overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow">
                AI
              </div>
            )}

            <div className={`max-w-2xl rounded-2xl p-4 text-xs md:text-sm leading-relaxed space-y-2 ${
              msg.sender === 'user' 
                ? 'bg-[#0066FF] text-white rounded-br-none shadow-md shadow-blue-500/10' 
                : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-bl-none'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <span className={`block text-[10px] ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                You
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 items-center text-xs text-slate-400 p-2">
            <Bot className="w-4 h-4 text-[#0066FF] animate-spin" />
            <span>MediMind Clinical AI is evaluating medical literature & dosage protocols...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe how you feel (e.g. 'I have a headache' or 'I feel feverish')..."
          className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF] shadow-sm"
        />
        <button
          type="submit"
          className="bg-[#0066FF] hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-2xl text-xs md:text-sm transition flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <Send className="w-4 h-4" />
          <span>Ask AI</span>
        </button>
      </form>
    </div>
  );
}
