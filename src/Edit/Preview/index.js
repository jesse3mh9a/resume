import { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";

import FullScreenIcon from "icons/FullScreen";

import { Dispatch as EditDispatch, setFullScreen } from "Edit/Provider";

import FrontScale from "components/FrontScale";

import useFrontScale from "hooks/useFrontScale";

import Drawer from "../Drawer";

const cx = classNames.bind(styles);

const Preview = ({ classes = {}, children }) => {
  const editDispatch = useContext(EditDispatch);

  const frontScale = useFrontScale();

  return (
    <div className={cx(classes.root)} style={{ fontSize: `${frontScale}rem` }}>
      <FrontScale />
      <div className={cx("content", classes.paper)}>
        <div className={cx("wrap")}>
          <div
            className={cx("full-screen-icon-wrap")}
            onClick={() => {
              editDispatch(setFullScreen(true));
            }}
          >
            <FullScreenIcon className={cx("full-screen-icon")} />
          </div>
          <Drawer classes={{ root: cx("drawer") }} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Preview;
