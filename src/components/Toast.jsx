import React from 'react';

export default function Toast({ message, isVisible }) {
  return (
    <div className={`toast-bubble ${isVisible ? 'show' : ''}`} id="toastBubble">
      {message}
    </div>
  );
}
