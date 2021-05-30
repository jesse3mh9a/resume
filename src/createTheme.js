import { forwardRef } from "react";
import useTheme from "hooks/useTheme";

const createTheme = (config) => {
  return forwardRef(
    (
      {
        name = "primary",
        style = {},
        styles = {},
        type = "color",
        component: Component = "div",
        ...rest
      },
      ref
    ) => {
      const theme = useTheme(config);

      const element = Component;

      const Wrap =
        typeof Component === "function"
          ? (props) => <Component ref={ref} {...props} />
          : Component.type
          ? (props) => <element.type ref={ref} {...element.props} {...props} />
          : (props) => <Component ref={ref} {...props} />;

      return (
        <Wrap
          style={{
            /* stylelint-disable-next-line */
            [type]: theme[name],
            ...style,
            ...Object.entries(styles).reduce((acc, [prop, value]) => {
              return {
                ...acc,
                [prop]: typeof value === "function" ? value(theme) : value,
              };
            }, {}),
          }}
          {...rest}
        />
      );
    }
  );
};

export default createTheme;
