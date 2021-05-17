import { useContext } from "react";
import { Context } from "Provider";

const useTheme = ({ id } = {}) => {
  const context = useContext(Context);

  const { themes } = context;

  const theme = themes[id];

  return theme;
};

export default useTheme;
