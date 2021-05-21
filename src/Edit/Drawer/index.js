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

  const {
    theme: { primary },
    initial,
  } = useSelectTheme();

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
        {initial.primary && (
          <div className={cx("form-item")}>
            <label className={cx("label")}>Primary</label>
            <div className={cx("input-control")}>
              <div className={cx("color-options")}>
                {mergeColors(initial.primary).map(({ name, value }) => (
                  <div
                    key={name}
                    style={{ backgroundColor: value }}
                    className={cx("color-block", {
                      checked: primary === value,
                    })}
                    onClick={() => {
                      dispatch(setSelectedTheme({ primary: value }));
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Drawer;
