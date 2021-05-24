import { useContext } from "react";
import classNames from "classnames/bind";
import { DispatchContext, setCurrentConfig } from "Provider";
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

  const dispatch = useContext(DispatchContext);

  const test = { ...general, ...section };

  const { general: generalForm, section: sectionForm } = useTemplate();

  const list = [...generalForm, ...sectionForm];

  const controlRender = (arr) =>
    arr.map((item) => {
      const { control, group, name } = item;
      if (control === "select") {
        const { options, label } = item;

        return (
          <Select
            key={name}
            label={label}
            options={options}
            value={test[name]}
            onChange={(e) =>
              dispatch(
                setCurrentConfig(["general", { [name]: e.target.value }])
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
            value={test.name}
            onChange={() => {}}
          />
        );
      }

      if (group) {
        return controlRender(group);
      }

      return null;
    });

  return controlRender(list);
};

export default Section;
