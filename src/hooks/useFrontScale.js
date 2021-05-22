import { useContext, useDebugValue } from "react";
import { Context as EditContext } from "Edit/Provider";

const useFrontScale = () => {
  const { frontScale } = useContext(EditContext);

  let debugValue = "A4";

  if (frontScale > 1) {
    debugValue = "bigger than A4";
  }

  if (frontScale < 1) {
    debugValue = "smaller than A4";
  }

  useDebugValue(debugValue);

  if (frontScale > 1) {
    return 1;
  }

  return frontScale > 0.5 ? frontScale : 0.5;
};

export default useFrontScale;
