import { useContext } from "react";

import { Context } from "Provider";

const useConfig = ({ id } = {}) => {
  const { config } = useContext(Context);

  return config[id];
};

export default useConfig;
