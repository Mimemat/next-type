import { useEffect, useState } from 'react';

export const useType = (): { pressed: globalThis.KeyboardEvent } => {
  const [pressed, setPressed] = useState<globalThis.KeyboardEvent>();

  const handleKeyDown = (key: globalThis.KeyboardEvent) => {
    const keyData = key.key;
    if (keyData.length === 1) {
      setPressed(key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { pressed };
};
