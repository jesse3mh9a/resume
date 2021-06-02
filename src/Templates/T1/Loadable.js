import defaultLoadable from "defaultLoadable";

export { default as config } from "./config";

export default defaultLoadable(() => import("./index"));
