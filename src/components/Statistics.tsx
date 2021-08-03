import React from 'react';

type StatisticsProps = {
  wpm: string;
};

const Statistics: React.VFC<StatisticsProps> = ({ wpm }) => {
  return (
    <div
      className={`flex flex-row bg-background-light p-16 rounded-md shadow-md`}
    >
      <h1 className={`font-bold mr-1 text-2xl`}>WPM:</h1>
      <p className={`font-mono text-2xl`}>{wpm}</p>
    </div>
  );
};

export default Statistics;
