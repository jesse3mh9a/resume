// import { useContext } from "react";
import classNames from "classnames/bind";
// import { DispatchContext } from "Provider";
import AddIcon from "icons/Add";
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

const a = {
  select: Select,
  text: Input,
};

const DefaultWrap = ({ children }) => {
  return children;
};

const WrapComponent = ({ wrap: Wrap = DefaultWrap, children } = {}) => {
  return <Wrap>{children}</Wrap>;
};

const groupWrap = ({ multiple, label }) => {
  return ({ children }) => {
    return (
      <div>
        <div className={cx("head")}>
          <div className={cx("title")}>{label}</div>
          {multiple && (
            <div className={cx("add")}>
              <AddIcon className={cx("add-icon")} />
            </div>
          )}
        </div>
        {children}
      </div>
    );
  };
};

const multipleWrap = () => {
  return ({ children }) => {
    return (
      <div style={{ backgroundColor: "pink", marginBottom: "15px" }}>
        {children}
      </div>
    );
  };
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
          <WrapComponent key={name} wrap={groupWrap(item)}>
            {valArr.map((val, i) => {
              return (
                <WrapComponent wrap={multipleWrap(item)} key={i}>
                  {controlRender(
                    group.map((sub) => {
                      return {
                        ...sub,
                        value: val[sub.name],
                      };
                    })
                  )}
                </WrapComponent>
              );
            })}
          </WrapComponent>
        );
      }

      const Control = a[control];

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
