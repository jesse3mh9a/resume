import { useContext } from "react";

import { Context } from "Provider";

import { initialConfig } from "utils/resumeConfig";

const useConfigValueById = () => {
  const { config, templateId: id } = useContext(Context);

  return {
    initialValue: initialConfig[id],
    value: config[id],
  };
};

export default useConfigValueById;
