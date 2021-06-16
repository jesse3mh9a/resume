import { useContext } from "react";

import { Context } from "Provider";

const useSpace = ({ id } = {}) => {
  const { config } = useContext(Context);

  const { space } = config[id];

  return space;
};

export default useSpace;
