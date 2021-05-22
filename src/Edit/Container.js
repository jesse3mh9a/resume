import { useEffect, useContext } from "react";

import { Outlet, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import Templates from "Templates";

import { Context } from "Provider";

import {
  Context as EditContext,
  Dispatch as EditDispatch,
  setNavOpen,
  setPrintMode,
} from "Edit/Provider";

import FrontScale from "components/FrontScale";

import AppBar from "./AppBar";
import Nav from "./Nav";
import FullScreen from "./FullScreen";

import Preview from "./Preview";

import styles from "./index.module.css";

const cx = classNames.bind(styles);

const Container = () => {
  const location = useLocation();

  const { pathname } = location;

  const { templateId } = useContext(Context);

  const { printMode, fullScreen, frontScale } = useContext(EditContext);

  const editDispatch = useContext(EditDispatch);

  useEffect(() => {
    // pathname改变时,会自动关闭nav
    editDispatch(setNavOpen(false));
  }, [editDispatch, pathname]);

  useEffect(() => {
    const beforeprint = () => {
      editDispatch(setPrintMode(true));
    };

    const afterprint = () => {
      editDispatch(setPrintMode(false));
    };

    window.addEventListener("beforeprint", beforeprint);

    window.addEventListener("afterprint", afterprint);

    return () => {
      window.removeEventListener("beforeprint", beforeprint);
      window.removeEventListener("afterprint", afterprint);
    };
  }, [editDispatch]);

  const [{ component: Resume } = { component: () => null }] = Templates.filter(
    ({ id }) => templateId === id
  );

  if (printMode) {
    return <Resume />;
  }

  if (fullScreen) {
    return (
      <FullScreen frontScale={frontScale}>
        <FrontScale />
        <Resume />
      </FullScreen>
    );
  }

  return (
    <div className={styles.container}>
      <AppBar
        classes={{
          root: cx("app-bar"),
          nav: cx("nav-btn"),
          preview: cx("preview-btn"),
        }}
      />
      <div className={cx("content")}>
        <Nav
          classes={{
            root: cx("nav"),
            open: cx("nav-open"),
            paper: cx("paper"),
            mask: cx("mask"),
          }}
        />
        <div className={cx("edit", "box")}>
          <div className={cx("edit-content", "paper")}>
            <Outlet />
          </div>
        </div>
        <Preview
          frontScale={frontScale}
          classes={{
            root: cx("preview", "box"),
            paper: cx("paper"),
          }}
        >
          <FrontScale />
          <Resume />
        </Preview>
      </div>
    </div>
  );
};

export default Container;
