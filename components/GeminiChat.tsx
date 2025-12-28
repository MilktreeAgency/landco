import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GlassPanel } from './ui/EliteComponents';
import { Bot, Send, X, Loader2 } from 'lucide-react';

export const GeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Sanitize input to prevent XSS - removes HTML tags and limits length
  const sanitizeInput = (text: string): string => {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .trim()
      .slice(0, 1000); // Limit message length
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'model',
        text: "Welcome to Landco Elite Support. I am your AI Site Manager. Ask me about our security specifications, lease flexibility, or site access protocols.",
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const sanitizedInput = sanitizeInput(input);
    if (!sanitizedInput || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: sanitizedInput, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToGemini(sanitizedInput);

    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <GlassPanel className="w-[350px] md:w-[400px] h-[500px] mb-4 flex flex-col shadow-2xl shadow-slate-300 border-slate-200 animate-slideUp bg-white">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-landco-yellow flex items-center justify-center border border-yellow-500/20">
                <Bot className="w-5 h-5 text-landco-dark" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Site Manager AI</h4>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-emerald-600 font-mono">ONLINE</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-landco-dark text-white rounded-br-none font-medium' 
                    : 'bg-white text-slate-700 rounded-bl-none border border-slate-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 p-3 rounded-lg rounded-bl-none shadow-sm border border-slate-200">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your inquiry..."
                className="flex-grow bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-landco-yellow focus:ring-1 focus:ring-landco-yellow transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-landco-yellow text-landco-dark p-2 rounded-md hover:bg-landco-yellowHover transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </GlassPanel>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-landco-yellow text-landco-dark p-4 rounded-full shadow-xl shadow-yellow-500/20 hover:scale-110 transition-transform duration-300 group border-2 border-white"
      >
        <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};