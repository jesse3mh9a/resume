import { useContext, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";

import FullScreenIcon from "icons/FullScreen";

import {
  Context as EditContext,
  Dispatch as EditDispatch,
  setFullScreen,
} from "Edit/Provider";

import Drawer from "../Drawer";

const cx = classNames.bind(styles);

const Preview = ({ classes = {}, children }) => {
  const ref = useRef(null);

  const { drawerVisible } = useContext(EditContext);

  const editDispatch = useContext(EditDispatch);

  useEffect(() => {
    if (drawerVisible) {
      ref.current.scroll(0, 0);
    }

    ref.current.style.overflowY = drawerVisible ? "hidden" : "auto";
  }, [drawerVisible]);

  return (
    <div className={cx(classes.root)}>
      <div className={cx("content", classes.paper)} ref={ref}>
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
