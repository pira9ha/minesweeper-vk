import React from 'react';
import PlayButton from "./PlayButton/PlayButton";
import Timer from "./Timer/Timer";
import BombsCounter from "./BombsCounter/BombsCounter";

const TopTable = () => {
  return (
    <div className={'table top-table'}>
      <BombsCounter />
      <PlayButton />
      <Timer />
    </div>
  );
};

export default TopTable;
