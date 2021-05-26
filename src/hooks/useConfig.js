import { useContext } from "react";

import { Context } from "Provider";

import { initialConfig, config as Templates } from "utils/resumeConfig";

const getValue = (arr) => {
  return arr.reduce(
    (acc, { name, value }) => ({
      ...acc,
      [name]: value,
    }),
    {}
  );
};

export const useConfigPreview = ({ id } = {}) => {
  const { config, enableDemo } = useContext(Context);

  const data = config[id];

  const section = data.section || [];
  const general = data.general || [];

  const value = {
    ...data,
    section: getValue(section),
    general: getValue(general),
  };

  return enableDemo ? { ...value, section: Templates[id].demo } : value;
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
