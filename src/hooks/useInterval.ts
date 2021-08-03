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

  useEffect(() => {
    if (delay) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
