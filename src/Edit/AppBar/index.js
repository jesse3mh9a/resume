import { useContext } from "react";

import { Context, DispatchContext, update } from "Provider";

import {
  Context as EditContext,
  Dispatch as EditDispatch,
  setNavOpen,
  setFullScreen,
} from "Edit/Provider";

import classNames from "classnames/bind";

import Templates from "Templates";

import GithubIcon from "icons/Github";

import styles from "./index.module.css";

const cx = classNames.bind(styles);

const AppBar = ({ classes = {} }) => {
  const { templateId } = useContext(Context);

  const { navOpen } = useContext(EditContext);

  const editDispatch = useContext(EditDispatch);

  const dispatch = useContext(DispatchContext);

  const templateOnChange = (e) => {
    dispatch(update({ templateId: parseInt(e.target.value) }));
  };

  return (
    <div className={cx("wrap", "space", "px", classes.root)}>
      <div
        className={cx(classes.nav, "hamburger-btn")}
        onClick={() => {
          editDispatch(setNavOpen(true));
        }}
      >
        <div className={cx("hamburger", { open: navOpen })}>
          <div />
        </div>
      </div>
      <div className={cx("right-side")}>
        <div
          className={cx(classes.preview, "preview-btn", "mr")}
          onClick={() => {
            editDispatch(setFullScreen(true));
          }}
        >
          Preview
        </div>
        <div className={cx("template-choice", "mr")}>
          <select
            className={cx("template-select")}
            name="choice"
            value={templateId}
            onChange={templateOnChange}
          >
            {Templates.map(({ id, name }) => (
              <option key={id} value={id}>
                {`${id}.${name || "Template"}`}
              </option>
            ))}
          </select>
        </div>
        <a
          className={cx("github-icon-wrap")}
          href="https://github.com/jesse3mh9a/resume"
        >
          <GithubIcon className={cx("github-icon")} />
        </a>
      </div>
    </div>
  );
};

export default AppBar;
