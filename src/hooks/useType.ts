import { useState, useMemo, useCallback, useEffect } from 'react';

import { useInterval } from './useInterval';

export interface IWord {
  id: string;
  value: string;
}

type useTypeReturn = {
  pastWords: IWord[];
  hasEnded: boolean;
  nextWords: IWord[];
  wpm: string;
  activeWord: number;
  activeChar: number;
  wrongChars: number[];
};

export const useType = (words: IWord[]): useTypeReturn => {
  const [startTime, setStartTime] = useState<number>(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [wpm, setWpm] = useState<string>('0');

  const [activeWord, setActiveWord] = useState<number>(0);

  const [activeChar, setActiveChar] = useState(0);

  const nextWords = useMemo(() => {
    return words.slice(activeWord + 1);
  }, [activeWord, words]);

  const pastWords = useMemo(() => {
    return words.slice(0, activeWord);
  }, [activeWord, words]);

  const [wrongChars, setWrongChars] = useState<number[]>([]);

  useInterval(
    () => {
      const deltaTime = (new Date().getTime() - startTime) / 60000;

      const pastWordsLength = pastWords.reduce(
        (accumulator, current) => accumulator + current.value.length,
        0
      );

      const characterNumber = pastWordsLength + activeChar - wrongChars.length;

      setWpm((characterNumber / 5 / deltaTime).toFixed(1));
    },
    startTime ? 1000 : null
  );

  const handlePressSpace = useCallback(() => {
    if (activeChar + 1 === words[activeWord].value.length) {
      console.log(activeWord, words.length);
      if (activeWord === words.length - 1) {
        setStartTime(null);
        return setHasEnded(true);
      }
      if (wrongChars.length === 0) {
        setWrongChars([]);

        setActiveWord((oldState) => oldState + 1);

        setActiveChar(0);
      }
    }
  }, [activeChar, words, activeWord, wrongChars]);

  const handlePressDelete = useCallback(() => {
    const pastIndex = activeChar - 1;

    if (wrongChars.includes(pastIndex)) {
      setWrongChars((oldState) => oldState.slice(0, -1));
    }

    setActiveChar(pastIndex);
  }, [activeChar, wrongChars]);

  const handlePressKey = useCallback(
    (pressed: globalThis.KeyboardEvent) => {
      if (pressed.key.length !== 1) return;

      if (pressed?.key !== words[activeWord].value[activeChar]) {
        setWrongChars((oldState) => [...oldState, activeChar]);
      }

      if (!startTime) {
        setStartTime(new Date().getTime());
      }

      setActiveChar(activeChar + 1);
    },
    [activeChar, activeWord, startTime, words]
  );

  const handleType = useCallback(
    (pressed: globalThis.KeyboardEvent) => {
      switch (pressed.code) {
        case 'Space':
          handlePressSpace();
          break;

        case 'Backspace':
          handlePressDelete();
          break;

        default:
          handlePressKey(pressed);
      }
    },
    [handlePressKey, handlePressSpace, handlePressDelete]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleType);

    return () => {
      window.removeEventListener('keydown', handleType);
    };
  }, [handleType]);

  return {
    wpm,
    nextWords,
    pastWords,
    activeChar,
    activeWord,
    wrongChars,
    hasEnded,
  };
};
