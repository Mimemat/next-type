import React, { useEffect, useState, useMemo } from 'react';

import { AnimateSharedLayout, motion } from 'framer-motion';

import { useType } from '~/hooks/useType';
import { IWord } from '~/pages';

const Typer: React.VFC<{ words: IWord[] }> = ({ words }) => {
  const [startTime, setStartTime] = useState<number>();
  const [wpm, setWpm] = useState<string>('0');

  const [pastWords, setPastWords] = useState<IWord[]>([]);
  const [activeWord, setActiveWord] = useState<number>(0);
  const [activeChar, setActiveChar] = useState(0);

  const { pressed } = useType();

  const nextWords = useMemo(() => {
    return words.slice(pastWords.length + 1);
  }, [pastWords, words]);

  useEffect(() => {
    if (pressed?.key === words[activeWord].value[activeChar]) {
      if (!startTime) {
        setStartTime(new Date().getTime());
      }
      setActiveChar(activeChar + 1);
    }

    if (
      activeChar >= words[activeWord].value.length &&
      pressed.code === 'Space'
    ) {
      const deltaTime = (new Date().getTime() - startTime) / 60000;

      console.log(activeWord);

      setWpm(((activeWord + 1) / deltaTime).toFixed(1));

      setPastWords((oldState) => [...oldState, words[activeWord]]);

      setActiveWord((oldState) => oldState + 1);

      setActiveChar(0);
    }
  }, [pressed]);

  return (
    <AnimateSharedLayout>
      <div className={`flex flex-col`}>
        <p className={`mb-4 text-xl text-gray-500`}>wpm: {wpm}</p>

        <div className={`flex flex-row flex-wrap max-w-7xl items-center`}>
          {pastWords.map((word) => (
            <p
              key={word.id}
              className={`text-2xl text-text-grey font-mono mr-6`}
            >
              {word.value}
            </p>
          ))}

          {words[activeWord].value.split('').map((letter, index) => (
            <div className={`inline-flex`} key={`active:${letter}${index}`}>
              {index === activeChar && (
                <motion.span
                  layoutId="cursor"
                  className={`h-7 rounded-2xl w-1 bg-primary animate-blink font-thin text-2xl m-0`}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    duration: 0.1,
                  }}
                />
              )}
              <p className={`text-2xl text-text font-mono`}>{letter}</p>
            </div>
          ))}

          <span className={`m-3`} />

          {nextWords.map((word) => (
            <p
              key={word.id}
              className={`text-2xl text-text-grey font-mono mr-6`}
            >
              {word.value}
            </p>
          ))}
        </div>
      </div>
    </AnimateSharedLayout>
  );
};

export default Typer;
