import { createContext, useReducer } from "react";

export const initialState = {
  fullScreen: false,
  navOpen: false,
  printMode: false,
  frontScale: 1,
  drawerVisible: false,
};

const SET_NAV_OPEN = "SET_NAV_OPEN";
const SET_PRINT_MODE = "SET_PRINT_MODE";
const SET_FULL_SCREEN = "SET_FULL_SCREEN";
const SET_FRONT_SCALE = "SET_FRONT_SCALE";
const TOGGLE_DRAWER_VISIBLE = "SET_DRAWER_VISIBLE";

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

export const setFrontScale = (payload) => ({
  type: SET_FRONT_SCALE,
  payload,
});

export const toggleDrawerVisible = (payload) => ({
  type: TOGGLE_DRAWER_VISIBLE,
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

    case SET_FRONT_SCALE:
      return {
        ...state,
        frontScale: action.payload,
      };

    case TOGGLE_DRAWER_VISIBLE:
      return {
        ...state,
        drawerVisible:
          action.payload === undefined ? !state.drawerVisible : action.payload,
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
