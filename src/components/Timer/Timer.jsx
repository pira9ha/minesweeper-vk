import React, {useContext, useEffect, useState} from 'react';
import './Timer.css';
import classNames from "classnames";
import {StateContext} from "../context/StateContext/StateContext";

const Timer = () => {
  const {state} = useContext(StateContext);
  const {gameIsOver, gameIsStart} = state;
  const [timeLeft, setTimeLeft] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    if (gameIsStart && timeLeft < 999 && !gameIsOver) {
      const interval = setInterval(() => {
        const newTime = timeLeft + 1;
        setTimeLeft(newTime);
      }, 1000);
      setIntervalId(interval);
    }

    if (!gameIsStart) {
      setTimeLeft(0);
    }

    const cleanup = () => {
      clearInterval(intervalId);
    };
    return cleanup;
  }, [timeLeft, gameIsStart, gameIsOver]);

  return (
    <div className={'counters'}>
      <div className={classNames('point', `number-${Math.trunc(timeLeft / 100)}`)} />
      <div className={classNames('point', `number-${Math.trunc(timeLeft / 10 % 10)}`)} />
      <div className={classNames('point', `number-${timeLeft % 10}`)} />
    </div>
  );
};

export default Timer;
