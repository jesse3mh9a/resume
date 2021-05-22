import { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";

import ExitFullScreen from "icons/FullScreen";

import { Dispatch as EditDispatch, setFullScreen } from "Edit/Provider";

import Drawer from "../Drawer";

const cx = classNames.bind(styles);

const FullScreen = ({ children, frontScale }) => {
  const editDispatch = useContext(EditDispatch);

  return (
    <div className={cx("content")} style={{ fontSize: `${frontScale}rem` }}>
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
