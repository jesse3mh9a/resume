import { cloneElement, createElement } from "react";
import spaceStyle, { shortcutSpace, excludeSpaceProps } from "./spaceStyle";

const getThemeStyle = (p, v, theme) => {
  if (!p && !v) {
    return {};
  }

  const props = p || "color";
  const value = v || "primary";

  let arr = props;

  if (typeof props === "string") {
    arr = [props];
  }

  return arr.reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: theme[value],
    }),
    {}
  );
};

const typographyMapping = {
  body: 1,
  subtitle: 1.2,
  title: 1.5,
  head: 2,
};

const createSpaceStyleWithName = (props, options) => {
  return (name) => {
    return spaceStyle(props, { ...options, name });
  };
};

const Box = (props) => {
  const {
    theme = {},
    space = {},
    color,
    variant,
    component = "div",
    spacing = 0,
    clone = false,
    typography,

    ...rest
  } = props;

  const { edge = 0 } = space;

  const { children } = rest;

  const baseProps = excludeSpaceProps(rest);

  const spaceStyleWithName = createSpaceStyleWithName(props, { spacing, edge });

  const spaceStyleOutput = shortcutSpace.reduce((acc, item) => {
    return {
      ...acc,
      ...spaceStyleWithName(item),
    };
  }, {});

  const size = typographyMapping[typography];

  const fontSize = typography
    ? {
        fontSize: `${size ? size : typography}em`,
      }
    : {};

  const mergedStyle = {
    ...rest.style,
    ...component?.props?.style,
    ...getThemeStyle(variant, color, theme),
    ...spaceStyleOutput,
    ...fontSize,
  };

  if (clone) {
    return cloneElement(children, {
      ...baseProps,
      ...children.props,
      style: mergedStyle,
    });
  }

  return createElement(component, {
    ...baseProps,
    ...component?.props,
    style: mergedStyle,
  });
};

export default Box;
