import Templates from "Templates";

export const config = Templates.reduce((acc, item) => {
  const { id } = item;
  return {
    ...acc,
    [id]: item,
  };
}, {});

const getValue = (obj) => {
  return Object.entries(obj).reduce((acc, [prop, { value }]) => {
    return {
      ...acc,
      [prop]: value,
    };
  }, {});
};

export const initialConfig = Templates.reduce(
  (acc, { id, theme = {}, general = {}, section = {} }) => {
    return {
      ...acc,
      [id]: {
        theme,
        general: getValue(general),
        section: getValue(section),
      },
    };
  },
  {}
);
