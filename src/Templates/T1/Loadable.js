import loadable from "utils/loadable";

const fallback = <div>loading...</div>;

export { default as config } from "./config";

export default loadable(() => import("./index"), { fallback });
