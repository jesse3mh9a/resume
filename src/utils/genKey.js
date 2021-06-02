import createGenId from "utils/createGenId";

import simpleGenId from "./simpleGenId";

const persistGenKey = createGenId();

export const nonPersistGenKey = simpleGenId("simple");

const genKey = (persist = true) => {
  if (persist) {
    return persistGenKey();
  }

  return nonPersistGenKey();
};

export default genKey;
