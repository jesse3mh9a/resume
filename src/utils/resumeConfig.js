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

const getValue = (arr) => {
  return arr.reduce((acc, { name, value, group, multiple }) => {
    if (group) {
      const groupValue = getValue(group);
      return {
        ...acc,
        [name]: multiple ? [groupValue] : groupValue,
      };
    }
    return {
      ...acc,
      [name]: value === undefined ? "" : value,
    };
  }, {});
};

export const initialConfig = Templates.reduce(
  (acc, { id, theme = {}, general = [], section = [] }) => {
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
