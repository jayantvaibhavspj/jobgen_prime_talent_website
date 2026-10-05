import React, { useState, useRef, useEffect } from 'react';

const botResponses = [
  {
    keywords: ['day rate', 'rate', 'salary', 'cost', 'cloud', 'remuneration', 'pay'],
    answer: "In the 2026 Australian tech market, Senior Cloud & DevOps Architects command between $1,200 – $1,550 AUD/day ($185k - $240k base). Check our live Salary Index page for precise role breakdowns across Sydney, Melbourne, Brisbane & Canberra."
  },
  {
    keywords: ['data', 'snowflake', 'databricks', 'engineer', 'ai', 'machine learning', 'genai'],
    answer: "We have active, pre-vetted Snowflake and Databricks data engineers and GenAI specialists available for 48-hour placement. Would you like to review candidate profiles or schedule a consultation with Ashwin Shiv?"
  },
  {
    keywords: ['ashwin', 'founder', 'director', 'background', 'who is', 'experience'],
    answer: "Ashwin Shiv is the Founder & Director of Prime Talent Solutions. He brings 18+ years of specialized technical talent acquisition experience across ASX-listed enterprises, Tier-1 ANZ banks, and federal agencies."
  },
  {
    keywords: ['book', 'call', 'meeting', 'strategy', 'contact', 'schedule'],
    answer: "You can book a 15-minute confidential strategy session directly on Ashwin's calendar via our Contact page, or call our Sydney HQ directly at +61 0450 173 053."
  },
  {
    keywords: ['security', 'cyber', 'soc', 'zero trust', 'apra', 'cps 234'],
    answer: "All our Cybersecurity placements are strictly vetted against APRA CPS 234 standards and Australian PSPF guidelines. We supply NV1-eligible engineers, DevSecOps specialists, and CISO advisory talent."
  }
];

export default function PrimeBot({ externalOpenSignal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "G'day! I'm PrimeBot, powered by JobGen.ai with Ashwin Shiv's 18+ years of Australian enterprise recruitment authority. How can I assist with your tech talent requirements today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const windowRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  // Clear legacy buggy localStorage coordinates so window always docks cleanly
  useEffect(() => {
    try {
      localStorage.removeItem('primebot_anchor_pos');
      localStorage.removeItem('primebot_window_pos');
    } catch (e) {}
  }, []);

  // Handle external open trigger (e.g. from header or CTA buttons)
  useEffect(() => {
    if (externalOpenSignal) {
      setIsOpen(true);
    }
  }, [externalOpenSignal]);

  // Focus input and scroll to bottom when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        if (logRef.current) {
          logRef.current.scrollTop = logRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [isOpen]);

  // Scroll chat on new messages
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleChat = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(prev => !prev);
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      const matched = botResponses.find(r => r.keywords.some(k => lower.includes(k)));
      const replyText = matched 
        ? matched.answer 
        : "Prime Talent Solutions delivers specialized Cloud, Data & AI, and Cybersecurity talent across Sydney, Melbourne, Brisbane & Canberra with guaranteed 48-hour shortlists. Would you like to submit a hiring mandate or speak directly with Ashwin Shiv?";
      
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: replyText }]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div 
        className={`copilot-floating-anchor ${isOpen ? 'chat-open' : ''}`}
        id="copilotAnchor"
      >
        {/* Speech bubble teaser (hidden when chat is open) */}
        {!isOpen && (
          <div 
            className="copilot-popup-bubble" 
            id="copilotPopupBubble" 
            onClick={toggleChat}
            role="button"
            tabIndex={0}
            aria-label="Open PrimeBot AI, Powered by JobGen.ai"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleChat(e); }}
          >
            <div className="copilot-popup-content">
              <span className="copilot-popup-title">PrimeBot</span>
              <span className="copilot-popup-subline">Powered by JobGen.ai</span>
            </div>
            <div className="copilot-popup-arrow"></div>
          </div>
        )}

        {/* Circular Floating Trigger Button */}
        <button 
          className="copilot-trigger-btn" 
          id="copilotTriggerBtn" 
          aria-label={isOpen ? "Close PrimeBot" : "Open PrimeBot"}
          onClick={toggleChat}
          type="button"
        >
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <div className="copilot-avatar-wrap">
              <img src="/assets/prime-talent-logo.png" alt="Prime Talent Logo" className="copilot-avatar-img" />
              <span className="copilot-status-pip"></span>
              <span className="copilot-radar-ping"></span>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <div 
        ref={windowRef}
        className={`copilot-chat-window ${isOpen ? 'open' : ''}`} 
        id="copilotChatWindow"
        role="dialog"
        aria-modal="false"
        aria-label="PrimeBot Digital Talent Assistant"
      >
        {/* Header Bar */}
        <div className="chat-head-bar">
          <div className="chat-head-left">
            <img src="/assets/prime-talent-logo.png" alt="Prime Talent Logo" className="chat-head-logo" />
            <div className="chat-head-info">
              <span className="chat-head-title">PrimeBot AI Assistant</span>
              <span className="chat-head-powered">Powered by JobGen.ai</span>
            </div>
          </div>
          <button 
            type="button"
            className="chat-close-btn" 
            onClick={() => setIsOpen(false)} 
            aria-label="Close Chat"
            title="Close Chat (Esc)"
          >
            &times;
          </button>
        </div>

        {/* Message History */}
        <div className="chat-log-area" ref={logRef} id="copilotLogArea">
          {messages.map(m => (
            <div key={m.id} className={`chat-bubble ${m.sender}`}>
              {m.text}
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble bot typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}

          {/* Quick Suggestion Chips */}
          <div className="chat-quick-chips">
            <button type="button" className="chat-chip" onClick={() => handleSend("What is the day rate for Cloud Architects in Sydney?")}>
              Cloud Day Rates
            </button>
            <button type="button" className="chat-chip" onClick={() => handleSend("I need to hire a contract Snowflake data engineer.")}>
              Hire Data Engineer
            </button>
            <button type="button" className="chat-chip" onClick={() => handleSend("Tell me about Ashwin Shiv's experience.")}>
              About Ashwin Shiv
            </button>
            <button type="button" className="chat-chip" onClick={() => handleSend("How do I book a strategy call?")}>
              Book Strategy Call
            </button>
          </div>
        </div>

        {/* Text Input Form */}
        <form 
          className="chat-input-bar" 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          <input 
            ref={inputRef}
            type="text" 
            className="chat-text-input" 
            placeholder="Ask a question or request talent..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoComplete="off" 
          />
          <button type="submit" className="chat-send-icon-btn" aria-label="Send Message" title="Send Message">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
