import loadable from "utils/loadable";

const fallback = <div>loading...</div>;

export default loadable(() => import("./index"), { fallback });