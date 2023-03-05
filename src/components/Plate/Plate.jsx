import React, {useCallback, useContext, useEffect, useState} from 'react';
import './Plate.css';
import classNames from "classnames";
import {StateContext} from "../context/StateContext/StateContext";

const Plate = (props) => {
  const {
    platePosition,
    checkBomb,
    error,
    neighbors,
    item,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isFindBomb, setIsFindBomb] = useState(0);
  const {state, dispatch} = useContext(StateContext);
  const {plates, gameIsStart, bombsPositions, bombsCount, gameIsOver, flags} = state;

  useEffect(() => {
    setIsOpen(item.opened);
  }, [plates]);

  useEffect(() => {
    if (isFindBomb !== 0) {
      dispatch({
        type: 'SET_BOMBS_COUNT',
        bombsCount: isFindBomb === 1
          ? bombsCount - 1
          : bombsCount + 1
      })
      dispatch({
        type: isFindBomb === 1 ? 'ADD_FLAG' : 'REMOVE_FLAG',
        payload: platePosition,
      });
    }
  }, [isFindBomb]);

  useEffect(() => {
    if (isOpen && item.neighbour === 0) {
      dispatch({type: 'SET_PLATES', payload: item});
    }
  }, [isOpen]);

  const handleClick = useCallback(() => {
    if (isFindBomb === 1) {
      return;
    }
    if (checkBomb(platePosition)) {
      setIsFindBomb(-1);
      dispatch({type: 'SET_GAME_OVER'});
      return;
    }
    setIsOpen(true);
    if(bombsPositions.length > 0 && item.neighbour === 0) {
      dispatch({type: 'SET_PLATES', payload: item});
    }
  }, [bombsPositions, plates, isFindBomb]);

  const handleRightClick = useCallback((event) => {
    event.preventDefault();
    setFlagOnBomb();
  }, [gameIsStart]);

  const setFlagOnBomb = useCallback(() => {
    setIsFindBomb((prev) => prev + 1 === 3
      ? 0
      : prev + 1);
  }, [isFindBomb]);

  return (
    <button
      onClick={handleClick}
      onContextMenu={handleRightClick}
      className={classNames('plate', {
        'bomb': gameIsOver && checkBomb(platePosition),
        'error': isFindBomb === -1 || error,
        'catch': gameIsOver && isFindBomb === 1 && checkBomb(platePosition),
        'open': isOpen,
        [`neighbors-${neighbors}`]: isOpen && neighbors,
        'flag': isFindBomb === 1,
        'mark': isFindBomb === 2 && !isOpen,
      })}
      disabled={isOpen || gameIsOver || isFindBomb === 1}
    />
  );
};

export default Plate;
