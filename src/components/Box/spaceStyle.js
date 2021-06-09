export const MAX = 20;

const mixinArr = (param) => {
  if (Array.isArray(param)) {
    return param;
  }

  return [param];
};

const shortMap = {
  p: "padding",
  m: "margin",
};

const direction = ["x", "y", "t", "r", "b", "l"];

export const setDirection = (name) => [
  name,
  ...direction.map((item) => `${name}${item}`),
];

export const shortcutSpace = ["m", "p"];

const spaceProps = shortcutSpace
  .map((item) => setDirection(item))
  .reduce((acc, item) => [...acc, ...item]);

const exclude = (props, options) => {
  return Object.entries(props).reduce((acc, [prop, value]) => {
    if (options.indexOf(prop) === -1) {
      return {
        ...acc,
        [prop]: value,
      };
    }

    return acc;
  }, {});
};

export const excludeSpaceProps = (props) => {
  return exclude(props, spaceProps);
};

const calcValue = ({ value, edge, spacing }) => {
  return `${value + (edge * spacing) / MAX}em`;
};

const setValue = (s, options) => {
  const arr = mixinArr(s);

  return arr.reduce((acc, name) => {
    return {
      ...acc,
      [name]:
        name === shortMap[options.name]
          ? mixinArr(options.value)
              .map((item) => calcValue({ ...options, value: item }))
              .join(" ")
          : calcValue(options),
    };
  }, {});
};

const directionMapping = {
  x: ["left", "right"],
  y: ["top", "bottom"],
  l: "left",
  r: "right",
  b: "bottom",
  t: "top",
};

const capitalize = (prefix) => {
  return (str) => {
    return `${prefix}${str[0].toUpperCase()}${str.slice(1)}`;
  };
};

const setDirectionMapping = (name) => {
  const result = shortMap[name];
  return {
    [name]: result,
    ...Object.entries(directionMapping).reduce((acc, [prop, value]) => {
      return {
        ...acc,
        [`${name}${prop}`]: Array.isArray(value)
          ? value.map(capitalize(result))
          : capitalize(result)(value),
      };
    }, {}),
  };
};

const spaceStyle = (props, { name, edge, spacing }) => {
  return Object.entries(props)
    .filter(([prop]) => setDirection(name).indexOf(prop) !== -1)
    .reduce((acc, [prop, value]) => {
      return {
        ...acc,
        ...setValue(setDirectionMapping(name)[prop], {
          value,
          edge,
          spacing,
          name,
        }),
      };
    }, {});
};

export default spaceStyle;
