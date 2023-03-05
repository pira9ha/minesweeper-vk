import React, {useContext, useEffect, useState} from 'react';
import './PlayButton.css';
import classNames from "classnames";
import {StateContext} from "../context/StateContext/StateContext";

const PlayButton = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const {state, dispatch} = useContext(StateContext);
  const {bombsCount, gameIsOver} = state;

  useEffect(() => {
    const eventHandler = (event) => {
      if (event.target.classList.contains('plate')) {
        setIsMouseDown((prev) => !prev);
      }
    }
    document.addEventListener('mousedown', eventHandler);
    document.addEventListener('mouseup', eventHandler);

    return () => {
      document.removeEventListener('mousedown', eventHandler);
      document.removeEventListener('mouseup', eventHandler);
    }
  }, []);

  return (
    <div
      className={classNames('default', {
        'click': isMouseDown,
        'win': bombsCount === 0 && gameIsOver,
        'loose': bombsCount > 0 && gameIsOver,
      })}
      onClick={() => dispatch({type: 'SET_NEW_GAME'})}
    />
  );
};

export default PlayButton;
