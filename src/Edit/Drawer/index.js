import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import Switch from "components/Switch";
import { Context, DispatchContext, toggle, setCurrentConfig } from "Provider";

import { config } from "utils/resumeConfig";

import useConfigValueById from "hooks/useConfigValueById";

import colors from "./colors";

const cx = classNames.bind(styles);

export const mergeColors = (color) => {
  const exist = colors.some(({ value }) => value === color);

  return !exist && color
    ? [{ value: color, name: "initial" }, ...colors]
    : colors;
};

const onCloseEvent = (onClose) => ({
  add: () => {
    document.addEventListener("click", onClose, false);
  },
  remove: () => {
    document.removeEventListener("click", onClose, false);
  },
});

const Drawer = ({ classes = {}, persist = false }) => {
  const [visible, setVisible] = useState(false);

  const {
    value: { theme, general },
    initialValue: { theme: initialTheme },
  } = useConfigValueById();

  const { enableDemo, simulateA4, templateId } = useContext(Context);

  const { general: generalForm } = config[templateId];

  const dispatch = useContext(DispatchContext);

  const stopOnClosePropagation = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const onClose = () => {
      setVisible(false);
    };

    // noop close
    let close = { add: () => {}, remove: () => {} };

    if (visible) {
      close = onCloseEvent(onClose);
      close.add();
    }

    return () => {
      close.remove();
    };
  }, [visible]);

  const ColorPicker = ({ type }) =>
    initialTheme[type] ? (
      <div className={cx("form-item")}>
        <div className={cx("label")}>
          <div className={cx("label-content")}>
            <label>{type}</label>
            <div className={cx("color-picker-row")}>
              <input
                className={cx("color-picker")}
                type="color"
                value={theme[type]}
                onChange={(e) =>
                  dispatch(
                    setCurrentConfig(["theme", { [type]: e.target.value }])
                  )
                }
              />
              {initialTheme[type] !== theme[type] && (
                <div
                  className={cx("reset-color")}
                  onClick={() =>
                    dispatch(
                      setCurrentConfig([
                        "theme",
                        { [type]: initialTheme[type] },
                      ])
                    )
                  }
                >
                  reset
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={cx("input-control")}>
          <div className={cx("color-options")}>
            {mergeColors(initialTheme[type]).map(({ name, value }) => (
              <div
                key={name}
                style={{ backgroundColor: value }}
                className={cx("color-block", {
                  checked: theme[type] === value,
                })}
                onClick={() =>
                  dispatch(setCurrentConfig(["theme", { [type]: value }]))
                }
              />
            ))}
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className={cx("content", classes.root, { visible, persist })}>
      <div className={cx("layer")} />
      <form className={cx("form")} onClick={stopOnClosePropagation}>
        <div className={cx("draw-btn")} onClick={() => setVisible(!visible)}>
          <span className={cx("arrow", { left: !visible, right: visible })} />
        </div>
        <div className={cx("form-item")}>
          <label className={cx("label")}>preview Demo</label>
          <div className={cx("input-control")}>
            <Switch
              checked={enableDemo}
              onChange={() => {
                dispatch(toggle(["enableDemo"]));
              }}
            />
          </div>
        </div>
        <div className={cx("form-item")}>
          <label className={cx("label")}>Simulate A4 page printing view</label>
          <div className={cx("input-control")}>
            <Switch
              checked={simulateA4}
              onChange={() => {
                dispatch(toggle(["simulateA4"]));
              }}
            />
          </div>
        </div>
        <ColorPicker type="primary" />
        <ColorPicker type="secondary" />
        {generalForm.map((item) => {
          const { options, name } = item;

          return (
            <select
              key={name}
              value={general[name]}
              onChange={(e) => {
                dispatch(
                  setCurrentConfig(["general", { [name]: e.target.value }])
                );
              }}
            >
              {options.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          );
        })}
      </form>
    </div>
  );
};

export default Drawer;
