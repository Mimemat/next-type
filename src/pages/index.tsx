import React, { useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { v4 as uuid } from 'uuid';

import Header from '~/components/Header';
import Typer from '~/components/Typer';
import { IWord } from '~/hooks/useType';
import { generateWords } from '~/utils/generateWords';

type IHomeProps = {
  words: IWord[];
};

const Home: NextPage<IHomeProps> = ({ words: serverWords }) => {
  const [words, _setWords] = useState(serverWords);

  return (
    <div className={`w-screen h-screen flex flex-col`}>
      <Header />
      <div className={`flex flex-1 justify-center items-center`}>
        <Typer words={words} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const wordsData = generateWords(20);

  const words: IWord[] = wordsData.map((word) => ({
    id: uuid(),
    value: word,
  }));

  return {
    props: {
      words,
    },
  };
};

export default Home;
