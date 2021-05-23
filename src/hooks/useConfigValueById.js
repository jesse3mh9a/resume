import { useContext } from "react";
import { Context, config as initialConfig } from "Provider";

const useConfigValueById = () => {
  const { config, templateId: id } = useContext(Context);

  return {
    initialValue: initialConfig[id],
    value: config[id],
  };
};

export default useConfigValueById;
