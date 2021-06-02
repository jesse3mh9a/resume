import defaultLoadable from "defaultLoadable";

export default defaultLoadable(() => import("./index"));
