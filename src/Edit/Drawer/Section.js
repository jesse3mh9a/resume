// import { useContext } from "react";
import classNames from "classnames/bind";
// import { DispatchContext } from "Provider";
import AddIcon from "icons/Add";
import { multipleLimit } from "utils/resumeConfig";
import styles from "./Section.module.css";
import drawerStyles from "./index.module.css";
import { useCurConfig } from "hooks/useConfig";

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

const controlOption = {
  select: Select,
};

const getControl = (control) => {
  const a = ["text", "date"];
  if (a.indexOf(control) !== -1) {
    return (props) => <Input type={control} {...props} />;
  }

  return controlOption[control];
};

const GroupWrap = ({ multiple, label, count = 0, children }) => {
  const hasAdd = multipleLimit(multiple);
  return (
    <div>
      <div className={cx("head")}>
        <div className={cx("title")}>{label}</div>
        {hasAdd(count) && (
          <div className={cx("add")}>
            <AddIcon className={cx("add-icon")} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

const MultipleWrap = ({ children }) => {
  return (
    <div style={{ backgroundColor: "pink", marginBottom: "15px" }}>
      {children}
    </div>
  );
};

const Section = () => {
  // const dispatch = useContext(DispatchContext);

  const { general, section } = useCurConfig();

  const controlRender = (arr) => {
    return arr.map((item) => {
      const { name, group, value, control } = item;

      const valArr = Array.isArray(value) ? value : [value];

      if (group) {
        return (
          <GroupWrap key={name} {...item} count={valArr.length}>
            {valArr.map((val, i) => {
              return (
                <MultipleWrap key={i}>
                  {controlRender(
                    group.map((sub) => {
                      return {
                        ...sub,
                        value: val[sub.name],
                      };
                    })
                  )}
                </MultipleWrap>
              );
            })}
          </GroupWrap>
        );
      }

      const Control = getControl(control);

      return <Control key={name} {...item} onChange={() => {}} />;
    });
  };
  return (
    <>
      {controlRender(general)}
      {controlRender(section)}
    </>
  );
};

export default Section;
