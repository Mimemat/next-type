import React from 'react';

import { AnimateSharedLayout, motion } from 'framer-motion';

import { IWord, useType } from '~/hooks/useType';

const Typer: React.VFC<{ words: IWord[] }> = ({ words }) => {
  const { pastWords, nextWords, activeWord, activeChar, wrongChars, wpm } =
    useType(words);

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
                  style={{ width: '0.2rem' }}
                  className={`h-7 relative rounded-2xl bg-primary animate-blink font-thin text-2xl m-0`}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    duration: 0.1,
                  }}
                />
              )}
              <p
                className={`text-2xl text-text font-mono ${
                  wrongChars.includes(index) && 'text-accent'
                }`}
              >
                {letter}
              </p>
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
