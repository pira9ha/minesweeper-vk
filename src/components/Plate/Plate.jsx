import React, {useCallback, useContext, useEffect, useState} from 'react';
import './Plate.css';
import classNames from "classnames";
import {StateContext} from "../context/StateContext/StateContext";

const Plate = (props) => {
  const {
    platePosition,
    checkBomb,
    neighbors,
    item,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isFindBomb, setIsFindBomb] = useState(0);
  const {state, dispatch} = useContext(StateContext);
  const {plates, gameIsStart, bombsPositions, bombsCount, gameIsOver} = state;

  useEffect(() => {
    setIsOpen(item.opened);
  }, [plates]);

  useEffect(() => {
    if (!gameIsOver) {
      setIsFindBomb(0);
    }
  }, [gameIsOver]);

  useEffect(() => {
    if (isFindBomb !== 0 && isFindBomb !== -1) {
     dispatch({
       type: 'SET_BOMBS_COUNT',
       bombsCount: isFindBomb === 1
         ? bombsCount - 1
         : bombsCount + 1
     });
      dispatch({
        type: isFindBomb === 1 ? 'ADD_FLAG' : 'REMOVE_FLAG',
        payload: platePosition,
      });
    }
  }, [isFindBomb]);

  useEffect(() => {
    if (isFindBomb === 0) {
      dispatch({type: 'REMOVE_FLAG_PLATE', payload: item});
    }
  }, [isFindBomb]);

  useEffect(() => {
    if (isOpen && item.neighbour === 0) {
      dispatch({type: 'SET_PLATES', payload: item});
    }
  }, [isOpen]);

  const handleClick = useCallback((event) => {
    if (event.type === 'contextmenu') {
      return;
    }
    if (checkBomb(platePosition)) {
      setIsFindBomb(-1);
      dispatch({
        type: 'SET_GAME_OVER',
        payload: 'loose',
      });
      return;
    }
    setIsOpen(true);
    dispatch({type: 'SET_OPEN_PLATE', payload: item});
    if(bombsPositions.length > 0 && item.neighbour === 0) {
      dispatch({type: 'SET_PLATES', payload: item});
    }
  }, [bombsPositions, plates, isFindBomb]);

  const handleRightClick = useCallback((event) => {
    event.preventDefault();
    if (isOpen) {
      return;
    }
    setFlagOnBomb();
    dispatch({type: 'SET_FLAG_PLATE', payload: item});
  }, [gameIsStart]);

  const setFlagOnBomb = useCallback(() => {
    setIsFindBomb((prev) => prev + 1 === 3
      ? 0
      : prev + 1);
  }, [isFindBomb]);

  return (
    <button
      onClick={handleClick}
      onContextMenu={gameIsOver ? () => {} : handleRightClick}
      data-index={platePosition}
      className={classNames('plate', {
        'bomb': gameIsOver && checkBomb(platePosition),
        'error': isFindBomb === -1 && checkBomb(platePosition) && gameIsOver,
        'catch': gameIsOver && isFindBomb === 1 && checkBomb(platePosition),
        'open': isOpen,
        [`neighbors-${neighbors}`]: isOpen && neighbors,
        'flag': isFindBomb === 1 && item.flag,
        'mark': isFindBomb === 2 && !isOpen,
      })}
      disabled={isOpen || gameIsOver || item.flag || isFindBomb !== 0}
    />
  );
};

export default Plate;
