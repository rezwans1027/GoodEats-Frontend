// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRef, useCallback } from 'react';

export function useThrottle(callback, delay) {
  const throttling = useRef(false);

  const throttledCallback = useCallback((...args) => {
    if (!throttling.current) {
      callback(...args);
      throttling.current = true;
      setTimeout(() => {
        throttling.current = false;
      }, delay);
    }
  }, [callback, delay]);

  return throttledCallback;
}