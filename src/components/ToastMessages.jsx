import React, { useState, useCallback } from 'react';

export const ToastMessages = ({ messages, setValidationMessages }) => {
  const [removingMessages, setRemovingMessages] = useState(new Set());

  const removeMessage = useCallback(
    (messageId) => {
      setRemovingMessages((prev) => new Set([...prev, messageId]));

      // Remove the message after animation completes
      setTimeout(() => {
        setValidationMessages((prev) =>
          prev.filter((msg) => msg.id !== messageId),
        );
        setRemovingMessages((prev) => {
          const newSet = new Set(prev);
          newSet.delete(messageId);
          return newSet;
        });
      }, 300);
    },
    [setValidationMessages],
  );

  const getToastClass = (message) => {
    const baseClass = 'toast-message';
    const isRemoving = removingMessages.has(message.id) ? ' removing' : '';

    let typeClass = '';
    switch (message.type) {
      case 'error':
        typeClass = ' toast-error';
        break;
      case 'validation-warning':
        typeClass = ' toast-warning';
        break;
      case 'smart-fill':
        typeClass = ' toast-smart-fill';
        break;
      default:
        typeClass = ' toast-success';
    }

    return baseClass + typeClass + isRemoving;
  };

  return (
    <div className="toast-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={getToastClass(message)}
          onClick={() => removeMessage(message.id)}
          title="Click to dismiss"
        >
          <div className="toast-content">
            <span className="toast-icon">
              {message.type === 'error'
                ? '❌'
                : message.type === 'validation-warning'
                  ? '⚠️'
                  : message.type === 'smart-fill'
                    ? '🤖'
                    : '✅'}
            </span>
            <span className="toast-text">{message.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
