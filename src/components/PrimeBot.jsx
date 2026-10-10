import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { queryChatBrain, initialSuggestions } from '../data/chatBrain';

// Helper to render bold markdown and linebreaks cleanly
function renderFormattedMessage(text) {
  if (!text) return null;
  const lines = text.split('\n').map((line) => line.trim());
  return lines.map((line, idx) => {
    if (!line) return <span key={idx} className="chat-message-spacer" aria-hidden="true" />;

    const isListItem = /^(?:[•-]|\d+\.)\s/.test(line);
    const cleanLine = line.replace(/^(?:[•-]|\d+\.)\s*/, '');
    const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx} style={{ color: '#ffffff', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    return (
      <span key={idx} className={`chat-message-line${isListItem ? ' chat-message-list-item' : ''}`}>
        {content}
      </span>
    );
  });
}

function clampElementToViewport(element, maxWidth, maxHeight) {
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
  if (maxWidth) {
    element.style.width = `${Math.max(1, Math.min(maxWidth, viewportWidth - 16))}px`;
  }
  if (maxHeight) {
    element.style.height = `${Math.max(1, Math.min(maxHeight, viewportHeight - 16))}px`;
  }

  const rect = element.getBoundingClientRect();
  const maxLeft = Math.max(8, viewportWidth - element.offsetWidth - 8);
  const maxTop = Math.max(8, viewportHeight - element.offsetHeight - 8);
  const left = Math.min(Math.max(rect.left, 8), maxLeft);
  const top = Math.min(Math.max(rect.top, 8), maxTop);

  element.style.left = `${left}px`;
  element.style.top = `${top}px`;
  element.style.right = 'auto';
  element.style.bottom = 'auto';
}

export default function PrimeBot({ externalOpenSignal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "G'day! I'm **PrimeBot**, powered by JobGen.ai. I can help with:\n• Tech salary benchmarks\n• Cloud, Data & AI, and Cyber hiring\n• Booking a call with Ashwin Shiv",
      actions: [
        { label: "2026 Salary Index ↗", to: "/salary-calculator" },
        { label: "Submit Hiring Mandate ↗", to: "/contact" }
      ],
      suggestions: initialSuggestions
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState(initialSuggestions);

  const windowRef = useRef(null);
  const anchorRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);

  // Restore saved bot positions.
  useEffect(() => {
    try {
      [
        [anchorRef.current, 'primebot-anchor-position-v2'],
        [windowRef.current, 'primebot-window-position-v2']
      ].forEach(([element, key]) => {
        const saved = JSON.parse(localStorage.getItem(key) || 'null');
        if (!element || !saved || !Number.isFinite(saved.left) || !Number.isFinite(saved.top)) return;

        element.style.left = `${saved.left}px`;
        element.style.top = `${saved.top}px`;
        element.style.right = 'auto';
        element.style.bottom = 'auto';
        clampElementToViewport(
          element,
          element === windowRef.current ? 380 : undefined,
          element === windowRef.current ? 520 : undefined
        );
      });
    } catch (e) {}
  }, []);

  useEffect(() => {
    const keepElementsInViewport = () => {
      [anchorRef.current, windowRef.current].forEach((element) => {
        if (element) {
          clampElementToViewport(
            element,
            element === windowRef.current ? 380 : undefined,
            element === windowRef.current ? 520 : undefined
          );
        }
      });
    };
    const resizeObserver = 'ResizeObserver' in window
      ? new ResizeObserver(keepElementsInViewport)
      : null;

    window.addEventListener('resize', keepElementsInViewport);
    window.visualViewport?.addEventListener('resize', keepElementsInViewport);
    if (resizeObserver) {
      if (anchorRef.current) resizeObserver.observe(anchorRef.current);
      if (windowRef.current) resizeObserver.observe(windowRef.current);
    }
    keepElementsInViewport();

    return () => {
      window.removeEventListener('resize', keepElementsInViewport);
      window.visualViewport?.removeEventListener('resize', keepElementsInViewport);
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const drag = dragRef.current;
      if (!drag) return;

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return;

      drag.moved = true;
      suppressClickRef.current = true;
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
      const maxLeft = Math.max(8, viewportWidth - drag.element.offsetWidth - 8);
      const maxTop = Math.max(8, viewportHeight - drag.element.offsetHeight - 8);
      drag.element.style.left = `${Math.min(Math.max(drag.left + deltaX, 8), maxLeft)}px`;
      drag.element.style.top = `${Math.min(Math.max(drag.top + deltaY, 8), maxTop)}px`;
      drag.element.style.right = 'auto';
      drag.element.style.bottom = 'auto';
      event.preventDefault();
    };

    const handlePointerUp = () => {
      const drag = dragRef.current;
      if (!drag) return;

      if (drag.moved) {
        const rect = drag.element.getBoundingClientRect();
        try {
          localStorage.setItem(drag.storageKey, JSON.stringify({ left: rect.left, top: rect.top }));
        } catch (e) {}
      }
      dragRef.current = null;
      document.body.style.userSelect = '';
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      document.body.style.userSelect = '';
    };
  }, []);

  const startDrag = (event, elementRef, storageKey) => {
    if (event.button !== 0 || event.target.closest('a, input')) return;
    if (storageKey === 'primebot-window-position-v2' && event.target.closest('button')) return;
    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    dragRef.current = {
      element,
      storageKey,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top,
      moved: false
    };
  };

  const positionChatNearTrigger = () => {
    const anchor = anchorRef.current;
    const chatWindow = windowRef.current;
    if (!anchor || !chatWindow) return;

    const anchorRect = anchor.getBoundingClientRect();
    const chatWidth = chatWindow.offsetWidth;
    const chatHeight = chatWindow.offsetHeight;
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
    const maxLeft = Math.max(8, viewportWidth - chatWidth - 8);
    const maxTop = Math.max(8, viewportHeight - chatHeight - 8);
    const left = Math.min(Math.max(anchorRect.right - chatWidth, 8), maxLeft);
    let top = anchorRect.top - chatHeight - 12;
    if (top < 8) top = anchorRect.bottom + 12;

    chatWindow.style.left = `${left}px`;
    chatWindow.style.top = `${Math.min(Math.max(top, 8), maxTop)}px`;
    chatWindow.style.right = 'auto';
    chatWindow.style.bottom = 'auto';
  };

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
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (!isOpen) {
      try {
        if (!localStorage.getItem('primebot-window-position-v2')) {
          requestAnimationFrame(positionChatNearTrigger);
        }
      } catch (error) {
        requestAnimationFrame(positionChatNearTrigger);
      }
    }
    setIsOpen(!isOpen);
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
        ref={anchorRef}
        className={`copilot-floating-anchor ${isOpen ? 'chat-open' : ''}`}
        id="copilotAnchor"
        onPointerDown={(event) => startDrag(event, anchorRef, 'primebot-anchor-position-v2')}
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
          onPointerDown={(event) => {
            event.stopPropagation();
            startDrag(event, anchorRef, 'primebot-anchor-position-v2');
          }}
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
        <div
          className="chat-head-bar"
          onPointerDown={(event) => startDrag(event, windowRef, 'primebot-window-position-v2')}
        >
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
