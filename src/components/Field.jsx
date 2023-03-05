import React, {useContext, useEffect} from 'react';
import {WIDTH} from "../constants";
import Plate from "./Plate/Plate";
import {StateContext} from "./context/StateContext/StateContext";
import {createBombs} from "./game";
import lodash from "lodash";

const Field = () => {
  const {state, dispatch} = useContext(StateContext);
  const {plates, gameIsStart, bombsPositions, bombsCount, flags} = state;

  useEffect(() => {
    const isWin = lodash.difference(flags, bombsPositions);
    if (
      flags.length > 0 &&
      isWin.length === 0 &&
      bombsCount === 0 &&
      bombsPositions.length > 0
    ) {
      dispatch({
        type: 'SET_GAME_OVER',
        payload: 'win',
      });
    }
  }, [bombsCount])

  const checkBomb = (platePosition) => bombsPositions.includes(platePosition);

  const StartGame = (event) => {
    if (!gameIsStart) {
      const index = event.target.getAttribute('data-index');
      const bombs = createBombs(+index);
      dispatch({
        type: 'START_GAME',
        payload: {
          gameIsStart: true,
          bombsPositions: bombs,
        }
      });
    }
  };

  return (
    <div className='table game-field' onClick={StartGame}>
      {
        plates.map((row) => row.map((item) => {
          const index = item.x * WIDTH + item.y;
          return (<Plate
            key={index}
            item={item}
            platePosition={index}
            checkBomb={checkBomb}
            neighbors={item.neighbour}
            openedPlate={item.opened}
          />);
        }))
      }
    </div>
  );
};

export default Field;
