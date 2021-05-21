import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import Switch from "components/Switch";
import { Context, DispatchContext, update, setSelectedTheme } from "Provider";

import useSelectTheme from "hooks/useSelectTheme";

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

const Drawer = ({ wrapCls, persist = false }) => {
  const [visible, setVisible] = useState(false);

  const { theme, initial } = useSelectTheme();

  const { enableDemo } = useContext(Context);

  const dispatch = useContext(DispatchContext);

  const toggleDemo = () => {
    dispatch(update({ enableDemo: !enableDemo }));
  };

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
    initial[type] && (
      <div className={cx("form-item")}>
        <div className={cx("color-label")}>
          <label className={cx("label")}>{type}</label>
          <div>
            <input
              className={cx("color-picker")}
              type="color"
              value={theme[type]}
              onChange={(e) => {
                dispatch(setSelectedTheme({ [type]: e.target.value }));
              }}
            />
            {initial[type] !== theme[type] && (
              <div
                className={cx("reset-color")}
                onClick={() => {
                  dispatch(setSelectedTheme({ [type]: initial[type] }));
                }}
              >
                reset
              </div>
            )}
          </div>
        </div>
        <div className={cx("input-control")}>
          <div className={cx("color-options")}>
            {mergeColors(initial[type]).map(({ name, value }) => (
              <div
                key={name}
                style={{ backgroundColor: value }}
                className={cx("color-block", {
                  checked: theme[type] === value,
                })}
                onClick={() => {
                  dispatch(setSelectedTheme({ [type]: value }));
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className={cx("content", wrapCls, { visible, persist })}>
      <div className={cx("layer")} />
      <form className={cx("form")} onClick={stopOnClosePropagation}>
        <div className={cx("draw-btn")} onClick={() => setVisible(!visible)}>
          <span className={cx("arrow", { left: !visible, right: visible })} />
        </div>
        <div className={cx("form-item")}>
          <label className={cx("label")}>preview Demo</label>
          <div className={cx("input-control")}>
            <Switch checked={enableDemo} onChange={toggleDemo} />
          </div>
        </div>
        <ColorPicker type="primary" />
        <ColorPicker type="secondary" />
      </form>
    </div>
  );
};

export default Drawer;
