import React, {useReducer} from 'react';
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
  status: '',
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
        flags: [],
        gameIsOver: false,
        plates: createPlates(),
        status: '',
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
        status: action.payload,
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
    case 'SET_OPEN_PLATE': {
      const { payload } = action;
      let openedPlate = state.plates.find((_, i) => i === payload.x);
      openedPlate = openedPlate.find((plate) => plate.y === payload.y);
      openedPlate.opened = true;
      return {
        ...state,
        plates: [...state.plates],
      };
    }
    case 'SET_FLAG_PLATE': {
      const { payload } = action;
      let openedPlate = state.plates.find((_, i) => i === payload.x);
      openedPlate = openedPlate.find((plate) => plate.y === payload.y);
      openedPlate.flag = true;
      return {
        ...state,
        plates: [...state.plates],
      };
    }
    case 'REMOVE_FLAG_PLATE': {
      const { payload } = action;
      let openedPlate = state.plates.find((_, i) => i === payload.x);
      openedPlate = openedPlate.find((plate) => plate.y === payload.y);
      openedPlate.flag = false;
      return {
        ...state,
        plates: [...state.plates],
      };
    }
    default: {
      return {...state};
    }
  }
}

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <StateContext.Provider value={{state, dispatch}}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
