import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import Switch from "components/Switch";
import { Context, DispatchContext, update } from "Provider";

const cx = classNames.bind(styles);

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
      console.log("onClose");
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
    <div
      className={cx("content", wrapCls, { visible, persist })}
      onClick={stopOnClosePropagation}
    >
      <form className={cx("form")}>
        <div className={cx("form-item")}>
          <label className={cx("label")}>preview Demo</label>
          <div className={cx("input-control")}>
            <Switch checked={enableDemo} onChange={toggleDemo} />
          </div>
        </div>
      </form>
      <div className={cx("draw-btn")} onClick={() => setVisible(!visible)}>
        <span className={cx("arrow", { left: !visible, right: visible })} />
      </div>
    </div>
  );
};

export default Drawer;
