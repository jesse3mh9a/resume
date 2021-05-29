import { useContext } from "react";

import { Context } from "Provider";

import { initialConfigById, configById, insertValue } from "utils/resumeConfig";

export const useConfigPreview = ({ id } = {}) => {
  const { config, enableDemo } = useContext(Context);

  const data = config[id];

  return enableDemo ? { ...data, section: configById[id].demo } : data;
};

export const useCurContextConfig = () => {
  const { config, templateId: id } = useContext(Context);

  return config[id];
};

export const useCurConfig = () => {
  const { templateId: id } = useContext(Context);

  return initialConfigById[id];
};

export const useCurConfigSectionWithContext = () => {
  const { templateId: id, config } = useContext(Context);

  const { section, general } = configById[id];

  const value = config[id];

  return {
    general: insertValue(general, value.general),
    section: insertValue(section, value.section),
  };
};
