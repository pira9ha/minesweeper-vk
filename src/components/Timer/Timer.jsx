import React, {useState} from 'react';
import './Timer.css';
import classNames from "classnames";

const Timer = () => {
  const [timer, setTimer] = useState(null);

  return (
    <div className={'counters'}>
      <div className={classNames('point', {
        [`time-${timer}`]: timer,
        'zero-point': !timer,
      })} />
      <div className={classNames('point', {
        [`time-${timer}`]: timer,
        'zero-point': !timer,
      })} />
      <div className={classNames('point', {
        [`time-${timer}`]: timer,
        'zero-point': !timer,
      })} />
    </div>
  );
};

export default Timer;
