import { useEffect, useRef } from 'react';

type useIntervalHandles = () => unknown;

export const useInterval = (
  callback: useIntervalHandles,
  delay?: number
): void => {
  const savedCallback = useRef<useIntervalHandles>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
