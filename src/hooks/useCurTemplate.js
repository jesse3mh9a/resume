import { useContext } from "react";
import { Context } from "Provider";
import Templates from "Templates";

const useCurTemplate = () => {
  const { templateId } = useContext(Context);

  const [current] = Templates.filter(({ id }) => templateId === id);

  return current;
};

export default useCurTemplate;
