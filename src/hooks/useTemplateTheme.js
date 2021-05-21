import { useContext } from "react";
import { Context, themes } from "Provider";
import useTheme from "./useTheme";

const useTemplateTheme = () => {
  const { templateId } = useContext(Context);

  return {
    theme: useTheme({ id: templateId }),
    initial: themes[templateId],
  };
};

export default useTemplateTheme;
