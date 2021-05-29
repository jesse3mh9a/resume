import { useContext } from "react";
import classNames from "classnames/bind";
import {
  DispatchContext,
  setCurrentConfigWithChain,
  addCurrentConfigSection,
  removeCurrentConfigSection,
} from "Provider";
import AddIcon from "icons/Add";
import { multipleLimit } from "utils/resumeConfig";
import styles from "./Section.module.css";
import drawerStyles from "./index.module.css";
import { useCurConfigSectionWithContext } from "hooks/useConfig";

const cx = classNames.bind({ ...drawerStyles, ...styles });

const Select = ({
  options,
  value,
  onChange,
  label,
  placeholder = "--Please choose an option--",
}) => {
  return (
    <div className={cx("form-item")}>
      <label className={cx("label")}>{label}</label>
      <div className={cx("input-control")}>
        <select className={cx("input")} value={value} onChange={onChange}>
          {value === "" && <option value="">{placeholder}</option>}
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

const Input = ({ type, value, onChange, label, placeholder }) => {
  return (
    <div className={cx("form-item")}>
      <label className={cx("label")}>{label}</label>
      <div className={cx("input-control")}>
        <input
          placeholder={placeholder || label}
          className={cx("input")}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

const ControlOption = {
  select: Select,
};

const Control = ({ control, ...rest }) => {
  const inputTypes = ["text", "date"];

  if (inputTypes.indexOf(control) !== -1) {
    return <Input type={control} {...rest} />;
  }

  const Com = ControlOption[control];

  return <Com {...rest} />;
};

const GroupWrap = ({ multiple, name, group, label, count = 0, children }) => {
  const dispatch = useContext(DispatchContext);

  const hasAdd = multipleLimit(multiple);

  return (
    <div>
      <div className={cx("head")}>
        <div className={cx("title")}>{label}</div>
        {hasAdd(count) && (
          <div
            className={cx("add")}
            onClick={() => {
              dispatch(
                addCurrentConfigSection([
                  name,
                  group.reduce((acc, { name }) => {
                    return {
                      ...acc,
                      [name]: "",
                    };
                  }, {}),
                ])
              );
            }}
          >
            <AddIcon className={cx("add-icon")} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

const MultipleWrap = ({ children, multiple, removeOptions }) => {
  const dispatch = useContext(DispatchContext);

  if (multiple) {
    return (
      <div className={cx("multiple")}>
        {children}
        <div className={cx("remove")}>
          <button
            type="button"
            onClick={() => {
              dispatch(removeCurrentConfigSection(removeOptions));
            }}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return children;
};

const ControlRender = (props) => {
  const dispatch = useContext(DispatchContext);

  const { list, chain = [], type } = props;
  return list.map((item) => {
    const { name, group, value, control, multiple } = item;

    const valArr = Array.isArray(value) ? value : [value];

    if (group) {
      return (
        <GroupWrap key={name} {...item} count={valArr.length}>
          {valArr.map((val, i) => {
            const chain = [name, ...(multiple ? [i] : [])];
            return (
              <MultipleWrap
                key={val.key || i}
                multiple={multiple}
                removeOptions={[name, val.key]}
              >
                <ControlRender
                  {...props}
                  list={group.map((sub) => {
                    return {
                      ...sub,
                      value: val[sub.name],
                    };
                  })}
                  chain={chain}
                />
              </MultipleWrap>
            );
          })}
        </GroupWrap>
      );
    }

    return (
      <Control
        control={control}
        key={name}
        {...item}
        onChange={(e) => {
          dispatch(
            setCurrentConfigWithChain({
              chain: [type, ...chain, name],
              value: e.target.value,
            })
          );
        }}
      />
    );
  });
};

const Section = () => {
  const { general, section } = useCurConfigSectionWithContext();

  return (
    <>
      <ControlRender type="general" list={general} />
      <ControlRender type="section" list={section} />
    </>
  );
};

export default Section;
