import { useContext } from "react";

import classNames from "classnames/bind";

import { DispatchContext, updateResume } from "Provider";

import useResume from "hooks/useResume";

import styles from "./index.module.css";
import formStyles from "styles/form.module.css";

const cx = classNames.bind({ ...formStyles, ...styles });

const Experience = () => {
  const { summary = "" } = useResume({ demo: false });

  const dispatch = useContext(DispatchContext);

  const setSummary = (value) => dispatch(updateResume(["summary", value]));

  return (
    <div>
      <form className={cx("form")}>
        <div className={cx("form-item")}>
          <label htmlFor="summary" className={cx("label")}>
            Summary
          </label>
          <div className={cx("input-control")}>
            <textarea
              id="summary"
              rows={10}
              className={cx("input", "textarea")}
              value={summary}
              onChange={(e) => {
                setSummary(e.target.value);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Experience;
