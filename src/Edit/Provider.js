import { createContext, useReducer } from "react";

export const initialState = {
  fullScreen: false,
  navOpen: false,
  printMode: false,
};

const SET_NAV_OPEN = "SET_NAV_OPEN";
const SET_PRINT_MODE = "SET_PRINT_MODE";
const SET_FULL_SCREEN = "SET_FULL_SCREEN";

export const setNavOpen = (payload) => ({
  type: SET_NAV_OPEN,
  payload,
});

export const setPrintMode = (payload) => ({
  type: SET_PRINT_MODE,
  payload,
});

export const setFullScreen = (payload) => ({
  type: SET_FULL_SCREEN,
  payload,
});

const reducer = (state, action) => {
  switch (action.type) {
    case SET_NAV_OPEN:
      return {
        ...state,
        navOpen: action.payload,
      };

    case SET_PRINT_MODE:
      return {
        ...state,
        printMode: action.payload,
      };

    case SET_FULL_SCREEN:
      return {
        ...state,
        fullScreen: action.payload,
      };

    default:
      return state;
  }
};

export const Context = createContext(initialState);

export const Dispatch = createContext(() => {});

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
};

export default Provider;
