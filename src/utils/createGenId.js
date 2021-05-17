import Storage from "utils/storage";

const storage = new Storage("key");

const createGenId = () => {
  let id = storage.value || 0;

  return () => {
    id += 1;

    storage.value = id;

    return `${id}`;
  };
};

export default createGenId;
