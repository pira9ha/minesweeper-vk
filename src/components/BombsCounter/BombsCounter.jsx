import React, {useContext} from 'react';
import './BombsCounter.css';
import classNames from "classnames";
import {StateContext} from "../context/StateContext/StateContext";

const BombsCounter = () => {
  const {state} = useContext(StateContext);
  const {bombsCount} = state;

  return (
    <div className={'counters'}>
      <div className={classNames('point', `number-${Math.round(bombsCount / 100)}`)} />
      <div className={classNames('point', `number-${Math.trunc(bombsCount / 10)}`)} />
      <div className={classNames('point', `number-${bombsCount % 10}`)} />
    </div>
  );
};

export default BombsCounter;
