import Spin from "components/Spin";

import loadable from "utils/loadable";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "2rem",
      }}
    >
      <Spin />
    </div>
  );
};

const defaultLoadable = (importFunc) =>
  loadable(importFunc, { fallback: <Loading /> });

export default defaultLoadable;
