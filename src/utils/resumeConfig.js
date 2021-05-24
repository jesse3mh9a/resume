import Templates from "Templates";

export const config = Templates.reduce((acc, item) => {
  const { id } = item;
  return {
    ...acc,
    [id]: item,
  };
}, {});

const getValue = (arr) => {
  return arr.reduce((acc, { name, value }) => {
    return {
      ...acc,
      [name]: value,
    };
  }, {});
};

const getGroupValue = (arr) => {
  return arr.reduce((acc, { name, group, multiple }) => {
    const value = group.reduce(
      (acc, { name: subName, value }) => ({
        ...acc,
        [subName]: value,
      }),
      {}
    );
    return {
      ...acc,
      [name]: multiple ? [value] : value,
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
        section: getGroupValue(section),
      },
    };
  },
  {}
);
