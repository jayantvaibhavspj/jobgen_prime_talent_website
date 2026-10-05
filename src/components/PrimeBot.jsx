import React, { useState, useRef, useEffect, useCallback } from 'react';

const botResponses = [
  {
    keywords: ['day rate', 'rate', 'salary', 'cost', 'cloud'],
    answer: "In the 2026 Australian market, Senior Cloud & DevOps Architects command between $1,200 – $1,550 AUD/day. Check our live Salary Index section for precise role breakdowns across Sydney, Melbourne & Canberra."
  },
  {
    keywords: ['data', 'snowflake', 'databricks', 'hire'],
    answer: "We have active, pre-vetted Snowflake and Databricks data engineers available for 48-hour deployment. Would you like me to connect you directly with Ashwin Shiv to review candidate rubrics?"
  },
  {
    keywords: ['ashwin', 'founder', 'background', 'who is'],
    answer: "Ashwin Shiv is the Founder & Director of Prime Talent Solutions. He brings 18+ years of technical talent acquisition experience across Fortune 500 enterprises, top ANZ banks, and federal government agencies."
  },
  {
    keywords: ['book', 'call', 'meeting', 'strategy'],
    answer: "You can book a 15-minute strategy call directly on Ashwin's calendar in the booking section, or call directly at +61 0450 173 053."
  }
];

export default function PrimeBot({ externalOpenSignal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "G'day! I'm Prime Talent's digital assistant powered by JobGen.ai with Ashwin Shiv's 18+ years of Australian tech recruitment authority. How can I assist you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  // Position state for the floating button / anchor
  const [anchorPos, setAnchorPos] = useState(() => {
    try {
      const saved = localStorage.getItem('primebot_anchor_pos');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  // Position state for the open chat window
  const [windowPos, setWindowPos] = useState(() => {
    try {
      const saved = localStorage.getItem('primebot_window_pos');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const anchorRef = useRef(null);
  const windowRef = useRef(null);
  const logRef = useRef(null);

  // Dragging tracking refs
  const dragInfo = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    origLeft: 0,
    origTop: 0,
    hasMoved: false
  });

  const windowDragInfo = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    origLeft: 0,
    origTop: 0
  });

  // Handle external open trigger
  useEffect(() => {
    if (externalOpenSignal) {
      setIsOpen(true);
    }
  }, [externalOpenSignal]);

  // Scroll chat to bottom on new message
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Keep both within viewport on window resize
  const clampToViewport = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (anchorPos) {
      const w = 70;
      const h = 70;
      const clampedL = Math.max(10, Math.min(vw - w - 10, anchorPos.left));
      const clampedT = Math.max(10, Math.min(vh - h - 10, anchorPos.top));
      if (clampedL !== anchorPos.left || clampedT !== anchorPos.top) {
        setAnchorPos({ left: clampedL, top: clampedT });
      }
    }

    if (windowPos) {
      const cw = Math.min(380, vw - 24);
      const ch = Math.min(520, vh - 24);
      const clampedL = Math.max(10, Math.min(vw - cw - 10, windowPos.left));
      const clampedT = Math.max(10, Math.min(vh - ch - 10, windowPos.top));
      if (clampedL !== windowPos.left || clampedT !== windowPos.top) {
        setWindowPos({ left: clampedL, top: clampedT });
      }
    }
  }, [anchorPos, windowPos]);

  useEffect(() => {
    window.addEventListener('resize', clampToViewport);
    return () => window.removeEventListener('resize', clampToViewport);
  }, [clampToViewport]);

  // =========================================================================
  // 1. DRAG LOGIC FOR FLOATING BUTTON / ANCHOR
  // =========================================================================
  const handleAnchorPointerDown = (e) => {
    // Ignore right click
    if (e.button !== 0) return;

    const el = anchorRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    dragInfo.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origLeft: rect.left,
      origTop: rect.top,
      hasMoved: false
    };

    const handlePointerMove = (ev) => {
      if (!dragInfo.current.isDragging) return;

      const dx = ev.clientX - dragInfo.current.startX;
      const dy = ev.clientY - dragInfo.current.startY;

      if (Math.hypot(dx, dy) > 4) {
        dragInfo.current.hasMoved = true;
      }

      if (dragInfo.current.hasMoved) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const w = rect.width;
        const h = rect.height;

        const newL = Math.max(10, Math.min(vw - w - 10, dragInfo.current.origLeft + dx));
        const newT = Math.max(10, Math.min(vh - h - 10, dragInfo.current.origTop + dy));

        setAnchorPos({ left: newL, top: newT });
        document.body.style.userSelect = 'none';
      }
    };

    const handlePointerUp = () => {
      if (!dragInfo.current.isDragging) return;
      dragInfo.current.isDragging = false;
      document.body.style.userSelect = '';

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (dragInfo.current.hasMoved) {
        setAnchorPos(curr => {
          if (curr) {
            try {
              localStorage.setItem('primebot_anchor_pos', JSON.stringify(curr));
            } catch (err) {}
          }
          return curr;
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleAnchorClick = (e) => {
    // If was dragged, don't trigger click toggle
    if (dragInfo.current.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setIsOpen(!isOpen);
  };

  // =========================================================================
  // 2. DRAG LOGIC FOR CHAT WINDOW (by Header Bar)
  // =========================================================================
  const handleWindowHeaderPointerDown = (e) => {
    // Don't drag if clicking the close button
    if (e.target.closest('.chat-close-btn')) return;
    if (e.button !== 0) return;

    const el = windowRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    windowDragInfo.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origLeft: rect.left,
      origTop: rect.top
    };

    document.body.style.userSelect = 'none';

    const handlePointerMove = (ev) => {
      if (!windowDragInfo.current.isDragging) return;

      const dx = ev.clientX - windowDragInfo.current.startX;
      const dy = ev.clientY - windowDragInfo.current.startY;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = rect.width;
      const h = rect.height;

      const newL = Math.max(10, Math.min(vw - w - 10, windowDragInfo.current.origLeft + dx));
      const newT = Math.max(10, Math.min(vh - h - 10, windowDragInfo.current.origTop + dy));

      setWindowPos({ left: newL, top: newT });
    };

    const handlePointerUp = () => {
      if (!windowDragInfo.current.isDragging) return;
      windowDragInfo.current.isDragging = false;
      document.body.style.userSelect = '';

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      setWindowPos(curr => {
        if (curr) {
          try {
            localStorage.setItem('primebot_window_pos', JSON.stringify(curr));
          } catch (err) {}
        }
        return curr;
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Compute Chat Window style
  const getChatWindowStyle = () => {
    if (windowPos) {
      return {
        left: `${windowPos.left}px`,
        top: `${windowPos.top}px`,
        right: 'auto',
        bottom: 'auto'
      };
    }

    if (anchorPos) {
      const cw = 380;
      const ch = 520;
      let left = anchorPos.left - cw + 60;
      let top = anchorPos.top - ch - 14;

      if (left < 10) left = 10;
      if (left + cw > window.innerWidth - 10) left = window.innerWidth - cw - 10;
      if (top < 10) top = anchorPos.top + 70;
      if (top + ch > window.innerHeight - 10) top = window.innerHeight - ch - 10;

      return {
        left: `${left}px`,
        top: `${top}px`,
        right: 'auto',
        bottom: 'auto'
      };
    }

    return {};
  };

  // =========================================================================
  // 3. SEND MESSAGES & CHIPS
  // =========================================================================
  const handleSend = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      const lower = query.toLowerCase();
      const matched = botResponses.find(r => r.keywords.some(k => lower.includes(k)));
      const replyText = matched 
        ? matched.answer 
        : "Prime Talent Solutions specializes in Cloud, Data & AI, and Cybersecurity across Australia with 48h guaranteed shortlists. Would you like to request talent or speak with Ashwin Shiv?";
      
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: replyText }]);
    }, 450);
  };

  const anchorStyle = anchorPos ? {
    left: `${anchorPos.left}px`,
    top: `${anchorPos.top}px`,
    right: 'auto',
    bottom: 'auto'
  } : {};

  return (
    <>
      {/* Floating Draggable Anchor / Button */}
      <div 
        ref={anchorRef}
        className={`copilot-floating-anchor ${isOpen ? 'chat-open' : ''}`}
        id="copilotAnchor"
        style={{
          ...anchorStyle,
          cursor: 'grab'
        }}
        onPointerDown={handleAnchorPointerDown}
      >
        {/* Speech bubble teaser */}
        <div 
          className="copilot-popup-bubble" 
          id="copilotPopupBubble" 
          onClick={handleAnchorClick}
          role="tooltip"
          aria-label="PrimeBot AI, Powered by JobGen.ai"
        >
          <div className="copilot-popup-content">
            <span className="copilot-popup-title">PrimeBot</span>
            <span className="copilot-popup-subline">Powered by JobGen.ai</span>
          </div>
          <div className="copilot-popup-arrow"></div>
        </div>

        {/* Circular Floating Trigger Button */}
        <button 
          className="copilot-trigger-btn" 
          id="copilotTriggerBtn" 
          aria-label="Open PrimeBot"
          onClick={handleAnchorClick}
        >
          <div className="copilot-avatar-wrap">
            <img src="/assets/prime-talent-logo.png" alt="Prime Talent Logo" className="copilot-avatar-img" />
            <span className="copilot-status-pip"></span>
          </div>
          <span className="copilot-radar-ping"></span>
        </button>
      </div>

      {/* Floating Draggable Chat Window */}
      <div 
        ref={windowRef}
        className={`copilot-chat-window ${isOpen ? 'open' : ''}`} 
        id="copilotChatWindow"
        style={getChatWindowStyle()}
      >
        {/* Drag handle header bar */}
        <div 
          className="chat-head-bar"
          onPointerDown={handleWindowHeaderPointerDown}
          style={{ cursor: 'grab', userSelect: 'none' }}
          title="Drag to move chat window"
        >
          <div className="chat-head-left">
            <img src="/assets/prime-talent-logo.png" alt="Prime Talent Logo" className="chat-head-logo" />
            <div className="chat-head-info">
              <span className="chat-head-title">PrimeBot Assistant <span style={{ fontSize: '0.72rem', opacity: 0.6, fontWeight: 400 }}>(Drag)</span></span>
              <span className="chat-head-powered">Powered by JobGen.ai</span>
            </div>
          </div>
          <button 
            className="chat-close-btn" 
            onClick={() => setIsOpen(false)} 
            aria-label="Close Chat"
          >
            &times;
          </button>
        </div>

        {/* Chat message history */}
        <div className="chat-log-area" ref={logRef} id="copilotLogArea">
          {messages.map(m => (
            <div key={m.id} className={`chat-bubble ${m.sender}`}>
              {m.text}
            </div>
          ))}

          <div className="chat-quick-chips">
            <button className="chat-chip" onClick={() => handleSend("What is the day rate for Cloud Architects in Sydney?")}>
              Cloud Day Rates
            </button>
            <button className="chat-chip" onClick={() => handleSend("I need to hire a contract Snowflake data engineer.")}>
              Hire Data Engineer
            </button>
            <button className="chat-chip" onClick={() => handleSend("Tell me about Ashwin Shiv's experience.")}>
              About Ashwin Shiv
            </button>
            <button className="chat-chip" onClick={() => handleSend("How do I book a strategy call?")}>
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
            type="text" 
            className="chat-text-input" 
            placeholder="Ask a question or request talent..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoComplete="off" 
          />
          <button type="submit" className="chat-send-icon-btn" aria-label="Send Message">
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
