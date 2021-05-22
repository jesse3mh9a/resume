import { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";

import FullScreenIcon from "icons/FullScreen";

import { Dispatch as EditDispatch, setFullScreen } from "Edit/Provider";

import Drawer from "../Drawer";

const cx = classNames.bind(styles);

const Preview = ({ classes = {}, children }) => {
  const editDispatch = useContext(EditDispatch);

  return (
    <div className={cx(classes.root)}>
      <div className={cx("content", classes.paper)}>
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
  );
};

export default Preview;
