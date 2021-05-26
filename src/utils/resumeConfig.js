import Templates from "Templates";

export const config = Templates.reduce((acc, item) => {
  const { id } = item;
  return {
    ...acc,
    [id]: item,
  };
}, {});

export const multipleLimit = (multiple) => (count) => {
  if (typeof multiple === "number") {
    return count < multiple;
  }

  return multiple;
};

export const initialConfig = Templates.reduce(
  (acc, { id, theme = {}, general = [], section = [] }) => {
    return {
      ...acc,
      [id]: {
        theme,
        general,
        section,
      },
    };
  },
  {}
);
