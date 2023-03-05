import React, {useCallback, useReducer, useState} from 'react';
import {StateContext} from "./StateContext";
import {BOMBS} from "../../../constants";
import {createPlates, getNeighbours, openEmptyNeighbors} from "../../game";

const defaultState = {
  gameIsStart: false,
  bombsCount: BOMBS,
  bombsPositions: [],
  flags: [],
  gameIsOver: false,
  plates: createPlates(),
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_GAME': {
      const { payload } = action;
      const plates = getNeighbours(state.plates, payload.bombsPositions);
      return {
        ...state,
        ...payload,
        plates,
      };
    }
    case 'SET_NEW_GAME': {
      return {
        gameIsStart: false,
        bombsCount: BOMBS,
        bombsPositions: [],
        gameIsOver: false,
        plates: createPlates(),
      };
    }
    case 'ADD_FLAG': {
      return {
        ...state,
        flags: [...state.flags, action.payload],
      };
    }
    case 'REMOVE_FLAG': {
      return {
        ...state,
        flags: state.flags.filter((flag) => flag !== action.payload),
      };
    }
    case 'SET_BOMBS_COUNT': {
      return {
        ...state,
        bombsCount: action.bombsCount < 0 ? 0 : action.bombsCount,
      };
    }
    case 'SET_GAME_OVER': {
      return {
        ...state,
        gameIsOver: true,
      };
    }
    case 'SET_PLATES': {
      const { payload } = action;
      const newPlates = openEmptyNeighbors(payload, state.plates, state.bombsPositions);
      return {
        ...state,
        plates: [...newPlates],
      };
    }
    default: {
      return {...state};
    }
  }
  throw Error('Unknown action: ' + action.type);
}

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  // const handleState = useCallback((newState) => setState({
  //   ...state,
  //   ...newState,
  // }), [bombsCount]);

  return (
    <StateContext.Provider value={{state, dispatch}}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
