import { useContext } from "react";

import { Context } from "Provider";

import { initialConfig, config as Templates } from "utils/resumeConfig";

export const useConfigById = ({ id } = {}) => {
  const { config } = useContext(Context);

  return config[id];
};

export const useTemplate = () => {
  const { templateId: id } = useContext(Context);

  return Templates[id];
};

export const useCurConfig = () => {
  const { config, templateId: id } = useContext(Context);

  return config[id];
};

export const useCurInitConfig = () => {
  const { templateId: id } = useContext(Context);

  return initialConfig[id];
};
