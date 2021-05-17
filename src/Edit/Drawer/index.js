import { useContext, useState } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import Switch from "components/Switch";
import { Context, DispatchContext, update } from "Provider";

const cx = classNames.bind(styles);

const Drawer = ({ wrapCls, persist = false }) => {
  const [visible, setVisible] = useState(false);

  const { enableDemo } = useContext(Context);

  const dispatch = useContext(DispatchContext);

  const toggleDemo = () => {
    dispatch(update({ enableDemo: !enableDemo }));
  };

  return (
    <div className={cx("content", wrapCls, { visible, persist })}>
      <form className={cx("form")}>
        <div className={cx("form-item")}>
          <label className={cx("label")}>preview Demo</label>
          <div className={cx("input-control")}>
            <Switch checked={enableDemo} onChange={toggleDemo} />
          </div>
        </div>
      </form>
      <div className={cx("draw-btn")} onClick={() => setVisible(!visible)}>
        <span className={cx("arrow", { left: visible, right: !visible })} />
      </div>
    </div>
  );
};

export default Drawer;
