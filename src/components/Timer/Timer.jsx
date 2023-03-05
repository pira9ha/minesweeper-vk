import React, {useContext, useEffect, useState} from 'react';
import './Timer.css';
import classNames from "classnames";
import {StateContext} from "../context/StateContext/StateContext";

const Timer = () => {
  const {state} = useContext(StateContext);
  const {gameIsOver, gameIsStart} = state;
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerStart, setTimerStart] = useState();
  const [intervalId, setIntervalId] = useState(0);

  const tick = () => setTimeLeft((prev) => prev + 1);

  useEffect(() => {
    if (gameIsStart && !timerStart) {
      const interval = setInterval(() => {
        if (timeLeft > 999) {
          clearInterval(interval);
        } else {
          tick();
        }
      }, 1000);
      setIntervalId(interval);
      setTimerStart(new Date().getMinutes());
      console.log(timerStart)
    }

    const cleanup = () => {
      clearInterval(intervalId);
    };
    return cleanup;
  }, [gameIsOver, timeLeft, timerStart, gameIsStart]);

  return (
    <div className={'counters'}>
      <div className={classNames('point', `number-${Math.trunc(timeLeft / 100)}`)} />
      <div className={classNames('point', `number-${Math.trunc(timeLeft / 10 % 10)}`)} />
      <div className={classNames('point', `number-${timeLeft % 10}`)} />
    </div>
  );
};

export default Timer;
