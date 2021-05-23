import { useContext } from "react";

import { Context } from "Provider";

const useTheme = ({ id } = {}) => {
  const { config } = useContext(Context);

  const { theme } = config[id];

  return theme;
};

export default useTheme;
