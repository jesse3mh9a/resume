import t1, { config as c1 } from "./T1/Loadable";
import t2, { config as c2 } from "./T2/Loadable";

const injectConfig = (component, config) => ({
  component,
  ...config,
});

const batchInjectConfig = (...params) => {
  return params.map((item) => {
    return injectConfig(...item);
  });
};

const Templates = batchInjectConfig([t1, c1], [t2, c2]);

export default Templates;
