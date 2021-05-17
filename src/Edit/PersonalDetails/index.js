import { useContext } from "react";

import classNames from "classnames/bind";

import { DispatchContext, setSection } from "Provider";

import useResume from "hooks/useResume";

import styles from "./index.module.css";
import formStyles from "styles/form.module.css";

const cx = classNames.bind({ ...formStyles, ...styles });

const PersonalDetails = () => {
  const { personalDetails } = useResume();

  const dispatch = useContext(DispatchContext);

  const setForm = (form) =>
    dispatch(setSection({ section: "personalDetails", form }));

  return (
    <form className={cx("form")}>
      {Object.entries(personalDetails).map(([field, value]) => {
        return (
          <div key={field} className={cx("form-item")}>
            <label htmlFor={field} className={cx("label")}>
              {field}
            </label>
            <div className={cx("input-control")}>
              <input
                id={field}
                className={cx("input")}
                placeholder={field}
                value={value}
                onChange={(e) => {
                  setForm({
                    [field]: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        );
      })}
    </form>
  );
};

export default PersonalDetails;
