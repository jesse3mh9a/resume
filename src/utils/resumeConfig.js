import Templates from "Templates";
import genKey from "utils/genKey";

export const changeFromPropChain = (target, chain, value) => {
  const arr = [...chain];

  if (arr.length === 1) {
    target[arr[0]] = value;

    return;
  }
  const first = arr.shift();

  changeFromPropChain(target[first], arr, value);
};

export const insertValue = (list = [], value) => {
  return list.map((item) => {
    const { name, group } = item;
    if (group) {
      return {
        ...item,
        value: value[name],
        group: insertValue(group),
      };
    }

    if (value) {
      return {
        ...item,
        value: value[name],
      };
    }

    return item;
  });
};

export const getValue = (list, opt = {}) => {
  return list.reduce((acc, item) => {
    const { name, value, group, multiple } = item;

    if (group) {
      const val = getValue(group);

      return {
        ...acc,
        ...getValue(group, {
          value: multiple ? [{ key: genKey(), ...val }] : val,
          name,
        }),
      };
    }

    const prop = opt.name || name;

    return {
      ...acc,
      [prop]: opt.value || value || "",
    };
  }, {});
};

export const configById = Templates.reduce((acc, item) => {
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

export const initialConfigById = Templates.reduce(
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
