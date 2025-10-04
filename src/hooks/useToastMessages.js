import { useCallback, useEffect, useRef, useState } from 'react';

const MESSAGE_DURATION = 3000;

/**
 * Custom hook for managing toast messages with automatic cleanup
 * @returns {Object} Toast message utilities
 */
export function useToastMessages() {
  const [messages, setMessages] = useState([]);
  const timeoutsRef = useRef(new Map());

  // Show message with automatic dismissal
  const showMessage = useCallback((text, type = 'success', duration = MESSAGE_DURATION) => {
    const id = Date.now() + Math.random();
    const newMessage = { id, text, type };

    setMessages((prev) => [...prev, newMessage]);

    // Clear any existing timeout for this message
    if (timeoutsRef.current.has(id)) {
      clearTimeout(timeoutsRef.current.get(id));
    }

    // Set new timeout and store reference
    const timeoutId = setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      timeoutsRef.current.delete(id);
    }, duration);

    timeoutsRef.current.set(id, timeoutId);
  }, []);

  // Clear validation warnings
  const clearValidationWarnings = useCallback(() => {
    setMessages((prev) => prev.filter((msg) => msg.type !== 'validation-warning'));
  }, []);

  // Add validation warning
  const addValidationWarning = useCallback((text) => {
    const id = Date.now() + Math.random();
    const warningMessage = { id, text, type: 'validation-warning' };
    setMessages((prev) => [...prev, warningMessage]);
  }, []);

  // Cleanup all timeouts on unmount
  useEffect(
    () => () => {
      timeoutsRef.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
      timeoutsRef.current.clear();
    },
    [],
  );

  return {
    addValidationWarning,
    clearValidationWarnings,
    messages,
    setMessages,
    showMessage,
  };
}
