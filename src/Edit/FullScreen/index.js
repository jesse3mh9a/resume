import { useContext, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";

import ExitFullScreen from "icons/FullScreen";

import {
  Context as EditContext,
  Dispatch as EditDispatch,
  setFullScreen,
} from "Edit/Provider";

import Drawer from "../Drawer";

const cx = classNames.bind(styles);

const FullScreen = ({ children }) => {
  const { drawerVisible } = useContext(EditContext);

  const editDispatch = useContext(EditDispatch);

  useEffect(() => {
    document.body.style.overflowY = drawerVisible ? "hidden" : "auto";
  }, [drawerVisible]);

  return (
    <div className={cx("content")}>
      {children}
      <Drawer persist classes={{ root: cx("drawer") }} />
      <div
        className={cx("exit-screen-icon-wrap")}
        onClick={() => {
          editDispatch(setFullScreen(false));
        }}
      >
        <ExitFullScreen className={cx("exit-screen-icon")} />
      </div>
    </div>
  );
};

export default FullScreen;
