import { useContext } from "react";
import classNames from "classnames/bind";
import { DispatchContext, setCurrentConfig } from "Provider";
import AddIcon from "icons/Add";
import styles from "./Section.module.css";
import drawerStyles from "./index.module.css";
import { useCurConfig, useTemplate } from "hooks/useConfig";

const cx = classNames.bind({ ...drawerStyles, ...styles });

const Select = ({ options, value, onChange, label }) => {
  return (
    <div className={cx("form-item")}>
      <label className={cx("label")}>{label}</label>
      <div>
        <select value={value} onChange={onChange}>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Input = ({ type, value, onChange, label }) => {
  return (
    <div className={cx("form-item")}>
      <label className={cx("label")}>{label}</label>
      <div>
        <input type={type} value={value} onChange={onChange} />
      </div>
    </div>
  );
};

const Section = () => {
  const { general, section } = useCurConfig();

  const TYPE = {
    general,
    section,
  };

  const dispatch = useContext(DispatchContext);

  const { general: generalForm, section: sectionForm } = useTemplate();

  const controlRender = (arr, type) => {
    const curValue = TYPE[type];

    return arr.map((item) => {
      const { control, group, name } = item;

      const curValueDit = curValue[name];

      const curValueArr = Array.isArray(curValueDit)
        ? curValueDit
        : [curValueDit];

      return (
        <div key={name}>
          {curValueArr.map((_, i) => {
            if (control === "select") {
              const { options, label } = item;

              return (
                <Select
                  key={i}
                  label={label}
                  options={options}
                  value={curValueArr[i]}
                  onChange={(e) =>
                    dispatch(
                      setCurrentConfig([type, { [name]: e.target.value }])
                    )
                  }
                />
              );
            }

            if (control === "text") {
              const { label } = item;

              return (
                <Input
                  key={name}
                  type="text"
                  label={label}
                  value={curValueArr[i]}
                  onChange={(e) => {
                    dispatch(
                      setCurrentConfig([type, { [name]: e.target.value }])
                    );
                  }}
                />
              );
            }

            if (group) {
              const { label, multiple } = item;
              return (
                <div key={name}>
                  <div className={cx("head")}>
                    <div className={cx("title")}>{label}</div>
                    {multiple && (
                      <div className={cx("add")}>
                        <AddIcon className={cx("add-icon")} />
                      </div>
                    )}
                  </div>

                  {controlRender(group, type)}
                </div>
              );
            }

            return null;
          })}
        </div>
      );
    });
  };
  return (
    <>
      {controlRender(generalForm, "general")}
      {controlRender(sectionForm, "section")}
    </>
  );
};

export default Section;
