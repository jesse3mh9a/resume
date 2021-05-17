import { useContext, useEffect, useState } from "react";

import { Context } from "Provider";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import Templates from "Templates";

import ExitFullScreen from "icons/ExitFullScreen";
import FullScreenIcon from "icons/FullScreen";

import AppBar from "./AppBar";
import Nav from "./Nav";
import Drawer from "./Drawer";

import styles from "./index.module.css";

let cx = classNames.bind(styles);

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state || {};

  const { templateId } = useContext(Context);

  const [navOpen, setNavOpen] = useState(false);

  const [{ component: Preview } = { component: () => null }] = Templates.filter(
    ({ id }) => templateId === id
  );

  const [print, setPrint] = useState(false);

  const setStatePreview = (preview) => {
    navigate(location.pathname, { state: { preview } });
  };

  useEffect(() => {
    const beforeprint = () => {
      setPrint(true);
    };

    const afterprint = () => {
      setPrint(false);
    };

    window.addEventListener("beforeprint", beforeprint);

    window.addEventListener("afterprint", afterprint);

    return () => {
      window.removeEventListener("beforeprint", beforeprint);
      window.removeEventListener("afterprint", afterprint);
    };
  }, []);

  if (print) {
    return <Preview />;
  } else if (state.preview) {
    return (
      <div className={cx("full-preview")}>
        <Preview />
        <div
          className={cx("close-icon")}
          onClick={() => {
            setStatePreview(false);
            setPrint(false);
          }}
        >
          <ExitFullScreen />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <AppBar
        setStatePreview={setStatePreview}
        open={navOpen}
        setOpen={setNavOpen}
      />
      <div className={styles["nav-content-wrap"]}>
        <Nav open={navOpen} setOpen={setNavOpen} />
        <div className={styles.content}>
          <div className={cx("paper", "edit")}>
            <Outlet />
          </div>
          <div className={cx("paper", "preview")}>
            <Drawer wrapCls={cx("drawer")} />
            <div
              className={cx("full-screen-icon")}
              onClick={() => {
                setStatePreview(true);
              }}
            >
              <FullScreenIcon />
            </div>
            <Preview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
