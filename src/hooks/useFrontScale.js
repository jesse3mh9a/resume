import { useContext, useDebugValue } from "react";
import { Context } from "Provider";
import { Context as EditContext } from "Edit/Provider";

const useFrontScale = () => {
  const { simulateA4 } = useContext(Context);
  const { frontScale } = useContext(EditContext);

  let debugValue = "A4";

  if (frontScale > 1) {
    debugValue = "bigger than A4";
  }

  if (frontScale < 1) {
    debugValue = "smaller than A4";
  }

  if (!simulateA4) {
    debugValue = "without simulation of A4";
  }

  useDebugValue(debugValue);

  if (!simulateA4) {
    return 1;
  }

  if (frontScale > 1) {
    return 1;
  }

  return frontScale > 0.5 ? frontScale : 0.5;
};

export default useFrontScale;
