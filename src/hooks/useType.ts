import { useState, useMemo, useCallback, useEffect } from 'react';

export interface IWord {
  id: string;
  value: string;
}

type useTypeReturn = {
  pastWords: IWord[];
  nextWords: IWord[];
  wpm: string;
  activeWord: number;
  activeChar: number;
  wrongChars: number[];
};

export const useType = (words: IWord[]): useTypeReturn => {
  const [startTime, setStartTime] = useState<number>();
  const [wpm, setWpm] = useState<string>('0');

  const [pastWords, setPastWords] = useState<IWord[]>([]);
  const [activeWord, setActiveWord] = useState<number>(0);

  const [activeChar, setActiveChar] = useState(0);
  const [wrongChars, setWrongChars] = useState<number[]>([]);

  const nextWords = useMemo(() => {
    return words.slice(pastWords.length + 1);
  }, [pastWords, words]);

  const handlePressSpace = useCallback(() => {
    if (
      activeChar + 1 === words[activeWord].value.length &&
      wrongChars.length === 0
    ) {
      const deltaTime = (new Date().getTime() - startTime) / 60000;

      setWpm(((activeWord + 1) / deltaTime).toFixed(1));

      setPastWords((oldState) => [...oldState, words[activeWord]]);

      setWrongChars([]);

      setActiveWord((oldState) => oldState + 1);

      setActiveChar(0);
    }
  }, [activeChar, words, startTime, activeWord, wrongChars]);

  const handlePressDelete = useCallback(() => {
    const pastIndex = activeChar - 1;

    if (wrongChars.includes(pastIndex)) {
      setWrongChars((oldState) => oldState.slice(0, -1));
    }

    setActiveChar(pastIndex);
  }, [activeChar, wrongChars]);

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
          if (pressed.key.length !== 1) return;

          if (pressed?.key !== words[activeWord].value[activeChar]) {
            setWrongChars((oldState) => [...oldState, activeChar]);
          }

          if (!startTime) {
            setStartTime(new Date().getTime());
          }

          setActiveChar(activeChar + 1);
      }
    },
    [
      activeChar,
      activeWord,
      startTime,
      words,
      handlePressSpace,
      handlePressDelete,
    ]
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
  };
};
