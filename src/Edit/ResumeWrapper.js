import { useContext } from "react";
import classNames from "classnames/bind";
import FrontScale from "components/FrontScale";

import useFrontScale from "hooks/useFrontScale";

import { Context as EditContext } from "Edit/Provider";

import { useCurContextConfig } from "hooks/useConfig";

import styles from "./ResumeWrapper.module.css";

const cx = classNames.bind(styles);

const ResumeWrapper = ({ children }) => {
  const frontScale = useFrontScale();

  const { printMode } = useContext(EditContext);

  const { space: { font = 1 } = {} } = useCurContextConfig();

  return (
    <div
      className={cx("container")}
      style={{ fontSize: `${frontScale * font}rem` }}
    >
      <FrontScale />
      {!printMode && (
        <div
          className={cx("page-footer")}
          style={{
            top: `${frontScale * 297}mm`,
          }}
        />
      )}

      {children}
    </div>
  );
};

export default ResumeWrapper;
