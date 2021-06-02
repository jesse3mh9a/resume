const simpleGenId = (prefix = "") => {
  let id = 0;

  return (addPrefix = "") => {
    id += 1;

    const arr = [prefix, addPrefix].filter((item) => item);

    return [...arr, `${id}`].join("-");
  };
};

export default simpleGenId;
