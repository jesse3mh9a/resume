import { useContext } from "react";

import { Context, DispatchContext, update } from "Provider";

import classNames from "classnames/bind";

import Templates from "Templates";

import GithubIcon from "icons/Github";

import styles from "./index.module.css";

import editStyles from "../index.module.css";

const cx = classNames.bind(styles);
const editCx = classNames.bind(editStyles);

const AppBar = ({ setStatePreview, open, setOpen }) => {
  const { templateId } = useContext(Context);

  const dispatch = useContext(DispatchContext);

  const templateOnChange = (e) => {
    dispatch(update({ templateId: parseInt(e.target.value) }));
  };

  return (
    <>
      <div className={cx("wrap", "space", "px")}>
        <div
          className={editCx("app-bar-hamburger-btn")}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className={editCx("app-bar-hamburger", { open })}>
            <div />
          </div>
        </div>
        <div className={cx("right-side")}>
          <div
            className={editCx("app-bar-preview-btn", "mr")}
            onClick={() => {
              setStatePreview(true);
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

      <div className={cx("space")} />
    </>
  );
};

export default AppBar;
