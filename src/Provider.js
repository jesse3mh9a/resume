import { createContext, useReducer } from "react";
import produce from "immer";

import { initialConfigById, changeFromPropChain } from "utils/resumeConfig";

import Storage from "utils/storage";

import createGenId from "utils/createGenId";

const genKey = createGenId();

export const storage = new Storage("data");

const init = (value) => {
  return storage.value ? { ...value, ...storage.value } : value;
};

const initResume = () => ({
  key: genKey(),
  name: "",
  createTime: "",
  updateTime: "",

  personalDetails: {
    fullName: "",
    profession: "",
    phone: "",
    address: "",
    email: "",
    website: "",
  },

  summary: "",

  education: [],

  experience: [],
});

/**
 * id database table id
 */
const initSection = {
  education: () => ({
    key: genKey(),
    id: "",
    schoolName: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: "",
  }),

  experience: () => ({
    key: genKey(),
    id: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  }),
};

export const initialState = {
  currentResume: 0,

  simulateA4: true,

  enableDemo: false,

  resumes: [initResume()],

  templateId: 1,

  config: initialConfigById,
};

// constants
const SET_CURRENT_RESUME = "SET_CURRENT_RESUME";
const INIT = "INIT";
const UPDATE = "UPDATE";
const TOGGLE = "TOGGLE";
const UPDATE_RESUME = "UPDATE_RESUME";
const SET_SECTION = "SET_SECTION";
const SET_SECTION_ITEM = "SET_SECTION_ITEM";
const ADD_SECTION_ITEM = "ADD_SECTION_ITEM";
const REMOVE_SECTION_ITEM = "REMOVE_SECTION_ITEM";

const ADD_RESUME = "ADD_RESUME";
const REMOVE_RESUME = "REMOVE_RESUME";

const SET_CURRENT_CONFIG = "SET_CURRENT_CONFIG";
const SET_CURRENT_CONFIG_WITH_CHAIN = "SET_CURRENT_CONFIG_WITH_CHAIN";
// constants end

// actions
export const resumeOnChange = (payload) => ({
  type: SET_CURRENT_RESUME,
  payload,
});

export const initAction = (payload) => ({
  type: INIT,
  payload,
});

export const update = (payload) => ({
  type: UPDATE,
  payload,
});

export const toggle = (payload) => ({
  type: TOGGLE,
  payload,
});

export const updateResume = (payload) => ({
  type: UPDATE_RESUME,
  payload,
});

export const addResume = () => ({
  type: ADD_RESUME,
});

export const removeResume = (payload) => ({
  type: REMOVE_RESUME,
  payload,
});

export const setSection = (payload) => ({
  type: SET_SECTION,
  payload,
});

export const setSectionItem = (payload) => ({
  type: SET_SECTION_ITEM,
  payload,
});

export const addSectionItem = (payload) => ({
  type: ADD_SECTION_ITEM,
  payload,
});

export const removeSectionItem = (payload) => ({
  type: REMOVE_SECTION_ITEM,
  payload,
});

export const setCurrentConfig = (payload) => ({
  type: SET_CURRENT_CONFIG,
  payload,
});

export const setCurrentConfigWithChain = (payload) => ({
  type: SET_CURRENT_CONFIG_WITH_CHAIN,
  payload,
});

// actions end

const mixin = (value, defaultValue) => {
  if (value === undefined) {
    return defaultValue;
  }

  return typeof value === "function" ? value() : value;
};

const reducer = (state, action) => {
  const { currentResume, templateId } = state;

  const options = {
    [SET_CURRENT_RESUME]: {
      ...state,
      currentResume: action.payload,
    },

    [INIT]: () => {
      return init(initialState);
    },

    [UPDATE]: {
      ...state,
      ...action.payload,
    },

    [TOGGLE]: () => {
      const [prop, value] = action.payload;

      return {
        ...state,
        [prop]: typeof value === "boolean" ? value : !state[prop],
      };
    },

    [UPDATE_RESUME]: () => {
      const [prop, value] = action.payload;
      return produce(state, (product) => {
        product.resumes[currentResume][prop] = value;
      });
    },

    [ADD_RESUME]: () => {
      return {
        ...state,
        resumes: [...state.resumes, initResume()],
      };
    },

    [REMOVE_RESUME]: () => {
      return {
        ...state,
        resumes: state.resumes.filter((_, index) => index !== action.payload),
      };
    },

    [SET_SECTION]: () => {
      const { section, form } = action.payload;
      const entries = Object.entries(form);

      return produce(state, (product) => {
        entries.forEach(([prop, value]) => {
          product.resumes[currentResume][section][prop] = value;
        });
      });
    },

    [ADD_SECTION_ITEM]: () => {
      const section = action.payload;
      return produce(state, (product) => {
        product.resumes[currentResume][section].push(initSection[section]());
      });
    },

    [REMOVE_SECTION_ITEM]: () => {
      const { section, index } = action.payload;
      return produce(state, (product) => {
        const currentItem = product.resumes[currentResume][section];
        product.resumes[currentResume][section] = currentItem.filter(
          (_, search) => index !== search
        );
      });
    },

    [SET_SECTION_ITEM]: () => {
      const { section, index, form } = action.payload;
      const entries = Object.entries(form);

      return produce(state, (product) => {
        entries.forEach(([prop, value]) => {
          product.resumes[currentResume][section][index][prop] = value;
        });
      });
    },

    [SET_CURRENT_CONFIG]: () => {
      const [prop, value] = action.payload;

      return produce(state, (product) => {
        const current = product.config[templateId][prop];
        product.config[templateId][prop] = {
          ...current,
          ...value,
        };
      });
    },

    [SET_CURRENT_CONFIG_WITH_CHAIN]: () => {
      const { chain, value } = action.payload;
      return produce(state, (product) => {
        changeFromPropChain(product.config[templateId], chain, value);
      });
    },
  };

  const nextState = mixin(options[action.type], state);

  storage.value = nextState;

  return nextState;
};

export const Context = createContext(initialState);

export const DispatchContext = createContext(() => {});

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
};

export default Provider;
