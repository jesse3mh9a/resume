import { useContext, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";

import ExitFullScreen from "icons/FullScreen";

import {
  Context as EditContext,
  Dispatch as EditDispatch,
  setFullScreen,
} from "Edit/Provider";

import FrontScale from "components/FrontScale";

import useFrontScale from "hooks/useFrontScale";

import Drawer from "../Drawer";

const cx = classNames.bind(styles);

const FullScreen = ({ children }) => {
  const { drawerVisible } = useContext(EditContext);

  const editDispatch = useContext(EditDispatch);

  const frontScale = useFrontScale();

  useEffect(() => {
    document.body.style.overflowY = drawerVisible ? "hidden" : "auto";
  }, [drawerVisible]);

  return (
    <div className={cx("content")} style={{ fontSize: `${frontScale}rem` }}>
      <FrontScale />
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
