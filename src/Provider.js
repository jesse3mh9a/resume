import { createContext, useReducer } from "react";
import produce from "immer";

import { initialConfigById, changeFromPropChain } from "utils/resumeConfig";

import Storage from "utils/storage";

import genKey from "utils/genKey";

export const storage = new Storage("data");

const init = (value) => {
  return storage.value ? { ...value, ...storage.value } : value;
};

const initResume = (persist = true) => ({
  key: genKey(persist),
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

  project: [],
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
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  }),

  project: () => ({
    key: genKey(),
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    description: "",
  }),
};

export const initialState = {
  currentResume: 0,

  simulateA4: true,

  enableDemo: false,

  resumes: [initResume(false)],

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
const MAKE_ORDER_SECTION_ITEM = "MAKE_ORDER_SECTION_ITEM";
const REMOVE_SECTION_ITEM = "REMOVE_SECTION_ITEM";

const ADD_RESUME = "ADD_RESUME";
const DUPLICATE_RESUME = "DUPLICATE_RESUME";
const REMOVE_RESUME = "REMOVE_RESUME";

const SET_CURRENT_CONFIG = "SET_CURRENT_CONFIG";
const SET_CURRENT_CONFIG_WITH_CHAIN = "SET_CURRENT_CONFIG_WITH_CHAIN";
const ADD_CURRENT_CONFIG_SECTION = "ADD_CURRENT_CONFIG_SECTION";
const REMOVE_CURRENT_CONFIG_SECTION = "REMOVE_CURRENT_CONFIG_SECTION";

const SET_CURRENT_SPACE = "SET_CURRENT_SPACE";
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

export const duplicateResume = (payload) => ({
  type: DUPLICATE_RESUME,
  payload,
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

export const makeOrderSectionItem = (payload) => ({
  type: MAKE_ORDER_SECTION_ITEM,
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

export const addCurrentConfigSection = (payload) => ({
  type: ADD_CURRENT_CONFIG_SECTION,
  payload,
});

export const removeCurrentConfigSection = (payload) => ({
  type: REMOVE_CURRENT_CONFIG_SECTION,
  payload,
});

export const setCurrentSpace = (payload) => ({
  type: SET_CURRENT_SPACE,
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
      ...(typeof action.payload === "function"
        ? action.payload(state)
        : action.payload),
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
      return produce(state, (draft) => {
        draft.resumes[currentResume][prop] = value;
      });
    },

    [ADD_RESUME]: () => {
      return {
        ...state,
        resumes: [...state.resumes, initResume()],
      };
    },

    [DUPLICATE_RESUME]: () => {
      const index = action.payload;
      const data = state.resumes[index];
      // new key
      const { key } = initResume();

      return produce(state, (draft) => {
        draft.resumes.splice(index + 1, 0, {
          ...data,
          key,
        });
      });
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

      return produce(state, (draft) => {
        entries.forEach(([prop, value]) => {
          draft.resumes[currentResume][section][prop] = value;
        });
      });
    },

    [ADD_SECTION_ITEM]: () => {
      const section = action.payload;
      return produce(state, (draft) => {
        draft.resumes[currentResume][section].push(initSection[section]());
      });
    },

    [REMOVE_SECTION_ITEM]: () => {
      const { section, index } = action.payload;
      return produce(state, (draft) => {
        const currentItem = draft.resumes[currentResume][section];
        draft.resumes[currentResume][section] = currentItem.filter(
          (_, search) => index !== search
        );
      });
    },

    [SET_SECTION_ITEM]: () => {
      const { section, index, form } = action.payload;
      const entries = Object.entries(form);

      return produce(state, (draft) => {
        entries.forEach(([prop, value]) => {
          draft.resumes[currentResume][section][index][prop] = value;
        });
      });
    },

    [MAKE_ORDER_SECTION_ITEM]: () => {
      // toward up/down
      const { section, index, toward } = action.payload;

      const options = {
        up: -1,
        down: 1,
      };

      const towardIndex = index + options[toward];

      const count = state.resumes[currentResume][section].length;

      if (
        towardIndex === undefined ||
        towardIndex < 0 ||
        towardIndex >= count
      ) {
        return state;
      }

      return produce(state, (draft) => {
        const towardTarget = draft.resumes[currentResume][section][index];
        const follow = draft.resumes[currentResume][section][towardIndex];

        draft.resumes[currentResume][section][index] = follow;
        draft.resumes[currentResume][section][towardIndex] = towardTarget;
      });
    },

    [SET_CURRENT_CONFIG]: () => {
      const [prop, value] = action.payload;

      return produce(state, (draft) => {
        const current = draft.config[templateId][prop];
        draft.config[templateId][prop] = {
          ...current,
          ...value,
        };
      });
    },

    [SET_CURRENT_CONFIG_WITH_CHAIN]: () => {
      const { chain, value } = action.payload;
      return produce(state, (draft) => {
        changeFromPropChain(draft.config[templateId], chain, value);
      });
    },

    [ADD_CURRENT_CONFIG_SECTION]: () => {
      const [prop, initailValue] = action.payload;
      return produce(state, (draft) => {
        draft.config[templateId].section[prop].push({
          key: genKey(),
          ...initailValue,
        });
      });
    },

    [REMOVE_CURRENT_CONFIG_SECTION]: () => {
      const [prop, key] = action.payload;
      return produce(state, (draft) => {
        const current = draft.config[templateId].section[prop];
        draft.config[templateId].section[prop] = current.filter(
          ({ key: search }) => search !== key
        );
      });
    },

    [SET_CURRENT_SPACE]: () => {
      const [prop, value] = action.payload;
      return produce(state, (draft) => {
        draft.config[templateId].space[prop] = value;
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
