import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useIdleAction Hook
 * 
 * @param {Object} options - Configurations for the hook
 * @param {number} [options.timeout=60000] - Time in ms after which user is considered idle
 * @param {function} [options.onIdle] - Callback triggered when user becomes idle
 * @param {string[]} [options.events] - Events that reset the idle timer
 */
export function useIdleAction({
  timeout = 60000, // default 1 minute
  onIdle,
  events = ["mousemove", "keydown", "scroll", "touchstart"],
} = {}) {
  const [isIdle, setIsIdle] = useState(false);
  const [lastActive, setLastActive] = useState(new Date());
  const timerRef = useRef(null);

  // Reset idle timer whenever activity is detected
  const resetIdleTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsIdle(false);
    setLastActive(new Date());

    timerRef.current = setTimeout(() => {
      setIsIdle(true);
      if (onIdle) onIdle();
    }, timeout);
  }, [timeout, onIdle]);

  useEffect(() => {
    // Attach event listeners
    events.forEach((event) => window.addEventListener(event, resetIdleTimer));

    // Start initial timer
    resetIdleTimer();

    return () => {
      // Cleanup listeners + timer on unmount
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, resetIdleTimer)
      );
    };
  }, [events, resetIdleTimer]);

  return { isIdle, lastActive, resetIdleTimer };
}
