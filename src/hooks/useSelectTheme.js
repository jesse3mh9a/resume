import { useContext } from "react";
import { Context } from "Provider";
import Templates from "Templates";
import useTheme from "./useTheme";

const useSelectTheme = () => {
  const { templateId } = useContext(Context);

  return {
    theme: useTheme({ id: templateId }),
    initial: Templates[templateId].theme,
  };
};

export default useSelectTheme;
