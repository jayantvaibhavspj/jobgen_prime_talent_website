import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { queryChatBrain, initialSuggestions } from '../data/chatBrain';

// Helper to render bold markdown and linebreaks cleanly
function renderFormattedMessage(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx} style={{ color: '#ffffff', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    return (
      <span key={idx} style={{ display: 'block', minHeight: line ? 'auto' : '6px' }}>
        {content}
      </span>
    );
  });
}

export default function PrimeBot({ externalOpenSignal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "G'day! I'm **PrimeBot**, powered by **JobGen.ai** with **Ashwin Shiv's** 18+ years of Australian enterprise IT recruitment authority.\n\nAsk me about **2026 tech day rates**, hiring **Cloud, Data & AI, or Cybersecurity** contractors, or booking a strategy consultation.",
      actions: [
        { label: "2026 Salary Index ↗", to: "/salary-calculator" },
        { label: "48h Hiring Mandate ↗", to: "/contact" }
      ],
      suggestions: initialSuggestions
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState(initialSuggestions);

  const windowRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  // Clear legacy buggy localStorage coordinates
  useEffect(() => {
    try {
      localStorage.removeItem('primebot_anchor_pos');
      localStorage.removeItem('primebot_window_pos');
    } catch (e) {}
  }, []);

  // Handle external open trigger
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
      const response = queryChatBrain(query, messages);
      
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        actions: response.actions,
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      if (response.suggestions && response.suggestions.length > 0) {
        setActiveSuggestions(response.suggestions);
      }
    }, 380);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div 
        className={`copilot-floating-anchor ${isOpen ? 'chat-open' : ''}`}
        id="copilotAnchor"
      >
        {/* Speech bubble teaser */}
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
              <span className="chat-head-powered">Powered by JobGen.ai • 18+ Yrs Authority</span>
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
              <div className="chat-bubble-content">
                {renderFormattedMessage(m.text)}
              </div>

              {/* Interactive Direct Action Buttons */}
              {m.actions && m.actions.length > 0 && (
                <div className="chat-msg-actions">
                  {m.actions.map((act, aIdx) => {
                    if (act.to) {
                      return (
                        <Link 
                          key={aIdx} 
                          to={act.to} 
                          className="chat-action-btn" 
                          onClick={() => setIsOpen(false)}
                        >
                          {act.label}
                        </Link>
                      );
                    }
                    if (act.href) {
                      return (
                        <a 
                          key={aIdx} 
                          href={act.href} 
                          target={act.isExternal ? "_blank" : undefined} 
                          rel={act.isExternal ? "noopener noreferrer" : undefined} 
                          className="chat-action-btn"
                        >
                          {act.label}
                        </a>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble bot typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}

          {/* Dynamic Follow-up Prompt Chips */}
          <div className="chat-quick-chips">
            {activeSuggestions.slice(0, 4).map((sugg, idx) => (
              <button 
                key={idx} 
                type="button" 
                className="chat-chip" 
                onClick={() => handleSend(sugg)}
              >
                {sugg}
              </button>
            ))}
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
            placeholder="Ask about rates, hiring, or Ashwin Shiv..." 
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
